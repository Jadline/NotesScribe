const jwt = require('jsonwebtoken')
function signToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn :'90d'})
}

module.exports = signToken