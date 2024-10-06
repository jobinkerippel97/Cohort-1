const express = require('express')
const { restuarantRoutes } = require('./restuarantRoutes')
const { userRoutes } = require('./userRoutes')
const { fooditemsRoutes } = require('./fooditemRoutes')
const { orderRoutes } = require('./orderRoutes')
const { cartRoutes } = require('./cartRoutes')




const v1Routes = express.Router()

v1Routes.use('users', userRoutes)
v1Routes.use('restuarants', restuarantRoutes)
v1Routes.use('fooditems',fooditemsRoutes)
v1Routes.use('orders', orderRoutes)
v1Routes.use('carts', cartRoutes)



module.exports = { v1Routes }