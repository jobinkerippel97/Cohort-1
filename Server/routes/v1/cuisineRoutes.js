const express = require('express')
const { createCuisine, getAllCuisines, getCuisine, updatedCuisine, deleteCuisine} = require('../../controllers/cuisineController')
const { sellerAuth } = require('../../middlewares/sellerAuth')
const router = express.Router()

router.get('/all-cuisines', getAllCuisines )
router.get('/get-cuisine/:cuisineId', getCuisine)

router.post('/add-cuisine',sellerAuth,createCuisine)


router.patch('/update-cuisine/:cuisineId',sellerAuth, updatedCuisine)
router.delete('/delete-cuisine/:cuisineId',sellerAuth, deleteCuisine)

module.exports = { cuisineRoutes: router }