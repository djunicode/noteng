import React, { useState } from 'react';
import Jobs from './Jobs';
import Notes from './Notes';
import Videos from './Videos';
import Posts from './Posts';
import { ReactComponent as BriefcaseIcon } from '../../assets/briefcase-alt_svgrepo.com.svg';
import { ReactComponent as NotesIcon } from '../../assets/doc_svgrepo.com.svg';
import { ReactComponent as VideosIcon } from '../../assets/video_svgrepo.com.svg';
import { ReactComponent as PostsIcon } from '../../assets/post_svgrepo.com.svg';

function Discover() {
  const [selectedCategory, setSelectedCategory] = useState('Jobs');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <p className='ml-24 font-bold text-[45px] border-b-2 w-full'>Discover {selectedCategory}</p>
        <hr></hr>
        <div className='flex flex-col md:flex-row w-full pb-4 justify-center'> 
          <button
            className={`flex items-center ml-3 mt-4 px-10 py-1 rounded-lg ${selectedCategory === 'Jobs' ? 'bg-custom-blue text-white' : 'bg-custom-gray'}`}
            onClick={() => handleCategoryClick('Jobs')}
          >
            <BriefcaseIcon className="mr-2" />
            Jobs
          </button>
          <button
            className={`flex items-center ml-3 mt-4 px-10 py-1 rounded-lg ${selectedCategory === 'Notes' ? 'bg-custom-blue text-white' : 'bg-custom-gray'}`}
            onClick={() => handleCategoryClick('Notes')}
          >
            <NotesIcon className="mr-2" />
            Notes
          </button>
          <button
            className={`flex items-center ml-3 mt-4 px-10 py-1 rounded-lg ${selectedCategory === 'Videos' ? 'bg-custom-blue text-white' : 'bg-custom-gray'}`}
            onClick={() => handleCategoryClick('Videos')}
          >
            <VideosIcon className="mr-2" />
            Videos
          </button>
          <button
            className={`flex items-center ml-3 mt-4 px-10 py-1 rounded-lg ${selectedCategory === 'Posts' ? 'bg-custom-blue text-white' : 'bg-custom-gray'}`}
            onClick={() => handleCategoryClick('Posts')}
          >
            <PostsIcon className="mr-2" />
            Posts
          </button>
        </div>
      </div>

      <div className='flex-grow w-full'>
        {selectedCategory === 'Jobs' && <Jobs />}
        {selectedCategory === 'Notes' && <Notes />}
        {selectedCategory === 'Videos' && <Videos />}
        {selectedCategory === 'Posts' && <Posts />}
      </div>
    </div>
  );
}

export default Discover;
