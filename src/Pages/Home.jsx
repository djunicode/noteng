import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import JobOpportunity from '../Components/Home/JobOpportunity'
import LatestPosts from '../Components/Home/LatestPosts'
import ShareNotes from '../Components/Home/ShareNotes'
import SharedResources from '../Components/Home/SharedResources'
function Home() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex flex-col'>
            <JobOpportunity/>
            <LatestPosts/>
            <ShareNotes/>
            <SharedResources/>
        </div>
    </div>
  )
}

export default Home