const express = require('express')

const router = express.Router()

const employeeController = require('../controllers/employee')
const { verify } = require('../middlewares/verify')

// route employees
router.get('/employees', verify, employeeController.listEmployees)
router.get('/employee/:id', verify, employeeController.getEmployee)

// route families
router.get('/employee/:id/families', verify, employeeController.listFamilies)
router.post('/employee/:id/family', verify, employeeController.createFamily)
router.put('/employee/:id/family/:fid', verify, employeeController.updateFamily)
router.delete('/employee/:id/family/:fid', verify, employeeController.deleteFamily)

// route files 
router.get('/employee/:id/files', verify, employeeController.listFiles)
router.post('/employee/:id/file', verify, employeeController.createFile)
router.delete('/employee/:id/file/:fid', verify, employeeController.deleteFile)

// route formals
router.get('/employee/:id/formals', verify, employeeController.listFormals)
router.post('/employee/:id/formal', verify, employeeController.createFormal)
router.put('/employee/:id/formal/:fid', verify, employeeController.updateFormal)
router.delete('/employee/:id/formal/:fid', verify, employeeController.deleteFormal)

// route informals
router.get('/employee/:id/informals', verify, employeeController.listInformals)
router.post('/employee/:id/informal', verify, employeeController.createInformal)
router.put('/employee/:id/informal/:fid', verify, employeeController.updateInformal)
router.delete('/employee/:id/informal/:fid', verify, employeeController.deleteInformal)

// route experiences
router.get('/employee/:id/experiences', verify, employeeController.listExperiences)
router.post('/employee/:id/experience', verify, employeeController.createExperience)
router.put('/employee/:id/experience/:fid', verify, employeeController.updateExperience)
router.delete('/employee/:id/experience/:fid', verify, employeeController.deleteExperience)

module.exports = router