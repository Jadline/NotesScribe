import axios from 'axios'
const DELETE_NOTE_URL = 'http://127.0.0.1:5000/api/v1/notes'
export async function deleteNote(id){
    try{
        const response = await axios.delete(`${DELETE_NOTE_URL}/${id}`,{
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true
        })
        return response.data

    }catch(err){
        console.log("There was an error deleting a note",err.response.data || err.message)

    }
}