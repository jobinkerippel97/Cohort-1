const express = require('express')
const { createRestuarant, getAllRestuarants, getRestuarant, updateRestuarant, deleteRestuarant } = require('../../controllers/restuarantController')
const { sellerAuth } = require('../../middlewares/sellerAuth')

const router = express.Router()

router.get('/allRestuarants', getAllRestuarants)
router.get('/restuarant/:Id', getRestuarant)

router.post('/addRestuarant', createRestuarant)


router.patch('/update-Restuarant/:restuarantId', sellerAuth, updateRestuarant)
router.delete('/delete-Restuarant',sellerAuth, deleteRestuarant)

module.exports = { restuarantRoutes: router }