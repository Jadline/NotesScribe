const Note = require('../models/notesModel')
const User = require('../models/userModel')

async function createNotes(req,res){
    try{

        const{title,content,userId} = req.body

        let noteUser = req.user._id

        if(req.user.role === 'admin' && userId){
            noteUser = userId
        }

    
        const note = await Note.create({
            title,
            content,
            user : noteUser
        })

        res.status(201).json({
            status : 'success',
            note
        })

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })

    }
}

async function getMyNotes (req,res){
    try{
        const notes = await Note.find({user : req.user._id})

        res.status(200).json({
            status:'success',
            results : notes.length,
            notes
        })

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })

    }
}

async function deleteNotes(req,res){
    try{
        const note = await Note.findById(req.params.id)

        if(!note){
            return res.status(404).json({
                status : 'fail',
                message : 'No note found with that id'
            })
        }
       // 123 != 123 = false & true = false 
        if(note.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({
                status : 'fail',
                message : 'You do not have permission to delete this note'
            })
        }

        await Note.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status : 'success',
            message : 'Deleted note successfully'
        })
        
    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })

    }
}
async function updateNotes(req,res){
    try{
        const note = await Note.findById(req.params.id)

        if(!note){
            return res.status(404).json({
                status : 'fail',
                message : 'Note not found'
            })
        }
     if(note.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return res.status(403).json({
            status : 'fail',
            message : 'You do not have permission to perform this action'
        })
     }

     const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {
        new : true,
        runValidators : true
     })

     res.status(200).json({
        status : 'success',
       note : {
        updatedNote
       }
     })

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })

    }
}
async function getAllNotes(req,res){
    try{
        const notes = await Note.find().populate('user','firstName secondName email')

        res.status(200).json({
            status : 'success',
            notesCount : notes.length,
            data : {
                notes
            }
        })

    }catch(err){
        res.status(404).json({
            status : 'success',
            message : err.message
        })

    }
}

module.exports = {getMyNotes,createNotes,deleteNotes,updateNotes,getAllNotes}