const dotenv = require('dotenv')
dotenv.config()

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.signIn = async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    const hashedPass = md5(password + email)

    try {
        await User.findOne({
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
                    User.update({
                        last_login: new Date(Date.now()).toISOString()
                    },{
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
        res.status(500).json({ success: false, message: e})
    }
}

exports.refreshToken = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(" ")[1]
    let payload

    if (!accessToken){
        return res.status(403).json()
    }

    try {
        payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch(e){
        return res.status(401).json({ error: e })
    }

    let refreshToken = ''

    try{
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    let newToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { 
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    res.status(200).json("accessToken", newToken)
    res.send()
}

exports.me = async (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const currentToken = req.headers.authorization.split(" ")[1]

        try {
            const data = await jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ success: false, data: data })
            next()
        } catch(err) {
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
            res.status(200).json({ success: true, message: 'Signout success', data: data})
            next()
        } catch(err) {
            res.status(500).json({ success: false, message: 'Failed to authenticate token' })
            next()
        }
    } else {
        res.status(500).json({ error: "Not Authorized" })
        next()
    }
}
