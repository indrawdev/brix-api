const { Op } = require('sequelize')
const Reimburse = require('../models/reimburse')
const Client = require('../models/client')
const Policy = require('../models/policy')
const ReimburseMember = require('../models/reimburseMember')

// show all reimburses
exports.listReimburses = (req, res, next) => {

    const policyId = req.params.policyId

    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)

    Reimburse.findAndCountAll({
        include: ReimburseMember,
        where: { policy_id: policyId, is_active: 1 }, 
        order: [
            ['claim_id', 'DESC']
        ],
        offset: offset, limit: limit
    })
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

    Reimburse.findByPk(reimburseId, { 
        include: [Client, Policy]
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
    })
}

exports.listDetails = (req, res, next) => {
    const batch = req.params.batch

    let offset    = parseInt(req.query.offset)
    let limit   = parseInt(req.query.limit)
    let search  = req.query.search

    ReimburseMember.findAndCountAll({
        where: {
            batch_code: batch,
            member_name: {
                [Op.like]: `%${search}%`
            }
        },
        order: [
            ['created_at', 'DESC']
        ],
        offset: offset, limit: limit
    })
    .then(results => {
        res.status(200).json({ success: true, data: results })
        next()
    })
    .catch(err => {
        res.status(400).json({ success: false, data: err })
        next()
    })
}

exports.listMembers = (req, res, next) => {
    const policyId = req.params.policyId

    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    let search = req.query.search

    ReimburseMember.findAndCountAll({
        include: {
            model: Reimburse,
            attributes: ['batch_code'],
            where: {
                policy_id: policyId,
                is_active: 1
            }
        },
        where: {
            member_name: {
                [Op.like]: `%${search}%`
            }
        },
        order: [
            ['created_at', 'DESC']
        ],
        offset: offset, limit: limit
    })
    .then(results => { 
        res.status(200).json({ success: true, data: results })
        next()
    })
    .catch(err => { 
        res.status(400).json({ success: false, data: err })
        next()
    })
}

exports.createReimburse = (req, res, next) => {

}

exports.editReimburse = (req, res, next) => {

}

exports.deleteReimburse = (req, res, next) => {

}