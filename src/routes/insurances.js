const express = require("express");

const router = express.Router();

const insurancesController = require('../controllers/insurances');

router.get('/insurances', insurancesController.listInsurances);
router.get('/insurance/:id', insurancesController.getInsurance);

module.exports = router;