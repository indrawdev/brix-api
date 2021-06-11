const express = require('express')

const router = express.Router()

const releasesController = require('../controllers/releases')
const { verify } = require('../middlewares/verify')

router.get('/releases', verify, releasesController.listHeadReleases)
router.get('/releases/:userId', verify, releasesController.listOwnReleases)

module.exports = router