const express = require("express");

const router = express.Router();

const insurancesController = require('../controllers/insurances');

router.get('/insurances', insurancesController.listInsurance);
router.get('/insurance/:id', insurancesController.getInsurance);

module.exports = router;