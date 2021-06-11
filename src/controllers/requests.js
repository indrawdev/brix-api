const { Op } = require('sequelize')
const Request = require('../models/request')
const Pipeline = require('../models/pipeline')

exports.listHeadRequests = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	await Request.findAndCountAll({
		include: {
			model: Pipeline,
			attributes: ['company_name', 'pipeline_code'],
			where: {
				is_active: 1,
				company_name: {
					[Op.like]: `%${search}%`
				}
			}
		},
		where: {
			business_level: 'MK',
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

exports.listOwnRequests = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	const userId = parseInt(req.params.userId)

	await Request.findAndCountAll({
		include: {
			model: Pipeline,
			attributes: ['company_name', 'pipeline_code'],
			where: {
				is_active: 1,
				company_name: {
					[Op.like]: `%${search}%`
				}
			}
		},
		where: {
			business_level: 'MK',
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