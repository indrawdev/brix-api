const dotenv = require('dotenv')
dotenv.config()

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const User = require('../models/user')
const Employee = require('../models/employee')
const UserClient = require('../models/userclient')
const { transporter } = require('../middlewares/transporter')


exports.logIn = async (req, res, next) => {
	const email = req.body.email
	const password = req.body.password
	const hashedPass = md5(password + email)

	try {
		await User.findOne({
			include: Employee,
			where: {
				email: email,
				password: hashedPass
			}
		})
			.then((result) => {
				if (result) {
					let payload = {
						employeeId: result.employee_id,
						userId: result.user_id,
						email: result.email
					}

					let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
						expiresIn: process.env.ACCESS_TOKEN_LIFE
					})

					let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
						expiresIn: process.env.REFRESH_TOKEN_LIFE
					})

					let verify

					try {
						verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

						UserClient.update({
							last_login: new Date(Date.now()).toISOString()
						}, {
							where: {
								user_id: result.user_id
							}
						})
					} catch (err) {
						console.error(err);
					}

					res.status(200).json({
						success: true,
						accessToken: accessToken,
						refreshToken: refreshToken,
						issued: verify.iat,
						expire: verify.exp,
						data: result
					})
					next()
				} else {
					res.status(404).json({ success: false, message: 'Not found' })
					next()
				}
			})
			.catch(err => {
				res.status(400).json({ success: false, message: err })
				next()
			})
	} catch (e) {
		res.status(500).json({ success: false, message: e })
	}
}

exports.signIn = async (req, res, next) => {

	const email = req.body.email
	const password = req.body.password
	const hashedPass = md5(password + email)

	try {
		await UserClient.findOne({
			where: {
				userclient_email: email,
				userclient_password: hashedPass
			}
		})
			.then((result) => {
				if (result) {

					let payload = {
						clientId: result.client_id,
						userId: result.userclient_id,
						email: result.userclient_email
					}

					let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
						expiresIn: process.env.ACCESS_TOKEN_LIFE
					})

					let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
						expiresIn: process.env.REFRESH_TOKEN_LIFE
					})

					let verify

					try {
						verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
						UserClient.update({
							last_login: new Date(Date.now()).toISOString()
						}, {
							where: {
								userclient_id: result.userclient_id
							}
						})
					} catch (err) {
						console.error(err);
					}

					res.status(200).json({
						success: true,
						accessToken: accessToken,
						refreshToken: refreshToken,
						issued: verify.iat,
						expire: verify.exp,
						data: result
					})
					next()
				} else {
					res.status(404).json({ success: false, message: 'Not found' })
					next()
				}
			})
			.catch(err => {
				res.status(400).json({ success: false, message: err })
				next()
			})
	} catch (e) {
		res.status(500).json({ success: false, message: e })
	}
}

exports.refreshToken = async (req, res, next) => {
	const refreshToken = req.headers.authorization.split(" ")[1]

	let payload
	let data
	let newToken
	let verify

	if (!refreshToken) {
		return res.status(403).json()
	}

	try {
		payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

		data = {
			clientId: payload.clientId,
			userId: payload.userId,
			email: payload.email
		}

		newToken = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFE
		})

		verify = await jwt.verify(newToken, process.env.ACCESS_TOKEN_SECRET)

		res.status(200).json({
			accessToken: newToken,
			issued: verify.iat,
			expire: verify.exp
		})
		next()
	}
	catch (e) {
		return res.status(401).json({ error: e })
	}
}

exports.me = async (req, res, next) => {
	if (typeof req.headers.authorization !== "undefined") {
		const currentToken = req.headers.authorization.split(" ")[1]

		try {
			const data = await jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ success: false, data: data })
			next()
		} catch (err) {
			res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
			next()
		}
	} else {
		res.status(500).json({ error: "Not Authorized" })
		next()
	}
}

exports.signOut = async (req, res, next) => {
	if (typeof req.headers.authorization !== "undefined") {
		const currentToken = req.headers.authorization.split(" ")[1]
		try {
			const data = await jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ success: true, message: 'Signout success', data: data })
			next()
		} catch (err) {
			res.status(500).json({ success: false, message: 'Failed to authenticate token' })
			next()
		}
	} else {
		res.status(500).json({ error: "Not Authorized" })
		next()
	}
}