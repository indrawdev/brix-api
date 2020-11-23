const dotenv = require('dotenv')
dotenv.config()

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Token = require('../utils/token')

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
                let accessToken = jwt.sign({ 
                        clientId: result.client_id,
                        userId: result.userclient_id, 
                        email: result.userclient_email 
                    }, 
                    accessTokenSecret, { expiresIn: process.env.TOKEN_LIFE });

                res.status(200).json({ success: true, accessToken: accessToken, data: result })
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
    const email = req.body.email
    const token = jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE })
    
    res.json(token)
    next()
}

exports.verifyToken = (req, res, next) => {
    const currentToken = req.body.token
    try {
        const data = jwt.verify(currentToken, process.env.TOKEN_SECRET);
        res.status(200).json({success: false, data: data })
        next()
    } catch(err) {
        res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
        next()
    }
}

exports.signOut = (req, res, next) => {
    
}
