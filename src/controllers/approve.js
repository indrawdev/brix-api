const Attendance = require('../models/attendance')
const Timeoff = require('../models/timeoff')

exports.approveAttendance = (req, res, next) => {
	const attendanceId = req.params.id
	const data = JSON.parse(JSON.stringify(req.body))

	await Attendance.update({
		'is_approve': '1',
		'approval_by': data.user,
		'approval_at': new Date()
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
			res.status(500).json({ success: false, error: err })
			next()
		})
}

exports.approveTimeoff = (req, res, next) => {
	const timeoffId = req.params.id
	const data = JSON.parse(JSON.stringify(req.body))

	await Timeoff.update({
		'updated_by': data.user,
		'updated_at': new Date()
	}, {
		where: {
			'off_id': timeoffId
		}
	})
		.then(result => {
			res.status(200).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, error: err })
			next()
		})
}