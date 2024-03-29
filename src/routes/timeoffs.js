const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const timeoffController = require('../controllers/timeoff')
const { verify } = require('../middlewares/verify')

router.get('/timeoffs/:eid', verify, timeoffController.listTimeOffs)
router.get('/timeoff/:id', verify, timeoffController.getTimeOff)
router.post('/timeoff', verify, timeoffController.createTimeOff)
router.put('/timeoff/:id', verify, timeoffController.updateTimeOff)
router.delete('/timeoff/:id', verify, timeoffController.deleteTimeOff)

module.exports = router 