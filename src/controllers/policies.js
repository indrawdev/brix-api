const Policy = require('../models/policy')
const Reimburse = require('../models/reimburse')
const Cashless = require('../models/cashless')
const Client = require('../models/client')
const Insurance = require('../models/insurance')

exports.listPolicies = (req, res, next) => { 

    Policy.findAll({ include: [Client, Insurance]})
        .then(policies => {
            if (policies) {
                res.status(200).json({
                    success: true,
                    data: policies
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
        })
}

exports.getPolicy = (req, res, next) => { 

    const policyId = req.params.id
    
    Policy.findByPk(policyId, { include: [Client, Insurance] })
        .then(policy => {
            if (policy) {
                res.status(200).json({
                    success: true,
                    data: policy
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: err
            })
        })
}

exports.getReimburse = (req, res, next) => {
    const policyId = req.params.id
    const code = req.params.code

    Reimburse.findOne({})
        .then(reimburse => {

        })
        .catch({

        })

}

exports.getCashless = (req, res, next) => { 
    const policyId = req.params.id
    const code = req.params.code

    Cashless.findOne({ where: code })
        .then(cashless => {

        }).catch({

        }) 
}