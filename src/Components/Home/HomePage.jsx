import React from 'react';
import SearchBar from './SearchBar';
import JobOpportunity from './JobOpportunity';
import ShareNotes from './ShareNotes';
import LatestPosts from './LatestPosts';
import SharedResources from './SharedResources';

function HomePage() {
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
        <SearchBar />

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
