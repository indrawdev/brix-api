const { Op } = require('sequelize')
const Client = require('../models/client')
const UserClient = require('../models/userclient')
const Policy = require('../models/policy')
const Insurance = require('../models/insurance')

exports.listClients = async (req, res, next) => {

	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search

	await Client.findAndCountAll({
		where: {
			is_active: 1,
			client_name: {
				[Op.like]: `%${search}%`
			}
		},
		order: [
			['client_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(400).json({ success: true, message: err })
			next()
		})
}

exports.getClient = async (req, res, next) => {
	const clientId = req.params.id

	await Client.findByPk(clientId, {
		include: [{
			model: UserClient
		}, {
			model: Policy,
			include: Insurance
		}]
	})
		.then(client => {
			if (client) {
				res.status(200).json({ success: true, data: client })
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
