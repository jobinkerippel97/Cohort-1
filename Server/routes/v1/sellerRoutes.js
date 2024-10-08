const express = require('express')
const { sellerSignup, sellerLogin, sellerLogout, sellerProfile, checkSeller, getAllSellers, sellerUpdate, deleteSeller } = require('../../controllers/sellerController')
const { sellerAuth } = require('../../middlewares/sellerAuth')

const router = express.Router()

router.get('/all-Sellers',sellerAuth, getAllSellers )
router.get('/profile',sellerAuth,sellerProfile)

router.post('/signup', sellerSignup)
router.post('/login', sellerLogin)
router.post('/logout', sellerLogout)

router.patch('/update-Seller',sellerAuth, sellerUpdate)
router.delete('/delete-Seller', deleteSeller )

router.get('/check-seller', sellerAuth, checkSeller)

module.exports = { sellerRoutes: router }