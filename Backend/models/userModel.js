const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,'Please enter  your first name']
    },
    secondName : {
        type : String,
        required : [true,'Please enter your second name']
    },
    email : {
        type : String,
        required : [true,'Your email is requird'],
        lowercase : true,
        unique : true,
        validate : [validator.isEmail,'Please provide a valid email']
    },
    role : {
        type : String,
        default : 'user',
        enum : ['user','admin']
    },
    password : {
        type : String,
        required : [true,'Please enter a password'],
        minLength : 8,
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true,'Please confirm your password'],
        validate : {
            validator : function(el){
               return el === this.password
            },
            message : 'The passwords do not match'
        }
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date
})


userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)

    this.passwordConfirm = undefined;

    next()


})
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){

    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.createPasswordResetToken = function (){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken
}

const User = mongoose.model('User',userSchema)

module.exports = User;

