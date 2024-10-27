const express = require('express')
const { userSignup, userLogin, userLogout, userProfile, checkUser, getAllUsers, userUpdate, deleteUser,} = require('../../controllers/userController')
const { userAuth } = require('../../middlewares/userAuth')

const router = express.Router()

router.get('/all-users',userAuth, getAllUsers )
router.get('/profile',userAuth, userProfile)

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)

router.patch('/update-user/:userId', userAuth, userUpdate)
router.delete('/delete-user/:userId', userAuth, deleteUser)

router.get('/check-user',userAuth, checkUser)

module.exports = { userRoutes: router }