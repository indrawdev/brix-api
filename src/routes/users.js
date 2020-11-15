const express = require("express");

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/users', usersController.listUsers);
router.get('/user/:id', usersController.getUser);

module.exports = router;