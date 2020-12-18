const express = require('express')

const router = express.Router()

const dashboardController = require('../controllers/dashboard')
const { verify } = require('../middlewares/verify')

router.get('/dashboard/totalclaim', verify, dashboardController.totalClaim)
router.get('/dashboard/totalmember', verify, dashboardController.totalMember)

module.exports = router