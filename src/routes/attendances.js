const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const attendanceController = require('../controllers/attendance')
const { verify } = require('../middlewares/verify')

router.get('/attendances/:eid', verify, attendanceController.listAttendances)
router.get('/attendance/employee/:id', verify, attendanceController.getAttendance)
router.post('/attendance', verify, attendanceController.createAttendance)
router.put('/attendance/employee/:id', verify, attendanceController.updateAttendance)
router.delete('/attendance/employee/:id', verify, attendanceController.deleteAttendance)

module.exports = router