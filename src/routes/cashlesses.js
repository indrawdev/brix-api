const express = require("express")

const router = express.Router()

const cashlessesController = require('../controllers/cashlesses')
const { verify } = require('../middlewares/verify')

router.get('/policy/:policyId/cashlesses', verify, cashlessesController.listCashlesses)
router.get('/cashless/:id', verify, cashlessesController.getCashless)
router.get('/cashless/details/:batch', verify, cashlessesController.listDetails)

router.post('/cashlesses', cashlessesController.createCashless)
router.put('/cashless/:id', cashlessesController.editCashless)
router.delete('/cashless/:id', cashlessesController.deleteCashless)

module.exports = router