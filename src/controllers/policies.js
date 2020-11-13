const Policy = require('../models/policy')

exports.listPolicies = (req, res, next) => { 

    Policy.findAll()
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
    
    Policy.findByPk(policyId)
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
