const express = require('express')
const { createRestuarant, getAllRestuarants, getRestuarant, updateRestuarant, deleteRestuarant } = require('../../controllers/restuarantController')

const router = express.Router()

router.get('/allRestuarants', getAllRestuarants)
router.get('/restuarant/:Id', getRestuarant)

router.post('/addRestuarant', createRestuarant)


router.patch('/update-Restuarant', updateRestuarant)
router.delete('/delete-Restuarant', deleteRestuarant)

module.exports = { restuarantRoutes: router }