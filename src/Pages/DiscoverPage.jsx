import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import Discover from '../Components/Discover/Discover'
import Cards from '../Components/Discover/Cards'
import CardsCoulmn from '../Components/Discover/CardsCoulmn'
function DiscoverPage() {
  return (
    <div className='flex flex-col lg:flex-row'>
        <Sidebar/>
        <div className='flex flex-col '>
            <Discover/>
            <Cards/>
            <CardsCoulmn/>
        </div>

    </div>
  )
}

export default DiscoverPage