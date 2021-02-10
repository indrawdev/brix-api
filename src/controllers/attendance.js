const Attendance = require('../models/attendance')

exports.listAttendances = async (req, res, next) => {
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10

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
	const attendanceId = parseInt(req.params.id)

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
		'employee_id': data.employee_id,
		'type_request': data.type_request,
		'attendance_status': data.attendance_status,
		'created_by': data.user_id,
		'created_at': new Date()
	})
		.then(result => {
			res.status(201).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.updateAttendance = async (req, res, next) => {
	const attendanceId = parseInt(req.params.id)

	const data = JSON.parse(JSON.stringify(req.body))

	await Attendance.update({
		'type_request': data.type_request,
		'attendance_status': data.attendance_status,
		'updated_by': data.user_id,
		'updated_at': new Date()
	}, {
		where: {
			'attendance_id': attendanceId
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

exports.deleteAttendance = async (req, res, next) => {
	const attendanceId = parseInt(req.params.id)

	await Attendance.delete({
		where: {
			'attendance_id': attendanceId
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