const express = require('express')

const router = express.Router()

const placingsController = require('../controllers/placings')
const { verify } = require('../middlewares/verify')

router.get('/placings', verify, placingsController.listHeadPlacings)
router.get('/placings/:userId', verify, placingsController.listOwnPlacings)

module.exports = router