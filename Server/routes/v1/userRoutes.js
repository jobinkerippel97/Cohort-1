const express = require('express')
const { userSignup } = require('../../controllers/userController')
const router = express.Router()

router.get('/allUsers', )
router.get('/profile',)

router.post('/signup', userSignup)
router.post('/login',)
router.post('logout',)

router.patch('/update-User',)
router.delete('/delete-User')

router.get('/ckeck-user')

module.exports = { userRoutes: router }