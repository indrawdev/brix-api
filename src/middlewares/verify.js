const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

exports.verify = (req, res, next) => {
    if (req.headers.authorization !== "undefined") {
        let accessToken = req.headers.authorization.split(" ")[1]

        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
                
            if (err) {  
                res.status(500).json({ error: "Not Authorized" })
            }
    
            return next()
        })
    } else {
        res.status(500).json({ error: "Not Authorized" })
    }
}