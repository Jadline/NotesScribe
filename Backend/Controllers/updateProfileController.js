const User = require('../models/userModel')

async function updateMe (req,res){
    try{
        const{firstName,secondName,email} = req.body
        const updates = {}

        if(firstName) updates.firstName = firstName
        if(secondName) updates.secondName = secondName
        if(email) updates.email = email

        const updatedUser = await User.findByIdAndUpdate(req.user.id,updates,{
            new : true,
            runValidators : true
        })
        res.status(200).json({
            status : 'success',
            updatedUser
          
        })

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })

    }

}
module.exports = updateMe