const express = require('express')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const { createMenu, updatedMenu, deletedMenu, getAllMenus, getMenu } = require('../../controllers/menuController')
const router = express.Router()

router.get('/all-menu',getAllMenus )
router.get('/get-menu/:menuId',getMenu)

router.post('/add-menu',sellerAuth, createMenu)


router.patch('/update-menu/:menuId',sellerAuth,updatedMenu)
router.delete('/delete-menu/:menuId',sellerAuth,deletedMenu)

module.exports = { menuRoutes: router }