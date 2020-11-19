const express = require("express");

const router = express.Router();

const memberController = require('../controllers/members');

router.get('/policy/:policyId/members', memberController.listMembers);
router.get('/policy/:policyId/member/:memberId', memberController.getMember);
router.get('/policy/:policyId/member/:memberId/dependents', memberController.listDependents);

module.exports = router;