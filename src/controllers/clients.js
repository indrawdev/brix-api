const Client = require('../models/client')

exports.getClient = (req, res, next) => { 
    const clientId = req.params.id
    Client.findByPk(clientId)
        .then(client => {
            if (client) {
                res.status(200).json({
                    success: true,
                    data: client
                })
                next()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Not found'
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
}
