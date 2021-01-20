const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const reimbursesController = require('../controllers/reimburses')
const { verify } = require('../middlewares/verify')

router.get('/policy/:policyId/reimburses', verify, reimbursesController.listReimburses)
router.get('/reimburse/:id', verify, reimbursesController.getReimburse)
router.get('/reimburse/details/:batch', verify, reimbursesController.listDetails)
router.get('/policy/:policyId/reimburses/members', verify, reimbursesController.listMembers)

router.post('/reimburses', verify, reimbursesController.createReimburse)
router.put('/reimburse/:id', verify, reimbursesController.editReimburse)
router.delete('/reimburse/:id', verify, reimbursesController.deleteReimburse)

module.exports = router