import axios from 'axios'
const FORGOT_PASSWORD_URL = 'http://127.0.0.1:5000/api/v1/account/forgotPassword'
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