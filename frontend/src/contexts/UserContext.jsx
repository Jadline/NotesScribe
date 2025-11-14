import { useQuery } from "@tanstack/react-query"
import { createContext, useContext, useState } from "react"
import { getmyNotes } from "../services/getmyNotes"
import { getAllNotes } from "../services/getAllNotes"
import { getAllUsers } from "../services/getAllUsers"



const UserContext = createContext()
function UserProvider({children}){
     const[userInfo,setUserInfo] = useState(null)
    // const [userNotes,setUserNotes] = useState([])
    

    const {data:userNotes,isLoading:isLoadingUserNotes,error:userNotesError} = useQuery({
        queryFn : getmyNotes,
       
        queryKey : ['my-notes'],
        enabled : userInfo?.role === 'user'
        
     }
    )
    const {data:allNotes,isLoading:isLoadingAllNotes,error:allnotesError} = useQuery({
        queryFn : getAllNotes,
        queryKey : ['all-notes'],
        enabled : userInfo?.role === 'admin'
    })
    const {data : users,isLoading:isLoadingUsers,error:usersError} = useQuery({
        queryFn : getAllUsers,
        queryKey : ['all-users'],
        enabled : userInfo?.role === 'admin'
    }) 
    

    return(
        <UserContext.Provider  value={{
            userInfo,
            setUserInfo,
            userNotes,
            isLoadingUserNotes,
            userNotesError,
            allNotes,
            isLoadingAllNotes,
            allnotesError,
            users,
            isLoadingUsers,
            usersError

        }}>
            {children}
        </UserContext.Provider>
        
    )
}

function useUsers(){
    const context = useContext(UserContext)
    if(context===undefined) throw new Error('You cannot use the usersContext outside the usersProvider')
    return context
}
export {UserProvider,useUsers}