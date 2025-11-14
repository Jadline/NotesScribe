const express = require('express')
const{getMyNotes,createNotes,deleteNotes, updateNotes,getAllNotes} = require('../Controllers/NoteController')
const protect = require('../middlewares/protect')
const restrictTo = require('../middlewares/roleMiddleware')

const router = express.Router()

// router.use(protect)

router.route('/')
    .post(protect,createNotes)
    .get(protect,getMyNotes)

router.route('/:id')
    .delete(protect,deleteNotes)
    .patch(protect,updateNotes)


//admins

router.route('/adminNotes').get(protect,restrictTo('admin'),getAllNotes)


module.exports = router;