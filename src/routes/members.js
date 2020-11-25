const express = require("express")

const router = express.Router()

const memberController = require('../controllers/members')
const { verify } = require('../middlewares/verify')

router.get('/policy/:policyId/members', verify, memberController.listMembers)
router.get('/policy/:policyId/member/:memberId', verify, memberController.getMember)
router.get('/policy/:policyId/dependents/:nik/', verify, memberController.listDependents)
router.get('/policy/:policyId/dependent/:memberId/', verify, memberController.getDependent)

module.exports = router