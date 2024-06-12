import React from 'react';
import Sidebar from '../Components/Home/Sidebar';
import CardsCoulmn from '../Components/Discover/CardsCoulmn';
import Discover from '../Components/Discover/Discover';

function DiscoverPage() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        <Discover />
      </div>
    </div>
  );
}

export default DiscoverPage;
