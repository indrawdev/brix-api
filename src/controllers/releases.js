const { Op } = require('sequelize')
const Proposal = require('../models/proposal')
const Request = require('../models/request')
const Pipeline = require('../models/pipeline')
const Employee = require('../models/employee')
const User = require('../models/user')

exports.listHeadReleases = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	await Proposal.findAndCountAll({
		include: {
			model: Request,
			attributes: ['request_code', 'business_type', 'type_cover', 'allocated_budget'],
			where: {
				is_approve: 1,
				request_code: {
					[Op.like]: `%${search}%`
				}
			},
			include: [{
				model: Pipeline,
				attributes: ['pipeline_code', 'company_type', 'company_name'],
				where: {
					company_name: {
						[Op.like]: `%${search}%`
					}
				}
			}, {
				model: Employee,
				attributes: ['employee_name']
			}]
		},
		where: {
			[Op.or]: [
				{ is_action: 'N' },
				{ is_action: 'R' }
			]
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

exports.listOwnReleases = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	const userId = parseInt(req.params.userId)

	await Proposal.findAndCountAll({
		include: {
			model: Request,
			attributes: ['request_code', 'business_type', 'type_cover', 'allocated_budget'],
			where: {
				is_approve: 1,
				request_code: {
					[Op.like]: `%${search}%`
				}
			},
			include: [{
				model: Pipeline,
				attributes: ['pipeline_code', 'company_type', 'company_name'],
				where: {
					company_name: {
						[Op.like]: `%${search}%`
					}
				}
			}, {
				model: Employee,
				attributes: ['employee_name'],
				include: {
					model: User,
					attributes: ['email'],
					where: {
						user_id: userId
					}
				}
			}]
		},
		where: {
			[Op.or]: [
				{ is_action: 'N' },
				{ is_action: 'R' }
			]
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