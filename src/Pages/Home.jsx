import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import JobOpportunity from '../Components/Home/JobOpportunity'
import LatestPosts from '../Components/Home/LatestPosts'
function Home() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex flex-col'>
            <JobOpportunity/>
            <LatestPosts/>
        </div>
    </div>
  )
}

export default Home