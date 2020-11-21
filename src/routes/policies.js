const express = require("express");

const router = express.Router();

const policiesController = require('../controllers/policies');

router.get('/policies', policiesController.listPolicies);
router.get('/policy/:id', policiesController.getPolicy);

module.exports = router;