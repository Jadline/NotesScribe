import axios from 'axios'
const GET_ALL_NOTES_URL = 'http://127.0.0.1:5000/api/v1/notes/adminNotes'
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