const { Op } = require('sequelize')
const Request = require('../models/request')
const Client = require('../models/client')

exports.listHeadRenewals = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	await Request.findAndCountAll({
		include: {
			model: Client,
			attributes: ['client_type', 'client_name'],
			where: {
				is_active: 1,
				client_name: {
					[Op.like]: `%${search}%`
				}
			}
		},
		where: {
			business_level: 'CR',
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

exports.listOwnRenewals = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	const userId = parseInt(req.params.userId)

	await Request.findAndCountAll({
		include: {
			model: Client,
			attributes: ['client_type', 'client_name'],
			where: {
				is_active: 1,
				client_name: {
					[Op.like]: `%${search}%`
				}
			}
		},
		where: {
			business_level: 'CR',
			created_by: userId,
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