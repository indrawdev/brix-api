const express = require('express')

const router = express.Router()

const userclientsController = require('../controllers/userclients')
const { verify } = require('../middlewares/verify')

router.get('/users', verify, userclientsController.listUsers)
router.get('/user/:id', verify, userclientsController.getUser)
router.put('/changepass/user/:id', verify, userclientsController.updatePassword)

module.exports = router