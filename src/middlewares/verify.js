const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

exports.verify = async (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let accessToken = req.headers.authorization.split(" ")[1]
        try {
            await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
                if (err) {  
                    return res.status(500).json({ error: "Not Authorized" })
                }
                return next()
            })
        } catch (err) {
            return res.status(500).json({ error: err })
        }

    } else {
        throw new HttpError('Could not find auth id.', 404);
    }
}