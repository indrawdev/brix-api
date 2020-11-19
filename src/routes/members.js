const express = require("express");

const router = express.Router();

const memberController = require('../controllers/members');

router.get('/policy/:policyId/members', memberController.listMembers);
router.get('/policy/:policyId/member/:id', memberController.getMember);

module.exports = router;