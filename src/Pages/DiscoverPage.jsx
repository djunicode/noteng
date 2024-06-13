
import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import Discover from '../Components/Discover/Discover'
import Cards from '../Components/Discover/Cards'


function DiscoverPage() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        <Discover />
        <Cards/>
      </div>
    </div>
  );
}

export default DiscoverPage;
