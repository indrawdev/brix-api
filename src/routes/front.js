const express = require('express')

const router = express.Router()

const frontController = require('../controllers/front')
router.get('/', frontController.me)

module.exports = router