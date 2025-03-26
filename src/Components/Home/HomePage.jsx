import React, { useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import JobOpportunity from './JobOpportunity';
import ShareNotes from './ShareNotes';
import LatestPosts from './LatestPosts';
import SharedResources from './SharedResources';

function HomePage() {
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-custom-blue">NoteEng</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover educational resources, job opportunities, and connect with other engineering students.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar ref={searchRef} />
        
        {/* Keyboard shortcut hint */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 text-custom-blue px-4 py-2 rounded-lg inline-flex items-center text-sm">
            <span className="mr-2">Pro tip: Press</span>
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
              Ctrl + F
            </kbd>
            <span className="ml-2">to quickly search</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-4">
          <JobOpportunity />
          <ShareNotes />
          <LatestPosts />
          <SharedResources />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
