import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const RESET_PASSWORD_URL =  `${BASE_URL}/api/v1/account/resetPassword`
export async function patchResetPassword(token,data){
    try{
        const response = await axios.patch(`${RESET_PASSWORD_URL}/${token}`,data,{
            headers :{
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
        return response.data

    }catch(err){
        console.log('There was an error changing data',err.response?.data || err.message)
        throw err;

    }
}