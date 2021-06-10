const Timeoff = require('../models/timeoff')

exports.listTimeOffs = async (req, res, next) => {
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10

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
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.getTimeOff = async (req, res, next) => { 
	const timeoffId = parseInt(req.params.id)

	await Timeoff.findByPk(timeoffId)
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
		res.status(400).json({ success: false, message: err })
		next()
	})
}

exports.createTimeOff = async (req, res, next) => {
	const data = JSON.parse(JSON.stringify(req.body))

	await Timeoff.create({
		'employee_id': data.employee_id,
		'type_request': data.type_request,
		'effective_date': data.effective_date,
		'note': data.note,
		'created_by': data.user_id,
		'created_at': new Date()
	}).then(result => { 
		res.status(201).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})

}

exports.updateTimeOff = async (req, res, next) => {
	const timeoffId = parseInt(req.params.id)
	const data = JSON.parse(JSON.stringify(req.body))

	await Timeoff.update({
		'type_request': data.type_request,
		'effective_date': data.effective_date,
		'note': data.note,
		'user_id': data.user_id
	}, {
		where: {
			'timeoff_id': timeoffId
		}
	})	
		.then(result => {
			res.status(200).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.deleteTimeOff = async (req, res, next) => {
	const timeoffId = req.params.tid

	await Timeoff.delete({
		where: {
			'timeoff_id': timeoffId
		}
	})
		.then(result => {
			res.status(200).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.deleteDetail = async (req, res, next) => {

}