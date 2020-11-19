const Reimburse = require('../models/reimburse')

// show all reimburses
exports.listReimburses = (req, res, next) => {

    const policyId = req.params.policyId

    Reimburse.findAll({ where: { policy_id: policyId, is_active: 1 }})
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, data: err })
            next()
        });
}

// show single reimburse
exports.getReimburse = (req, res, next) => {
    
    const reimburseId = req.params.id

    Reimburse.findByPk(reimburseId)
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
        })
}

exports.createReimburse = (req, res, next) => {

}

exports.editReimburse = (req, res, next) => {

}

exports.deleteReimburse = (req, res, next) => {

}