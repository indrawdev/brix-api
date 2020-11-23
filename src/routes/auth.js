const express = require("express")

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/signin', authController.signIn)
router.post('/refresh', authController.refreshToken)
router.post('/verify', authController.verifyToken)
router.get('/signout', authController.signOut)

module.exports = router