const { Op } = require('sequelize')
const Cashless = require('../models/cashless')
const Client = require('../models/client')
const Policy = require('../models/policy')
const CashlessMember = require('../models/cashlessMember')

exports.listCashlesses = (req, res, next) => {
    const policyId = req.params.policyId

    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)

    Cashless.findAndCountAll({
        include: CashlessMember,
        where: { policy_id : policyId, is_active: 1 }, 
        order: [
            ['excess_id', 'DESC']
        ], 
        offset: offset, limit: limit 
    })
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

    Cashless.findByPk(cashlessId, { 
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
        next()
    })
}

exports.listDetails = (req, res, next) => {
    const batch = req.params.batch

    let offset = parseInt(req.query.offset)
    let limit   = parseInt(req.query.limit)
    let search  = req.query.search

    CashlessMember.findAndCountAll({
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

    CashlessMember.findAndCountAll({
        include: {
            model: Cashless,
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

