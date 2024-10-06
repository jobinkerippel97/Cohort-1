const express = require('express')

const { userRoutes } = require('./userRoutes')
const { fooditemsRoutes } = require('./fooditemRoutes')
const { orderRoutes } = require('./orderRoutes')
const { cartRoutes } = require('./cartRoutes')
const { sellerRoutes } = require('./sellerRoutes')
const { menuRoutes } = require('./menuRoutes')
const { restuarantRoutes } = require('./restuarantRoutes')
const { categoryRoutes } = require('./categoryRoutes')




const v1Routes = express.Router()

v1Routes.use('/users', userRoutes)
v1Routes.use('/sellers', sellerRoutes)
v1Routes.use('/fooditems',fooditemsRoutes)
v1Routes.use('/orders', orderRoutes)
v1Routes.use('/carts', cartRoutes)
v1Routes.use('/menus', menuRoutes)
v1Routes.use('/restuarants', restuarantRoutes)
v1Routes.use('/categorys', categoryRoutes)



module.exports = { v1Routes }