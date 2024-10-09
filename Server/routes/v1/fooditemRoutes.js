const express = require('express')
const { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem } = require('../../controllers/foodItemController')
const router = express.Router()

router.get('/allFooditems', getAllFooditems)
router.get('/fooditem/:Id', getFooditem)

router.post('/addFooditem', createFooditem)

router.patch('/update-Fooditem', updateFooditem)
router.delete('/delete-Fooditem', deleteFooditem)

module.exports = { fooditemsRoutes: router }