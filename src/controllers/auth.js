const md5 = require('md5')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const accessTokenSecret = 'blablabla'

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
                    accessTokenSecret, { expiresIn: '120m' });

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

}

exports.signOut = (req, res, next) => {
    
}
