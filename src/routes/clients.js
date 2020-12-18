const express = require('express')

const router = express.Router()

const clientsController = require('../controllers/clients')
const { verify } = require('../middlewares/verify')

router.get('/clients', verify, clientsController.listClients)
router.get('/client/:id', verify, clientsController.getClient)

module.exports = router