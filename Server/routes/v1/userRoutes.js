const express = require('express')
const router = express.Router()

router.get('/allUsers', )
router.get('/profile',)

router.post('/signup',)
router.post('/login',)
router.post('logout',)

router.patch('update-User',)
router.delete('delete-User')

module.exports = { userRoutes: router }