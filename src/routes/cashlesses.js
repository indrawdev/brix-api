const express = require("express");

const router = express.Router();

const cashlessesController = require('../controllers/cashlesses');

router.get('/cashlesses', cashlessesController.listCashlesses);
router.get('/cashless/:id', cashlessesController.getCashless);
router.post('/cashlesses', cashlessesController.createCashless);
router.put('/cashless/:id', cashlessesController.editCashless);
router.delete('/cashless/:id', cashlessesController.deleteCashless);

module.exports = router;