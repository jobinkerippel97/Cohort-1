const express = require('express')
const { sellerSignup, sellerLogin, sellerLogout, sellerProfile, checkSeller, getAllSellers, sellerUpdate, deleteSeller } = require('../../controllers/sellerController')
const { sellerAuth } = require('../../middlewares/sellerAuth')

const router = express.Router()

router.get('/all-sellers',sellerAuth, getAllSellers )
router.get('/profile',sellerAuth,sellerProfile)

router.post('/signup', sellerSignup)
router.post('/login', sellerLogin)
router.post('/logout', sellerLogout)

router.patch('/update-seller',sellerAuth, sellerUpdate)
router.delete('/delete-Seller',sellerAuth, deleteSeller )

router.get('/check-seller', sellerAuth, checkSeller)

// router.get('/some-end-point', adminAuth, handleSomthing)
module.exports = { sellerRoutes: router }