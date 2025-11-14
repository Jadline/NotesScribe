const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
async function Protect (req,res,next){
    try{
        const token = req.cookies.jwt
        console.log(token)
        if(!token){
            return res.status(401).json({
                status : 'fail',
                message : 'You are not logged in'
            })
        }

       const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const currentUser = await User.findById(decoded.id)
        if(!currentUser){
            return res.status(401).json({
                status : 'fail',
                message : 'The user belonging to this token no longer exists'
            })
        }

        req.user = currentUser;
        next()

    }catch(err){
        return res.status(401).json({
            status : 'fail',
            message : 'invalid token ,please login again'
        })
    }

}


module.exports = Protect