const Timeoff = require('../models/timeoff')

exports.listTimeoffs = async (req, res, next) => { 
	const employeeId = parseInt(req.params.employeeId)

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

	await Timeoff.findAndCountAll({
		where: { 
			employee_id: employeeId
		},
		order: [
			['timeoff_id', 'DESC']
		], 
		offset: offset, limit: limit 
	})
	.then(results => {
		res.status(200).json({ success: true, data: results })
		next()
	})
	.catch(err => {
		res.status(400).json({ success: false, message: err })
	})
}

exports.createTimeOff = async (req, res, next) => { 
	const employeeId = req.params.id
	const { type, effective, note, user } = JSON.parse(req.body)

	await Timeoff.create({
		'employee_id': employeeId,
		'type_request': type,
		'effective_date': effective,
		'note': note,
		'created_by': user,
		'created_at': new Date()
	})
}

exports.createDetail = async (req, res, next) => { 
	const employeeId = req.params.id
	const { type, effective, note, user } = JSON.parse(req.body)

}

exports.updateTimeOff = async (req, res, next) => { 

}

exports.deleteTimeOff = async (req, res, next) => { 

}

exports.deleteDetail = async (req, res, next) => { 

}