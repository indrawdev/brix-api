const express = require('express')

const router = express.Router()

const requestsController = require('../controllers/requests')
const { verify } = require('../middlewares/verify')

router.get('/requests', verify, requestsController.listHeadRequests)
router.get('/requests/:userId', verify, requestsController.listOwnRequests)

module.exports = router