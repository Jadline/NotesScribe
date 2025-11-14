import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const CREATE_NOTE_URL = `${BASE_URL}/api/v1/notes`
export async function createNote(data){
    try{
        const response = await axios.post(CREATE_NOTE_URL,data,{
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true
        })
        return response.data

    }catch(err){
        console.log('There was an error creating a note',err.response.data || err.message)
        throw err

    }
}