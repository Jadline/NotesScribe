import axios from 'axios'
const UPDATE_NOTE_URL ='http://127.0.0.1:5000/api/v1/notes'
export async function updateNote(id,note){

    try{
        const response = await axios.patch(`${UPDATE_NOTE_URL}/${id}`,note,{
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials:true
        })
        console.log('updated note',response.data?.note.updatedNote)
        return response.data?.note?.updatedNote

    }catch(err){
        console.log('There was an error trying to edit the note',err.response?.data || err.message)
        throw err
    }
}