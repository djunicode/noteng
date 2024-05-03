import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import UploadNotes from '../Components/Notes/UploadNotes'

function UploadNewPosts() {
  return (
    <div className='flex flex-col lg:flex-row'>
        <Sidebar/>
        <div className='flex overflow-y-scroll h-[100vh]'>
            <UploadNotes/>
        </div>
    </div>
  )
}

export default UploadNewPosts