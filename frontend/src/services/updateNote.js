import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const UPDATE_NOTE_URL =`${BASE_URL}/api/v1/notes`
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