const e = require('express')
const Dependent = require('../models/dependent')
const Member = require('../models/member')

exports.listMembers = (req, res, next) => {
    const policyId = req.params.policyId

    let offset    = parseInt(req.query.offset)
    let limit   = parseInt(req.query.limit)

    Member.findAndCountAll({ 
        where: { policy_id: policyId, is_active: 1 },
        order: [
            ['member_id', 'DESC']
        ], 
        offset: offset, limit: limit 
    })
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

exports.listDependents = (req, res, next) => {
    const policyId = req.params.policyId
    const nik = req.params.nik

    Dependent.findAll({ where: { policy_id: policyId, member_nik: nik }})
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: false, message: err })
            next()
        })
}

exports.getDependent = (req, res, next) => {
    const policyId = req.params.policyId
    const memberId = req.params.memberId

    Dependent.findOne({ where: { policy_id: policyId, member_id: memberId }})
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