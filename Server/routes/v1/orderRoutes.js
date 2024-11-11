const express = require('express')
const { createOrder, getOrder, getAllOrders, deleteOrder } = require('../../controllers/orderController')
const { userAuth } = require('../../middlewares/userAuth')
const router = express.Router()

router.get('/get-order/:orderId',getOrder)
router.get('/all-orders',getAllOrders)

router.post('/add-order',userAuth, createOrder)

router.delete('/delete-Order/:orderId',userAuth, deleteOrder)

module.exports = { orderRoutes: router }