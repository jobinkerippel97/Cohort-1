const express = require('express')
const { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem } = require('../../controllers/foodItemController')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const { upload } = require('../../middlewares/multer')
const router = express.Router()

router.get('/all-fooditems', getAllFooditems)
router.get('/get-fooditem/:fooditemId', getFooditem)

router.post('/add-fooditem',upload.single('thumbnail') ,createFooditem)

router.patch('/update-fooditem/:fooditemId',sellerAuth, updateFooditem)
router.delete('/delete-fooditem/:fooditemId',sellerAuth, deleteFooditem)

module.exports = { fooditemsRoutes: router }