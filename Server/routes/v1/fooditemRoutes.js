const express = require('express')
const { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem } = require('../../controllers/foodItemController')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const router = express.Router()

router.get('/allFooditems', getAllFooditems)
router.get('/fooditem/:Id', getFooditem)

router.post('/addFooditem', createFooditem)

router.patch('/update-Fooditem/:fooditemId',sellerAuth, updateFooditem)
router.delete('/delete-Fooditem',sellerAuth, deleteFooditem)

module.exports = { fooditemsRoutes: router }