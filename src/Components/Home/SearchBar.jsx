import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = [
    'All', 'Jobs', 'Notes', 'Videos', 'Posts'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/DiscoverPage?category=${selectedCategory}&query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border-0 text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none"
              placeholder="Search for notes, jobs, videos, or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:border-l border-t md:border-t-0 border-gray-200">
            <select
              className="h-full w-full px-4 py-4 text-gray-700 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-custom-blue hover:bg-blue-700 text-white font-medium py-4 px-6 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
