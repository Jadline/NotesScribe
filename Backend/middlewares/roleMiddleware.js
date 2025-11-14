function restrictTo(){
    const roles = Array.from(arguments);

    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                status : 'fail',
                message : 'You do not have permission to perform this action'
            })
        }
        next()
    }
}

module.exports = restrictTo;