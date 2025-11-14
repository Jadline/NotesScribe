import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL
const UPDATE_PROFILE_URL =`${BASE_URL}/api/v1/users/updateMe`

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