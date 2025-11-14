import axios from 'axios'
const LOGOUT_URL = 'http://127.0.0.1:5000/api/v1/account/logout'
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