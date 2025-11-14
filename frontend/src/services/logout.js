import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const LOGOUT_URL = `${BASE_URL}/api/v1/account/logout`
export async function logout(){
    try{
        const response = await axios.get(LOGOUT_URL,{
            headers : {
                "Content-Type" : 'application/json'
            },
            withCredentials : true
        })
        return response.data
    }catch(err){
        console.log('There was an error logging out',err.response.data || err.message)
    }

}