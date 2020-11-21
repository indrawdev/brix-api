const Client = require('../models/client')
const User = require('../models/user')
const Policy = require('../models/policy')

exports.listClients = (req, res, next) => {
    
    let page    = parseInt(req.query.page)
    let limit   = parseInt(req.query.limit)
    let offset  = 0 + (page - 1) * limit

    Client.findAndCountAll({
        where: { is_active: 1 },
        order: [
            ['client_id', 'DESC']
        ], 
        offset: offset, limit: limit 
    })
    .then(results => {
        res.status(200).json({ success: true, data: results })
        next()
    })
    .catch(err => {
        res.status(400).json({ success: true, message: err })
        next()
    })
}

exports.getClient = (req, res, next) => { 
    const clientId = req.params.id
    
    Client.findByPk(clientId, { include: [User, Policy]})
        .then(client => {
            if (client) {
                res.status(200).json({ success: true, data: client })
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
}
