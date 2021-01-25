const Policy = require('../models/policy')
const Client = require('../models/client')
const Insurance = require('../models/insurance')

exports.listPolicies = async (req, res, next) => { 

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await Policy.findAndCountAll({ 
		include: [Client, Insurance],
		order: [
			['policy_id', 'DESC']
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

exports.getPolicy = async (req, res, next) => { 

	const policyId = req.params.id
	
	await Policy.findByPk(policyId, { 
		include: [Client, Insurance] 
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