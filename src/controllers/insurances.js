const Insurance = require('../models/insurance')

exports.getInsurance = (req, res, next) => { 

    const insuranceId = req.params.id
    
    Insurance.findByPk(insuranceId)
        .then(insurance => {
            if (insurance) {
                res.status(200).json({
                    success: true,
                    data: insurance
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
