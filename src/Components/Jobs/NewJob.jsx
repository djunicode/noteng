import React from 'react'
import Sidebar from '../Home/Sidebar'
import PostJob from './PostJob'
function NewJob() {
  return (
   
        <div className='flex flex-col overflow-y-scroll lg:flex-row h-full scroll-smooth'>
            <Sidebar />
            <div className='flexh-[100vh] mb-20'>
                <PostJob  />
            </div>
        </div>
 
  )
}

export default NewJob