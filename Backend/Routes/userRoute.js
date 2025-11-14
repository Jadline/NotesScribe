const express = require('express')
const updateMe = require('../Controllers/updateProfileController')
const protect = require('../middlewares/protect')
const { getAllUsers } = require('../Controllers/authController')
const restrictTo = require('../middlewares/roleMiddleware')

const router = express.Router()

router.route('/').get(protect,restrictTo('admin'),getAllUsers)

router.route('/updateMe').patch(protect,updateMe)

module.exports = router