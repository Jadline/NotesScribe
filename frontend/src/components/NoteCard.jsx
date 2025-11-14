import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { dateFormatter } from "../helpers/dateFormatter";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../services/updateNote";
import { deleteNote } from "../services/deleteNote";
import { useUsers } from "../contexts/UserContext";
import toast from "react-hot-toast";

function NoteCard({userNote,rowSpan,colSpan,color}){
  const queryClient = useQueryClient()
  const[notesdata,setNotesdata] = useState(userNote)
  const[isEditingtext,setIsEditingtext] = useState(false)
  const[title,setTitle] = useState(userNote.title)
  const[isEditingtitle,setIsEditingTitle] = useState(false)
  const[text,setText] = useState(userNote.content)
  const {userInfo} = useUsers()

  const {mutate:mutateUpdate} = useMutation({
    mutationFn : (data) => updateNote(userNote._id,data),
    onSuccess : (data) => {
      console.log('data was successfully updated')
      setNotesdata(data)
      setIsEditingtext(false)
      setIsEditingTitle(false)
    }
  })

  const {mutate:mutateDelete} = useMutation({
    mutationFn : (id) => deleteNote(id),
    onSuccess : () => {
      queryClient.invalidateQueries(["my-notes"])
      toast.success('note was deleted successfully')

      // console.log('note was deleted successfully')
    }
  })
  
  


    return(
       <div 
       className={`relative lg:col-span-${colSpan} lg:row-span-${rowSpan} rounded-lg `}
       style={{
        backgroundColor : color
       }}
      
       >
            <div className="absolute inset-0 rounded-xl max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              {/* <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-performance.png"
                className="h-80 object-cover object-left"
              /> */}
              <div className="p-10 pt-4">
                <div className='flex justify-between'>
                  <h2 className="text-sm/4 font-semibold text-indigo-400">{dateFormatter(notesdata.createdAt)}</h2>
                 {userInfo?.role === 'admin' &&  <h3 className="text-sm/4 font-semibold text-orange-400 italic">{`${userNote.user.firstName} ${userNote.user.secondName}`} </h3>}
                </div>
                <div className='flex justify-between items-center'>
                 {!isEditingtitle ?<p className="mt-2 text-lg font-medium tracking-tight text-white">{notesdata.title}</p> :
                 <textarea
               className="w-full h-12 p-3  text-white rounded-lg outline-none"
               style={{backgroundColor : color}}
               value={title}
               onChange={(e) => setTitle(e.target.value)}

                >

                </textarea> 
                 }
                  <PencilSquareIcon 
                  className="h-6 w-6 text-white cursor-pointer "
                  onClick={() => setIsEditingTitle(!isEditingtitle)}
                  />
                </div>
                
                  
                {!isEditingtext ? 
                <p className="mt-2 max-w-lg text-sm/6 text-[#ffff3f]">
                  {notesdata.content}
                </p>:
                <>
                <textarea
               className="w-full h-32 p-3  text-white rounded-lg outline-none"
                   style={{backgroundColor : color}}
               value={text}
               onChange={(e) => setText(e.target.value)}

                >

                </textarea>
                
                </>
                }
              </div>
            
            
              <div className=' flex space-between justify-between items-center px-4 py-3'>
                 {(isEditingtext || isEditingtitle) &&  <button 
                type="button"
                 className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5"
                 onClick={() =>{
                  const payload = {}
                  if(title !== notesdata.title) payload.title = title
                  if(text !== notesdata.content) payload.content = text
                  console.log(payload)

                  mutateUpdate(payload)
                 } }
                 >Save Note</button>}
                 <div className=" flex gap-4" >
                  <PencilSquareIcon
                 className="h-6 w-6 text-white cursor-pointer"
                 onClick={() => setIsEditingtext(!isEditingtext)}
                 
                 />
                <TrashIcon 
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => mutateDelete(userNote._id)}
                />

                 </div>
                
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>
    )
}
export default NoteCard