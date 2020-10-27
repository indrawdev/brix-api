const express = require("express");

const router = express.Router();

const cashlessesController = require('../controllers/cashlesses');

router.get('/cashless/:id', cashlessesController.getCashless);

router.get('/cashlesses', cashlessesController.listCashlesses);

module.exports = router;