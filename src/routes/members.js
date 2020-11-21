const express = require("express");

const router = express.Router();

const memberController = require('../controllers/members');

router.get('/policy/:policyId/members', memberController.listMembers);
router.get('/policy/:policyId/member/:memberId', memberController.getMember);
router.get('/policy/:policyId/dependents/:nik/', memberController.listDependents);
router.get('/policy/:policyId/dependent/:memberId/', memberController.getDependent);

module.exports = router;