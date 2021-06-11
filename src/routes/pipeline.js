const express = require('express')

const router = express.Router()

const pipelinesController = require('../controllers/pipelines')
const { verify } = require('../middlewares/verify')

router.get('/pipelines', verify, pipelinesController.listHeadPipelines)
router.get('/pipelines/:userId', verify, pipelinesController.listOwnPipelines)

module.exports = router