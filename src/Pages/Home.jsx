import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import JobOpportunity from '../Components/Home/JobOpportunity'
import LatestPosts from '../Components/Home/LatestPosts'
import ShareNotes from '../Components/Home/ShareNotes'
function Home() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex flex-col'>
            <JobOpportunity/>
            <LatestPosts/>
            <ShareNotes/>
        </div>
    </div>
  )
}

export default Home