import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const LOGIN_URL = `${BASE_URL}/api/v1/account/login`
export async function postLogin(logindata){
    try{
        const response = await axios.post(LOGIN_URL,logindata,{
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        })
        return response.data?.user

    }catch(err){
        console.log('There was an error sending login data',err)
        throw err

    }

}