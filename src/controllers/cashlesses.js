const { Op } = require('sequelize')
const Cashless = require('../models/cashless')
const Client = require('../models/client')
const Policy = require('../models/policy')
const CashlessMember = require('../models/cashlessMember')

exports.listCashlesses = async (req, res, next) => {
	const policyId = req.params.policyId

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

	await Cashless.findAndCountAll({
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
		res.status(400).json({ success: false, message: err })
		next()
	})
}

exports.getCashless = async (req, res, next) => {
	const cashlessId = req.params.id

	await Cashless.findByPk(cashlessId, { 
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

exports.listDetails = async (req, res, next) => {
	const batch = req.params.batch

	let offset = parseInt(req.query.offset)
	let limit   = parseInt(req.query.limit)
	let search  = req.query.search

	await CashlessMember.findAndCountAll({
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

exports.listMembers = async (req, res, next) => {
	const policyId = req.params.policyId

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)
	let search = req.query.search

	await CashlessMember.findAndCountAll({
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

exports.createCashless = async (req, res, next) => {
	const data = JSON.parse(JSON.stringify(req.body))

	try {

	} catch (err) {
		
	}
	// members.forEach(element => console.log(element))
	await Cashless.create({
		'client_id': data.client_id,
		'policy_id': data.policy_id,
		'batch_code': data.batch_code,
		'currency': data.currency,
		'total_case': data.total_case,
		'total_excess': data.total_excess,
		'total_unpaid': data.total_unpaid,
		'total_paid': data.total_paid,
		'created_by': data.created_by,
		'created_at': data.created_at
	}).then(results => { 

	}).catch(err => { 

	})

	console.log(data.details.length)
	next()

	// await CashlessMember.bulkCreate(data.details, {returning: true})
	// .then(results => {
	// 	res.status(200).json({ success: true, data: results })
	// 	next()
	// })
	// .catch(err => { 
	// 	res.status(400).json({ success: false, data: err })
	// 	next()
	// })
}

exports.editCashless = async (req, res, next) => {
	const { batch } = req.body
	await CashlessMember.find({})
}

exports.deleteCashless = async (req, res, next) => {
    
}