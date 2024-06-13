import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import Discover from '../Components/Discover/Discover'


function DiscoverPage() {
  return (
    <div className='flex flex-col lg:flex-row'>
        <Sidebar/>
        <div className='flex flex-col w-full overflow-y-scroll h-[100vh] '>
            <Discover/>
        </div>

    </div>
  )
}

export default DiscoverPage