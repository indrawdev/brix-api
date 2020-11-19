const Cashless = require('../models/cashless')
const Client = require('../models/client')
const Policy = require('../models/policy')

exports.listCashlesses = (req, res, next) => {
    const policyId = req.params.policyId

    Cashless.findAll({ where: { policy_id : policyId, is_active: 1}})
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, message: 'Error'})
            next()
        })
}

exports.getCashless = (req, res, next) => {
    const cashlessId = req.params.id

    Cashless.findByPk(cashlessId, { include: [Client, Policy]})
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

exports.createCashless = (req, res, next) => {
    try {
        
    } catch (e) {
        
    }
}

exports.editCashless = (req, res, next) => {
    try {
        
    } catch (e) {
        
    }
}

exports.deleteCashless = (req, res, next) => {
    try {
        
    } catch (e) {
        
    }
}

