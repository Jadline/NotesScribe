import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, TextInput } from "flowbite-react";
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useMutation } from "@tanstack/react-query";
import { useUsers } from '../contexts/UserContext'
import {patchProfile} from '../services/patchProfile'
import toast from "react-hot-toast";
// import { patchProfile } from "../services/patchProfile";


export default function EditFieldModal({ fieldName, value, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
 const {setUserInfo} = useUsers()

  const {mutate} = useMutation({
    mutationFn : (data) => patchProfile(data),
    onSuccess : (res) => {
      toast.success('successfully updated field')
        // console.log('successfully updated field')
       setUserInfo(prev => {
          const updated = { ...prev, ...res };
          // console.log('updated context', updated);
          return updated;
});
        setIsOpen(false);
    }
  })

  useEffect(() => {
  if (isOpen) {
    setFieldValue(value);
  }
}, [isOpen, value]);

   

  const handleChange = (e) => setFieldValue(e.target.value);

  const handleSave = () => {
    // Call the parent or API
     const payload = {[fieldName] : fieldValue}
     mutate(payload)
   
  };

  return (
    <>
       <Button onClick={() => setIsOpen(true)}>
        <HiOutlinePencilAlt className="text-lg" />
      </Button>

     <Modal
  show={isOpen}
  onClose={() => setIsOpen(false)}
  size="md"
  popup
  className="backdrop-blur-sm"
  theme={{
    content: {
      base: "bg-transparent shadow-none",
      inner: "bg-transparent"
    }
  }}
>
  <div className="bg-indigo-500 rounded-xl p-6 max-w-lg mx-auto shadow-lg">
    <ModalHeader className="text-white text-lg">Edit {fieldName}</ModalHeader>
    <ModalBody className="space-y-4">
      <div>
        <Label htmlFor={fieldName} className='text-white text-sm'>{fieldName.toUpperCase()}</Label>
        <TextInput
          id={fieldName}
          value={fieldValue}
          onChange={handleChange}
          className="mt-1 w-full"
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <Button onClick={handleSave} className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Update</Button>
    </ModalFooter>
  </div>
</Modal>
    </>
  );
}
