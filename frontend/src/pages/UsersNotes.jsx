import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import { useUsers } from "../contexts/UserContext";

const spans = [
  { col: 3, row: 1 },
  { col: 3, row: 1},
  { col: 2, row: 2},
  { col: 3, row: 2 },
];
const colors = [
  '	#3d5731',
  '#406c2e',
  '#8c5abc',
 
  '#f44336',
  '#b52e75',
  '#cd4948',
  '#5a423f',
  '#7f6000',
  '#2b9348',
  '#741b47',
 
]

export default function UsersNotes() {
  const {userInfo} = useUsers()
    const { userNotes,isLoadingUserNotes,userNotesError,allNotes,isLoadingAllNotes,
            allnotesError} = useUsers()

    if(isLoadingUserNotes || isLoadingAllNotes) return <p>is Loading notes ...</p>
    if(userNotesError || allnotesError) return <p>There was an error loading notes</p>

    const notes = userInfo?.role === 'user' ? userNotes : userInfo?.role === 'admin' ? allNotes : []
  

  return (
    <>
    <div className="bg-gray-800 py-24 sm:py-32 grid place-content-center ">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-400">Hi,  {userInfo?.firstName||'user' }</h2>
        {userInfo ? <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:break-word"> 
         Your personal space for notes, reminders, and inspiration — all in one place.

        </p> : <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:break-word">
Create a user or admin account to start your personalized note-taking journey. 

        </p> }
      <div className="mt-10 grid grid-cols-1 p-4  gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      
            {notes?.map((userNote,index) => {
                const span = spans[index % spans.length]
                const color = colors[index % colors.length]
                return (
                <NoteCard 
                key={userNote._id}
                userNote = {userNote}
                colSpan = {span.col}
                rowSpan ={span.row}
                color ={color}
                />
                
            )
            })}
      
         {userInfo && <div className="relative lg:col-span-2 rounded-lg bg-gray-700 overflow-hidden p-4">
    <AddNote  />
  </div> }
        </div>
      </div>
    </div>
    {/* <AddNote/> */}
    </>
  )
}
