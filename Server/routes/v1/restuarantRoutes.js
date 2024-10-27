const express = require('express')
const { createRestuarant, getAllRestuarants, getRestuarant, updateRestuarant, deleteRestuarant } = require('../../controllers/restuarantController')
const { sellerAuth } = require('../../middlewares/sellerAuth')

const router = express.Router()

router.get('/all-restuarants', getAllRestuarants)
router.get('/get-restuarant/:restuarantId', getRestuarant)

router.post('/add-restuarant', createRestuarant)


router.patch('/update-restuarant/:restuarantId', sellerAuth, updateRestuarant)
router.delete('/delete-restuarant/:restuarantId',sellerAuth, deleteRestuarant)

module.exports = { restuarantRoutes: router }