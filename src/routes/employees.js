const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const employeeController = require('../controllers/employee')
const { verify } = require('../middlewares/verify')

// route employees
router.get('/employees', verify, employeeController.listEmployees)
router.get('/employee/:id', verify, employeeController.getEmployee)

// route families
router.get('/families/:eid', verify, employeeController.listFamilies)
router.post('/family', verify, employeeController.createFamily)
router.put('/family/:id', verify, employeeControler.updateFamily)
router.delete('/family/:id', verify, employeeController.deleteFamily)

// route files 
router.get('/files/:eid', verify, employeeController.listFiles)
router.post('/file', verify, employeeController.createFile)
router.delete('/file/:id', verify, employeeController.deleteFile)

// route formals
router.get('/formals/:eid', verify, employeeController.listFormals)
router.post('formal', verify, employeeController.createFormal)
router.put('/formal/:id', verify, employeeController.updateFormal)
router.delete('/formal/:id', verify, employeeController.deleteFormal)

// route informals
router.get('/informals/:eid', verify, employeeController.listInformals)
router.post('/informal', verify, employeeController.createInformal)
router.put('/informal/:id', verify, employeeController.updateInformal)
router.delete('/informal/:id', verify, employeeController.deleteInformal)

// route experiences
router.get('/experiences/:eid', verify, employeeController.listExperiences)
router.post('/experience', verify, employeeController.createExperience)
router.put('/experience/:id', verify, employeeController.updateExperience)
router.delete('/experience/:id', verify, employeeController.deleteExperience)

module.exports = router