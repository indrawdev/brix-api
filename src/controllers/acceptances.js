const { Op } = require('sequelize')
const Pipeline = require('../models/pipeline')
const Group = require('../models/group')

exports.listAcceptances = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search || ''

}