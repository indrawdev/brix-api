const { Op } = require('sequelize')

const Employee = require('../models/employee')
const Family = require('../models/family')
const File = require('../models/file')
const Formal = require('../models/formal')
const Informal = require('../models/informal')
const Experience = require('../models/experience')

exports.listEmployees = async (req, res, next) => { 
	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)
	let search = req.query.search

	await Employee.findAndCountAll({
		where: {
			is_active: 1,
			employee_name: {
				[Op.like]: `%${search}%`
			}
		},
		order: [
			['employee_name', 'ASC']
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


exports.getEmployee = async (req, res, next) => { 
	const employeeId = req.params.id

	await Employee.findByPk(employeeId, {
		include: [Family, File, Formal, Informal, Experience]
	})
	.then(employee => {
		if (employee) {
			res.status(200).json({ success: true, data: employee })
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
