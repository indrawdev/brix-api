const { Op } = require('sequelize')
const Cashless = require('../models/cashless')
const Client = require('../models/client')
const Policy = require('../models/policy')
const CashlessMember = require('../models/cashlessMember')

exports.listCashlesses = async (req, res, next) => {
	const policyId = req.params.policyId

	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10

	await Cashless.findAndCountAll({
		include: CashlessMember,
		where: { policy_id: policyId, is_active: 1 },
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
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.listDetails = async (req, res, next) => {
	const batch = req.params.batch

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search

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
			request_code: {
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

	await Cashless.create({
		'client_id': data.client_id,
		'policy_id': data.policy_id,
		'batch_code': data.batch_code,
		'currency': data.currency,
		'total_case': data.total_case,
		'total_excess': data.total_excess,
		'total_unpaid': data.total_unpaid,
		'total_paid': data.total_paid,
		'received_date': data.received_date,
		'followup_date': data.followup_date,
		'due_date': data.followup_date,
		'created_by': data.user,
		'created_at': new Date()
	})
		.then(result => {
			res.status(201).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, data: err })
			next()
		})

}

exports.updateCashless = async (req, res, next) => {
	const excessId = req.params.id

	const data = JSON.parse(JSON.stringify(req.body))

	await CashlessMember.update({
		'currency': data.currency,
		'total_case': data.total_case,
		'total_excess': data.total_excess,
		'total_unpaid': data.total_unpaid,
		'total_paid': data.total_paid,
		'received_date': data.received_date,
		'followup_date': data.followup_date,
		'due_date': data.followup_date,
		'updated_by': data.user,
		'updated_at': new Date()
	}, {
		where: {
			'excess_id': excessId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, data: err })
		next()
	})
}

exports.deleteCashless = async (req, res, next) => {
	const excessId = req.params.id

	await CashlessMember.update({
		'is_active': '0'
	}, {
		where: {
			'excess_id': excessId
		}
	})
		.then(result => {
			res.status(200).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, data: err })
			next()
		})
}