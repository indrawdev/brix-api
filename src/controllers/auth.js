const dotenv = require('dotenv')
dotenv.config()

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const accessTokenSecret = process.env.TOKEN_SECRET

exports.signIn = (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    const hashedPass = md5(password + email)

    try {
        User.findOne(
            { where: { userclient_email: email, userclient_password: hashedPass }}
        )
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
                
                res.status(200).json({ success: true, accessToken: accessToken, refreshToken: refreshToken, data: result })
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

exports.refreshToken = (req, res, next) => {
    const accessToken = req.headers.authorization.split(" ")[1]
    let payload

    if (!accessToken){
        return res.status(403).json()
    }

    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch(e){
        return res.status(401).json({ error: e })
    }

    let refreshToken = ''

    try{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { 
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    res.status(200).json("accessToken", newToken)
    res.send()
}

exports.me = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const currentToken = req.headers.authorization.split(" ")[1]

        try {
            const data = jwt.verify(currentToken, process.env.TOKEN_SECRET);
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

exports.signOut = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const currentToken = req.headers.authorization.split(" ")[1]
    }
}
