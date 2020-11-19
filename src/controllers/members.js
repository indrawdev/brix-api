const e = require('express')
const Member = require('../models/member')

exports.listMembers = (req, res, next) => {
    const policyId = req.params.policyId
    
    Member.findAll({ where: { policy_id: policyId, is_active: 1 }})
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, message: err })
        })
}

exports.getMember = (req, res, next) => { 
    const policyId = req.params.policyId
    const memberId = req.params.memberId
    
    Member.findOne({ where: { policy_id: policyId, member_id: memberId }})
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