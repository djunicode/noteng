import React from 'react'
import NewPost from '../Components/NewPost/NewPost'
import Sidebar from '../Components/Home/Sidebar'
function NewPostPage() {
  return (
   
        <div className='flex flex-col lg:flex-row  h-full'>
            <Sidebar />
            <div className='flex overflow-y-scroll h-[100vh]'>
                <NewPost  />
            </div>
        </div>
 
  )
}

export default NewPostPage