const express = require('express')
const { body, validationResult } = require('express-validator')

const router = express.Router()

const attendanceController = require('../controllers/attendance')
const { verify } = require('../middlewares/verify')

// router.get('attendances/', verify, attendanceController.listEmployee)
// router.get('attendance/:attendanceId', verify, attendanceController.)

module.exports = router