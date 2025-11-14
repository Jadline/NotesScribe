import { Outlet } from "react-router-dom"
import PageNav from "../components/PageNav"

function Dashboard(){
    return(
        <div className='min-h-screen'>

            <PageNav/>
            <main className=' min-h-screen text-blue lg:pl-72'>
                <Outlet/>

            </main>
        </div>
    )
}
export default Dashboard