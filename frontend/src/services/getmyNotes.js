import axios from 'axios'
const GET_MY_NOTES_URL = 'http://127.0.0.1:5000/api/v1/notes'
export async function getmyNotes(){
    try{
        const response =await axios.get(GET_MY_NOTES_URL,{
            withCredentials:true
        })
        return response.data?.notes
        

    }catch(err){
        console.log('There was an error fetching your notes',err?.response.data || err.message)

    }
}