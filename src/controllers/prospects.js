const { Op } = require('sequelize')
const Pipeline = require('../models/pipeline')
const Group = require('../models/group')

exports.listHeadProspects = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	await Pipeline.findAndCountAll({
		include: Group,
		where: {
			is_active: 1,
			business_level: 'CR',
			company_name: {
				[Op.like]: `%${search}%`
			},
			pipeline_code: {
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

exports.listOwnProspects = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	const userId = parseInt(req.params.userId)

	await Pipeline.findAndCountAll({
		include: Group,
		where: {
			created_by: userId,
			is_active: 1,
			business_level: 'CR',
			company_name: {
				[Op.like]: `%${search}%`
			},
			pipeline_code: {
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