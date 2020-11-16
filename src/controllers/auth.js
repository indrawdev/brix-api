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
        .then((user) => {
            if (user) {
                let accessToken = jwt.sign(
                    { 
                        clientId: user.client_id,
                        userId: user.userclient_id, 
                        email: user.userclient_email 
                    }, 
                    accessTokenSecret, { expiresIn: '30m' });

                res.status(200).json({
                    success: true,
                    message: 'Login success',
                    accessToken: accessToken,
                    data: user
                })

                next()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Login failed',
                })

                next()
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: err
            })

            next()
        })
    } catch (e) {
        
    }
}

exports.signOut = (req, res, next) => {

    try {
        
    } catch (e) {
        
    }
}
