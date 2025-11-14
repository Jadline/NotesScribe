import axios from 'axios'

const CREATE_NOTE_URL = 'http://127.0.0.1:5000/api/v1/notes'
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