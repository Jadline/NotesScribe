import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const GET_ALL_NOTES_URL = `${BASE_URL}/api/v1/notes/adminNotes`
export async function getAllNotes(){
    try{
        const response =await axios.get(GET_ALL_NOTES_URL,{
            withCredentials:true
        })
        console.log('response.data',response.data)
        console.log(response.data?.data?.notes)
        return response.data?.data?.notes
        

    }catch(err){
        console.log('There was an error fetching your notes',err?.response.data || err.message)

    }
}