const express = require('express')

const router = express.Router()

const prospectsController = require('../controllers/prospects')
const { verify } = require('../middlewares/verify')

router.get('/prospects', verify, prospectsController.listHeadProspects)
router.get('/prospects/:userId', verify, prospectsController.listOwnProspects)

module.exports = router