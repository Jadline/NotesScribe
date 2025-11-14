const express = require('express')
const {SignUp,Login,resetPassword,forgotPassword,logout} = require('../Controllers/authController')


const router = express.Router()

router.route('/signup').post(SignUp)
router.route('/login').post(Login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/logout').get(logout)


module.exports = router;