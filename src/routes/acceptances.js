const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const acceptanceController = require('../controllers/acceptances')
const { verify } = require('../middlewares/verify')

router.get('/acceptances', verify, acceptanceController.listAcceptances)

module.exports = router