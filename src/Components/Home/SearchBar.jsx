import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';

const SearchBar = forwardRef((props, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: 'ALL',
    semester: '',
    jobType: 'all',
    eventType: 'all',
  });
  
  const navigate = useNavigate();

  const categories = [
    'All', 'Jobs', 'Notes', 'Videos', 'Posts'
  ];
  
  const subjects = [
    'ALL', 'CS', 'IT', 'AIML', 'AIDS', 'DS', 'IOT', 'EXTC', 'ME'
  ];

  const jobTypes = [
    'all', 'internship', 'job'
  ];
  
  const eventTypes = [
    'all', 'hackathon', 'cultural', 'datathon', 'startup'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Build the query with filters
      const queryParams = new URLSearchParams();
      queryParams.append('category', selectedCategory);
      queryParams.append('query', searchQuery.trim());
      
      // Add filters based on the selected category
      if (selectedCategory === 'Notes' || selectedCategory === 'Videos') {
        queryParams.append('subject', filters.subject);
        if (filters.semester) {
          queryParams.append('semester', filters.semester);
        }
      } else if (selectedCategory === 'Jobs') {
        queryParams.append('jobType', filters.jobType);
      } else if (selectedCategory === 'Posts') {
        queryParams.append('eventType', filters.eventType);
      }
      
      navigate(`/DiscoverPage?${queryParams.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                ref={ref}
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
              type="button"
              className="flex items-center justify-center px-4 border-l border-t md:border-t-0 border-gray-200 text-gray-500 hover:text-custom-blue transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-1" />
              Filters
              <ChevronDown size={16} className={`ml-1 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
            
            <button
              type="submit"
              className="bg-custom-blue hover:bg-blue-700 text-white font-medium py-4 px-6 transition-colors"
            >
              Search
            </button>
          </div>
          
          {/* Expandable filters based on selected category */}
          {showFilters && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-wrap gap-4">
              {/* Subject and semester filters for Notes and Videos */}
              {(selectedCategory === 'Notes' || selectedCategory === 'Videos') && (
                <>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Subject</label>
                    <select 
                      className="py-1 px-2 border border-gray-300 rounded-md text-sm"
                      value={filters.subject}
                      onChange={(e) => setFilters({...filters, subject: e.target.value})}
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Semester</label>
                    <select 
                      className="py-1 px-2 border border-gray-300 rounded-md text-sm"
                      value={filters.semester}
                      onChange={(e) => setFilters({...filters, semester: e.target.value})}
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              {/* Job type filter for Jobs */}
              {selectedCategory === 'Jobs' && (
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Job Type</label>
                  <select 
                    className="py-1 px-2 border border-gray-300 rounded-md text-sm"
                    value={filters.jobType}
                    onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Event type filter for Posts */}
              {selectedCategory === 'Posts' && (
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Event Type</label>
                  <select 
                    className="py-1 px-2 border border-gray-300 rounded-md text-sm"
                    value={filters.eventType}
                    onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
});

export default SearchBar;
