const express = require('express')
const { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem } = require('../../controllers/foodItemController')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const { upload } = require('../../middlewares/multer')
const router = express.Router()

router.get('/allFooditems', getAllFooditems)
router.get('/fooditem/fooditem:Id', getFooditem)

router.post('/add-fooditem',upload.single('thumbnail') ,createFooditem)

router.patch('/update-Fooditem/:fooditemId',sellerAuth, updateFooditem)
router.delete('/delete-Fooditem/fooditem:Id',sellerAuth, deleteFooditem)

module.exports = { fooditemsRoutes: router }