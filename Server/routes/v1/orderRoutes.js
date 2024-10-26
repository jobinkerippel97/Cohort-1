const express = require('express')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const { createOrder, getOrder } = require('../../controllers/orderController')
const router = express.Router()

router.get('/order/:orderId',getOrder)

router.post('/add-order',sellerAuth,createOrder)


router.patch('/update-Order',)
router.delete('/delete-Order')

module.exports = { orderRoutes: router }