import axios from 'axios'
const LOGIN_URL = 'http://127.0.0.1:5000/api/v1/account/login'
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