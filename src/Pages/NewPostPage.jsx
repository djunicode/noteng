import React from 'react'
import NewPost from '../Components/NewPost/NewPost'
import Sidebar from '../Components/Home/Sidebar'
function NewPostPage() {
  return (
   
        <div className='flex flex-col lg:flex-row scroll-smooth h-full'>
            <Sidebar />
            <div className='flexh-[100vh] mb-10'>
                <NewPost  />
            </div>
        </div>
 
  )
}

export default NewPostPage