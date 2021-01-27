const express = require('express')

const router = express.Router()

const approveController = require('../controllers/approve')
const { verify } = require('../middlewares/verify')

router.put('/approve/attendance/:id', verify, approveController.approveAttendance)
router.put('/approve/timeoff/:id', verify, approveController.approveTimeoff)

module.exports = router