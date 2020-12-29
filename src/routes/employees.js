const express = require('express')

const router = express.Router()

const employeeController = require('../controllers/employee')
const { verify } = require('../middlewares/verify')

router.get('/employees', verify, employeeController.listEmployees)
router.get('/employee/:id', verify, employeeController.getEmployee)

module.exports = router