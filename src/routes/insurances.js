const express = require("express")

const router = express.Router()

const insurancesController = require('../controllers/insurances')
const { verify } = require('../middlewares/verify')

router.get('/insurances', verify, insurancesController.listInsurances)
router.get('/insurance/:id', verify, insurancesController.getInsurance)

module.exports = router;