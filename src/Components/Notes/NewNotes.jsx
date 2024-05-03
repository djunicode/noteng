import React from 'react'
import Sidebar from '../Home/Sidebar'
import UploadNotes from './UploadNotes'
function NewPostPage() {
  return (
   
        <div className='flex flex-col lg:flex-row  h-full'>
            <Sidebar />
            <div className='flex overflow-y-scroll h-[100vh]'>
                <UploadNotes  />
            </div>
        </div>
 
  )
}

export default NewPostPage