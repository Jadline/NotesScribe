import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const DELETE_NOTE_URL = `${BASE_URL}/api/v1/notes`
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