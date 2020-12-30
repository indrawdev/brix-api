const Attendance = require('../models/attendance')

exports.listAttendances = async (req, res, next) => {
	const employeeId = parseInt(req.params.employeeId)

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

	await Attendance.findAndCountAll({
		where: { 
			employee_id: employeeId
		},
		order: [
			['attendance_id', 'DESC']
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

exports.getAttendance = async (req, res, next) => {
	const attendanceId = req.params.id

	await Attendance.findByPk(attendanceId)
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

exports.createAttendance = async (req, res, next) => { 
	const data = JSON.parse(JSON.stringify(req.body))
	await Attendance.create({

	})
	.then(result => { 
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => { 
		res.status(400).json({ success: false, message: err })
		next()
	})
}