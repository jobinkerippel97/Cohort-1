const express = require('express')
const { userAuth } = require('../../middlewares/userAuth')
const { addToCart, removeFromCart, getCart} = require('../../controllers/cartController')
const router = express.Router()

router.get('/',userAuth, getCart)

router.post('/add-to-cart', userAuth, addToCart)

router.delete('/remove-cart', userAuth,removeFromCart)

module.exports = { cartRoutes: router }