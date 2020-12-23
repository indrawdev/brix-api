const User = require('../models/user')
const Employee = require('../models/employee')

// show all users
exports.listUsers = async (req, res, next) => {
	let offset  = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)
	
	await User.findAndCountAll({
		include: Employee,
		where: { is_active: 1 }, 
		order: [
			['created_at', 'DESC']
		],
		offset: offset, limit: limit
	})
	.then(results => {
		res.status(200).json({ success: true, data: results })
		next()
	})
	.catch(err => {
		res.status(400).json({ success: false, data: err })
		next()
	});
}

// show single user
exports.getUser = async (req, res, next) => {
	const userId = req.params.id

	await User.findByPk(userId, { 
		include: [Employee] 
	})
	.then(result => {
		if (result) {
			res.status(200).json({ success: true, data: result })
			next()
		} else {
			res.status(404).json({ success: false, message: 'Not found' })
			next()
		}
	})
	.catch(err => {
		res.status(400).json({ success: false, message: err })
		next()
	});
}

exports.updatePassword = async (req, res, next) => {
	const userId = parseInt(req.params.id)
	const oldPass = req.body.oldpass
	const newPass = req.body.newpass

	let currentUser
	try {
		currentUser = await User.findByPk(userId)
		if (currentUser) {
			let hashedOldPass = md5(oldPass + currentUser.userclient_email)
			let hashedNewPass = md5(newPass + currentUser.userclient_email)
			
			const checkPass = await User.findOne({
					where: {
						userclient_email: currentUser.userclient_email,
						userclient_password: hashedOldPass
					}
			})
	
			if (checkPass === null) {
					res.status(404).json({ success: false, message: 'Wrong old password' })
					next()
			} else {
					await User.update({
						userclient_password: hashedNewPass,
						change_pass: new Date(Date.now()).toISOString()
					}, {
						where: {
							userclient_email: currentUser.userclient_email
						}
					})
					res.status(200).json({ success: true, message: 'Password updated', data: checkPass })
					next()
			}
		} else {
			res.status(404).json({ success: false, message: 'User Not found' })
			next()
		}

	} catch (err) {
		res.status(400).json({ success: false, message: err })
		next()
	}
}