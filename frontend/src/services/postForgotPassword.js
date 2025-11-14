import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const FORGOT_PASSWORD_URL = `${BASE_URL}/api/v1/account/forgotPassword`
export async function postForgotPassword(data){

    try{
        const response = await axios.post(FORGOT_PASSWORD_URL,data,{
            headers : {
                "Content-Type" :"application/json"
            },
            withCredentials : true
        })
        return response.data

    }catch(err){
        console.log('There was an error trying to reset the password',err.response?.data || err.message )

    }
}