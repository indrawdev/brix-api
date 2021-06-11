const { Op } = require('sequelize')
const Placing = require('../models/placing')
const Proposal = require('../models/proposal')
const Request = require('../models/request')
const Pipeline = require('../models/pipeline')
const Insurance = require('../models/insurance')

exports.listHeadQuotations = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	await Placing.findAndCountAll({
		include: [{
			model: Proposal,
			attributes: ['file_upload'],
		}, {
			model: Request,
			attributes: ['request_code', 'business_type', 'type_cover', 'allocated_budget'],
			include: {
				model: Pipeline,
				attributes: ['pipeline_code', 'company_type', 'company_name'],
				where: {
					company_name: {
						[Op.like]: `%${search}%`
					}
				}
			}
		}, {
			model: Insurance,
			attributes: ['insurance_type', 'insurance_name'],
			}],
			attributes: ['placing_id', 'quotation_code', 'type_cover', 'insured_person', 'start_periode', 'end_periode', 'policy_number', 'brokerage_pct', 'currency'],
		where: {
			is_active: '1',
			is_signature: '1',
			quotation_code: {
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

exports.listOwnQuotations = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

	const userId = parseInt(req.params.userId)

	await Placing.findAndCountAll({
		include: [{
			model: Proposal,
			attributes: ['file_upload'],
		}, {
			model: Request,
			attributes: ['request_code', 'business_type', 'type_cover', 'allocated_budget'],
			include: {
				model: Pipeline,
				attributes: ['pipeline_code', 'company_type', 'company_name'],
				where: {
					company_name: {
						[Op.like]: `%${search}%`
					}
				}
			}
		}, {
			model: Insurance,
			attributes: ['insurance_type', 'insurance_name'],
			}],
			attributes: ['placing_id', 'quotation_code', 'type_cover', 'insured_person', 'start_periode', 'end_periode', 'policy_number', 'brokerage_pct', 'currency'],
		where: {
			is_active: '1',
			created_by: userId,
			is_signature: '1',
			quotation_code: {
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