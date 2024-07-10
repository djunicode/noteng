import React from 'react'
import Sidebar from '../Home/Sidebar'
import UploadNotes from './UploadNotes'
function NewPostPage() {
  return (
   
        <div className='flex flex-col overflow-y-scroll  lg:flex-row h-full scroll-smooth'>
            <Sidebar />
            <div className='flexh-[100vh] mb-20'>
                <UploadNotes  />
            </div>
        </div>
 
  )
}

export default NewPostPage