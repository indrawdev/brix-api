const Policy = require('../models/policy')
const Client = require('../models/client')
const Insurance = require('../models/insurance')

exports.listPolicies = (req, res, next) => { 

    Policy.findAll({ include: [Client, Insurance]})
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, message: err })
            next()
        })
}

exports.getPolicy = (req, res, next) => { 

    const policyId = req.params.id
    
    Policy.findByPk(policyId, { include: [Client, Insurance] })
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
        })
}