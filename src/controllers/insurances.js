const Insurance = require('../models/insurance')
const Policy = require('../models/policy')

exports.listInsurances = (req, res, next) => {
    
    let page    = parseInt(req.query.page)
    let limit   = parseInt(req.query.limit)
    let offset  = 0 + (page - 1) * limit

    Insurance.findAndCountAll({
        where: { is_active: 1 },
        order: [
            ['insurance_id', 'DESC']
        ], 
        offset: offset, limit: limit 
    })
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

    Insurance.findByPk(insuranceId, { 
        include: Policy 
    })
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
