import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const SIGN_UP_URL = `${BASE_URL}/api/v1/account/signup`

export async function postSignup(signupdata){
    try{
        const response = await axios.post(SIGN_UP_URL,signupdata,{
            headers : {
                "Content-Type" : 'application/json'
            },
            withCredentials : true
        })
        return response.data?.data?.user

    }catch(error){
        console.log('There was an error creating an account',error.response.data || error.message)
        throw error;

    }
}
