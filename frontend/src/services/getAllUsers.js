import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const GET_USERS_URL = `${BASE_URL}/api/v1/users`
export async function getAllUsers(){
    try{
        const response = await axios.get(GET_USERS_URL,{
            headers :{
                'Content-Type' : 'application/json'
            },
            withCredentials:true
        })
        console.log(response.data?.data.users)
        return response.data?.data.users

    }catch(err){
        console.log('There was an error fetching users', err.response.data || err.message)
        throw err;
    }
}