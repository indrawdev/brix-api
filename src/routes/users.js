const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')
const { verify } = require('../middlewares/verify')

router.get('/users', verify, usersController.listUsers)
router.get('/user/:id', verify, usersController.getUser)
router.put('/changepass/user/:id', verify, usersController.updatePassword)

module.exports = router