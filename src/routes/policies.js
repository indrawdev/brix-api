const express = require('express')

const router = express.Router()

const policiesController = require('../controllers/policies')
const { verify } = require('../middlewares/verify')

router.get('/policies', verify, policiesController.listPolicies)
router.get('/policy/:id', verify, policiesController.getPolicy)

module.exports = router