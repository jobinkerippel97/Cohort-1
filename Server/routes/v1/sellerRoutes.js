const express = require('express')
const router = express.Router()

router.get('/allSellers', )
router.get('/profile',)

router.post('/signup',)
router.post('/login',)
router.post('logout',)

router.patch('update-Seller',)
router.delete('delete-Seller')

module.exports = { sellerRoutes: router }