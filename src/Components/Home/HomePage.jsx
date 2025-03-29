import React from 'react';
import SearchBar from './SearchBar'
import ShareNotes from './ShareNotes';
import SharedResources from './SharedResources';
import JobOpportunity from './JobOpportunity';
import LatestPosts from './LatestPosts';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Common search bar for all sections */}
      <SearchBar />
      
      {/* Content sections */}
      <ShareNotes />
      <SharedResources />
      <JobOpportunity />
      <LatestPosts />
    </div>
  );
}

export default HomePage;
