import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/DiscoverPage?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for notes, resources, jobs, and posts..."
          className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 p-1.5 bg-custom-blue text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
