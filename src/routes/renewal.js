const express = require('express')

const router = express.Router()

const renewalsController = require('../controllers/renewals')
const { verify } = require('../middlewares/verify')

router.get('/renewals', verify, renewalsController.listHeadRenewals)
router.get('/renewals/:userId', verify, renewalsController.listOwnRenewals)

module.exports = router