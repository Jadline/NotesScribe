const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Please provide the title']
    },
    content : {
        type : String,
        required : [true,'Please add some notes']

    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Note = mongoose.model('Note',notesSchema)

module.exports = Note;