const { Op } = require('sequelize')
const Member = require('../models/member')
const Dependent = require('../models/dependent')

exports.listMembers = async (req, res, next) => {
	const policyId = parseInt(req.params.policyId)

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search

	await Member.findAndCountAll({ 
		where: {
			policy_id: policyId,
			is_active: '1',
			member_name: {
				[Op.like]: `%${search}%`
			}
		},
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
		next()
	})
}

exports.getMember = async (req, res, next) => { 
	const policyId = req.params.policyId
	const memberId = req.params.memberId
	
	await Member.findOne({
		where: { policy_id: policyId, member_id: memberId }
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

exports.listDependents = async (req, res, next) => {
	const policyId = parseInt(req.params.policyId)

	const nik = req.params.nik
	let search = req.query.search

	await Dependent.findAll({
		where: {
			policy_id: policyId, member_nik: nik,
			member_name: {
				[Op.like]: `%${search}%`
			}
		}
	})
	.then(results => {
		res.status(200).json({ success: true, data: results })
		next()
	})
	.catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.getDependent = async (req, res, next) => {
	const policyId = parseInt(req.params.policyId)
	const memberId = parseInt(req.params.memberId)

	await Dependent.findOne({
		where: { policy_id: policyId, member_id: memberId }
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

exports.listMembersAndDependents = async (req, res, next) => { 
	const policyId = parseInt(req.params.policyId)

	await Member.findAndCountAll({
		include: {
			model: Dependent,
			attributes: ['member_name', 'member_dob', 'member_gender', 'member_relation', 'member_effective'],
			where: {
				policy_id: policyId,
				is_active: '1'
			}
		},
		attributes: ['member_name', 'member_dob', 'member_gender', 'member_marital', 'member_join', 'member_effective'],
		where: {
			policy_id: policyId, is_active: '1'
		},
		order: [
			['member_id', 'DESC']
		]
	})
	.then(results => {
		res.status(200).json({ success: true, data: results })
		next()
	})
	.catch(err => {
		res.status(500).json({ success: false, message: err })
	})
}