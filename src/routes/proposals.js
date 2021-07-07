const express = require('express')

const router = express.Router()

const proposalsController = require('../controllers/proposals')
const { verify } = require('../middlewares/verify')

router.get('/prospects', verify, proposalsController.listProposals)
router.get('/prospects/:userId', verify, proposalsController.getProposal)

module.exports = router