const express = require("express");

const router = express.Router();

const policiesController = require('../controllers/policies');

router.get('/policies', policiesController.listPolicies);
router.get('/policy/:id', policiesController.getPolicy);
router.get('/policy/:id/reimburse/:code', policiesController.getReimburse);
router.get('/policy/:id/cashless/:code', policiesController.getCashless);

module.exports = router;