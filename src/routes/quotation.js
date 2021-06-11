const express = require('express')

const router = express.Router()

const quotationsController = require('../controllers/quotations')
const { verify } = require('../middlewares/verify')

router.get('/quotations', verify, quotationsController.listHeadQuotations)
router.get('/quotations/:userId', verify, quotationsController.listOwnQuotations)

module.exports = router