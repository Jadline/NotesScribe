import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const GET_MY_NOTES_URL = `${BASE_URL}/api/v1/notes`
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