import axios from 'axios'

const SIGN_UP_URL = 'http://127.0.0.1:5000/api/v1/account/signup'

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
