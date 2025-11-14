import axios from 'axios'

const UPDATE_PROFILE_URL ='http://127.0.0.1:5000/api/v1/users/updateMe'

export async function patchProfile(profiledata){

    try{
        const response = await  axios.patch(UPDATE_PROFILE_URL,profiledata,{
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials:true
        })
        console.log('PATCH response:', response.data.updatedUser);
        return response?.data?.updatedUser

    }catch(err){
        console.log('There was an error updating profile details',err.response.data || err.message)
        throw err

    }

}