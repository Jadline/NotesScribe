

import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { PlusIcon } from '@heroicons/react/20/solid'
import {useForm} from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../services/createNote";
import { useUsers } from "../contexts/UserContext";
import toast from "react-hot-toast";



export default function CreateNoteModal() {
    const queryClient = useQueryClient()
    const {userInfo} = useUsers()

 const {mutate} = useMutation({
    mutationFn : (data) => createNote(data),
    onSuccess : () => {
      toast.success('Created note successfully!')
        // console.log('Created note successfully!')
        setIsOpen(false)
        queryClient.invalidateQueries(['my-notes']);

    },
    onError : (err) => {
      toast.error('There was an error creating the note',err)
    }

 })


  const [isOpen, setIsOpen] = useState(false);
  const {register,formState,handleSubmit,reset} = useForm()
  const {errors} = formState 

  function handleCreateNote(data){
   const {title,content} = data
   const payload = {
    title,
    content,
    userId : userInfo?._id
   }
    mutate (payload)
    reset()
   
  }


  return (
    <>
    
      {/* <Button onClick={() => setIsOpen(true)}>
        <HiOutlinePencilAlt className="text-lg" />
      </Button> */}
       <Button
            onClick={() => setIsOpen(true)}
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PlusIcon
           aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
          New Note
          {/* <CreateNoteModal/> */}
        </Button>

      <Modal 
        show={isOpen} 
        size="md" 
        onClose={() => setIsOpen(false)}
        popup
        className="backdrop-blur-sm"
        theme={{
    content: {
      base: "bg-transparent shadow-none",
      inner: "bg-transparent"
    }
  }}
      >
        {/* Wrap modal content in a styled div */}
        <div className=" dark:bg-blue-600 rounded-xl p-6 shadow-lg w-[50%] mx-auto">
          <ModalHeader>Create a Note</ModalHeader>

          <ModalBody>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(handleCreateNote)}>
            
             

            
              <div>
                <Label htmlFor="title">Title</Label>
                <TextInput
                  id="title"
                  name="title"
                  className="mt-1"
                  {...register('title',{
                    required : 'This field is required'
                  })}
                />
                {errors.title && <p>{errors?.title.message}</p>}
              </div>
               <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  {...register('content',{
                    required : 'This field is required'
                  })}
               
                  className="mt-1 h-48"
                />
                {errors.content && <p>{errors?.content.message}</p>}
              </div>
              

              {/* <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  name="status"
                //   value={formData.status}
                //   onChange={handleChange}
                  className="mt-1"
                >
                  <option>Attended</option>
                  <option>Non-Attended</option>
                </Select>
              </div> */}
                 <Button className='text-white w-[30%] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'type='submit' >Create Note</Button>
            </form>
          </ModalBody>

          <ModalFooter>
         
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}
