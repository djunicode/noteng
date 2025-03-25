import React, { useState } from 'react';
import Jobs from './Jobs';
import Notes from './Notes';
import Videos from './Videos';
import Posts from './Posts';
import { ReactComponent as BriefcaseIcon } from '../../assets/briefcase-alt_svgrepo.com.svg';
import { ReactComponent as NotesIcon } from '../../assets/doc_svgrepo.com.svg';
import { ReactComponent as VideosIcon } from '../../assets/video_svgrepo.com.svg';
import { ReactComponent as PostsIcon } from '../../assets/post_svgrepo.com.svg';
import { useSearchParams } from 'react-router-dom';

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Jobs';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category, query: searchQuery });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ category: selectedCategory, query: searchQuery });
    // Here you would implement the actual search functionality
  };

  return (
    <div className='w-full bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8 border-b-2 w-full pb-4'>
            Discover <span className='text-custom-blue'>{selectedCategory}</span>
          </h1>
          
          {/* Search bar */}
          <div className='w-full max-w-xl mb-8'>
            <form onSubmit={handleSearch} className='flex shadow-md rounded-lg overflow-hidden'>
              <input
                type='text'
                placeholder={`Search ${selectedCategory}...`}
                className='w-full p-3 border-none focus:outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type='submit'
                className='bg-custom-blue text-white px-6 py-3 hover:bg-blue-700 transition-colors'
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Category tabs */}
          <div className='flex flex-wrap justify-center gap-3 mb-8 w-full'>
            {[
              { name: 'Jobs', icon: <BriefcaseIcon className="w-5 h-5" /> },
              { name: 'Notes', icon: <NotesIcon className="w-5 h-5" /> },
              { name: 'Videos', icon: <VideosIcon className="w-5 h-5" /> },
              { name: 'Posts', icon: <PostsIcon className="w-5 h-5" /> }
            ].map((category) => (
              <button
                key={category.name}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category.name 
                  ? 'bg-custom-blue text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className='w-full'>
          {selectedCategory === 'Jobs' && <Jobs searchQuery={searchQuery} />}
          {selectedCategory === 'Notes' && <Notes searchQuery={searchQuery} />}
          {selectedCategory === 'Videos' && <Videos searchQuery={searchQuery} />}
          {selectedCategory === 'Posts' && <Posts searchQuery={searchQuery} />}
        </div>
      </div>
    </div>
  );
}

export default Discover;
