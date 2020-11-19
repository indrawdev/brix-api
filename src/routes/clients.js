const express = require("express");

const router = express.Router();

const clientsController = require('../controllers/clients');

router.get('/clients', clientsController.listClient);
router.get('/client/:id', clientsController.getClient);

module.exports = router;