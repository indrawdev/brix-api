const express = require("express")

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/', authController.front)
router.post('/signin', authController.signIn)
router.post('/refresh', authController.refreshToken)
router.get('/me', authController.me)
router.get('/signout', authController.signOut)

module.exports = router