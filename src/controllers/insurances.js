const Insurance = require('../models/insurance')

exports.listInsurance = (req, res, next) => {
    Insurance.findAll()
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, message: err })
            next()
        })
}

exports.getInsurance = (req, res, next) => { 
    
    const insuranceId = req.params.id

    Insurance.findByPk(insuranceId, { include: Policy })
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
