import React, { useState, useEffect } from 'react';
import Jobs from './Jobs';
import Notes from './Notes';
import Videos from './Videos';
import Posts from './Posts';
import { ReactComponent as BriefcaseIcon } from '../../assets/briefcase-alt_svgrepo.com.svg';
import { ReactComponent as NotesIcon } from '../../assets/doc_svgrepo.com.svg';
import { ReactComponent as VideosIcon } from '../../assets/video_svgrepo.com.svg';
import { ReactComponent as PostsIcon } from '../../assets/post_svgrepo.com.svg';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import JobCard from './JobCard';
import VideoCard from './VideoCard';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [jobs, setJobs] = useState([]);
  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  
  // Filter states - updated based on requirements
  const [jobFilters, setJobFilters] = useState({ mode: 'all', type: 'all', duration: 'all' });
  const [noteFilters, setNoteFilters] = useState({ minRating: 0, department: 'all' });
  const [postFilters, setPostFilters] = useState({ dateRange: 'all', eventType: 'all' });
  const [videoFilters, setVideoFilters] = useState({ subject: 'all', semester: 'all' });
  
  // Show filters toggle
  const [showFilters, setShowFilters] = useState(false);
  
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  // Function to fetch all data
  useEffect(() => {
    setIsLoading(true);
    
    const fetchAllData = async () => {
      try {
        // Fetch jobs
        const jobsResponse = await fetch('https://monilmeh.pythonanywhere.com/api/jobboard/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);
        
        // Fetch notes
        const notesResponse = await axios.get('https://monilmeh.pythonanywhere.com/api/notes/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setNotes(notesResponse.data);
        
        // Fetch videos
        const videosResponse = await fetch('https://monilmeh.pythonanywhere.com/api/videolinks/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const videosData = await videosResponse.json();
        setVideos(videosData);
        
        // Fetch posts
        const postsResponse = await axios.get('https://monilmeh.pythonanywhere.com/api/posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [token]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // We'll handle the search through filtering the data directly
  };
  
  // Handle delete functions for each type
  const handleDeleteJob = async (jobId) => {
    try {
      await fetch(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setJobs(jobs.filter(job => job.job_id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note.note_id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  const handleDeleteVideo = async (videoId) => {
    try {
      await fetch(`https://monilmeh.pythonanywhere.com/api/videos/${videoId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setVideos(videos.filter(video => video.video_id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };
  
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/posts/${postId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post.post_id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  // Filter data based on search query and filters - updated filter matching logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery ? 
      (job.company?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       job.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       job.description?.toLowerCase().includes(searchQuery.toLowerCase())) : true;
       
    // Fix mode filter - convert to lowercase for case-insensitive comparison
    const matchesMode = jobFilters.mode === 'all' ? true : 
      job.mode?.toLowerCase() === jobFilters.mode.toLowerCase();
    
    // Fix type filter - simplified to just internship or job
    const matchesType = jobFilters.type === 'all' ? true : 
      job.subtype?.toLowerCase() === jobFilters.type.toLowerCase();
    
    // New duration filter instead of region
    const matchesDuration = jobFilters.duration === 'all' ? true :
      (jobFilters.duration === 'short' && job.duration_in_months <= 3) ||
      (jobFilters.duration === 'medium' && job.duration_in_months > 3 && job.duration_in_months <= 6) ||
      (jobFilters.duration === 'long' && job.duration_in_months > 6);
    
    return matchesSearch && matchesMode && matchesType && matchesDuration;
  });
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery ? 
      (note.note_title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       note.note_description?.toLowerCase().includes(searchQuery.toLowerCase())) : true;
       
    const matchesRating = note.average_rating >= noteFilters.minRating;
    
    // Fix department filter - convert to lowercase for case-insensitive comparison
    const matchesDepartment = noteFilters.department === 'all' ? true : 
      note.department?.toLowerCase() === noteFilters.department.toLowerCase();
    
    return matchesSearch && matchesRating && matchesDepartment;
  });
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchQuery ? 
      (video.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       video.topics?.toLowerCase().includes(searchQuery.toLowerCase())) : true;
       
    const matchesSubject = videoFilters.subject === 'all' ? true : 
      video.subject?.toLowerCase() === videoFilters.subject.toLowerCase();
    
    const matchesSemester = videoFilters.semester === 'all' ? true : 
      video.sem?.toString() === videoFilters.semester;
    
    return matchesSearch && matchesSubject && matchesSemester;
  });
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery ? 
      (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       post.description?.toLowerCase().includes(searchQuery.toLowerCase())) : true;
       
    const matchesEventType = postFilters.eventType === 'all' ? true : 
      post.subtype?.toLowerCase() === postFilters.eventType.toLowerCase();
    
    // Date range filter - assumes post.deadline or post.upload_date exists
    const matchesDateRange = postFilters.dateRange === 'all' ? true : 
      (postFilters.dateRange === 'this-week' && isWithinLastDays(post.deadline || post.upload_time, 7)) ||
      (postFilters.dateRange === 'this-month' && isWithinLastDays(post.deadline || post.upload_time, 30)) ||
      (postFilters.dateRange === 'upcoming' && isFutureDate(post.deadline));
    
    return matchesSearch && matchesEventType && matchesDateRange;
  });

  // Helper date functions for post filters
  const isWithinLastDays = (dateStr, days) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days && diffDays >= 0;
  };
  
  const isFutureDate = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    return date > now;
  };

  // Filtered content for "All" category
  const allFilteredContent = selectedCategory === 'All' && searchQuery ? (
    <>
      {filteredJobs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Jobs</h2>
          <Jobs jobs={filteredJobs.slice(0, 2)} onDelete={handleDeleteJob} isAdmin={isAdmin} />
          {filteredJobs.length > 2 && (
            <button 
              className="text-custom-blue hover:underline mt-2"
              onClick={() => setSelectedCategory('Jobs')}
            >
              See all {filteredJobs.length} jobs
            </button>
          )}
        </div>
      )}
      {filteredNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <Notes notes={filteredNotes.slice(0, 2)} onDelete={handleDeleteNote} isAdmin={isAdmin} />
          {filteredNotes.length > 2 && (
            <button 
              className="text-custom-blue hover:underline mt-2"
              onClick={() => setSelectedCategory('Notes')}
            >
              See all {filteredNotes.length} notes
            </button>
          )}
        </div>
      )}
      {filteredVideos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <Videos videos={filteredVideos.slice(0, 2)} onDelete={handleDeleteVideo} isAdmin={isAdmin} />
          {filteredVideos.length > 2 && (
            <button 
              className="text-custom-blue hover:underline mt-2"
              onClick={() => setSelectedCategory('Videos')}
            >
              See all {filteredVideos.length} videos
            </button>
          )}
        </div>
      )}
      {filteredPosts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <Posts posts={filteredPosts.slice(0, 2)} onDelete={handleDeletePost} isAdmin={isAdmin} />
          {filteredPosts.length > 2 && (
            <button 
              className="text-custom-blue hover:underline mt-2"
              onClick={() => setSelectedCategory('Posts')}
            >
              See all {filteredPosts.length} posts
            </button>
          )}
        </div>
      )}
      {filteredJobs.length === 0 && filteredNotes.length === 0 && 
       filteredVideos.length === 0 && filteredPosts.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">No results found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </>
  ) : null;

  // New content for "All" category when no search query exists - carousel style
  const allContent = selectedCategory === 'All' && !searchQuery ? (
    <>
      {/* Jobs Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Jobs</h2>
          <button 
            className="text-custom-blue hover:underline"
            onClick={() => setSelectedCategory('Jobs')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {jobs.slice(0, 5).map(job => (
            <div className="min-w-[300px] max-w-[300px]" key={job.job_id}>
              <JobCard job={job} onDelete={handleDeleteJob} isAdmin={isAdmin} />
            </div>
          ))}
        </div>
      </div>

      {/* Notes Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Notes</h2>
          <button 
            className="text-custom-blue hover:underline"
            onClick={() => setSelectedCategory('Notes')}
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {notes.slice(0, 4).map(note => (
            <div key={note.note_id} className="flex-shrink-0">
              <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-300 h-full'>
                <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                  <p className='font-bold'>{note.note_title}</p>
                  <div className='flex items-center'>
                    <StarIcon className="text-yellow-400 mr-1" style={{ width: '20px', height: '20px' }} />
                    <p>{note.average_rating && note.average_rating.toFixed(1)}</p>
                  </div>
                </div>
                <div className='flex-grow'>
                  <p className='text-sm'>{note.note_description?.substring(0, 80)}...</p>
                </div>
                <div className='flex justify-between mt-auto'>
                  <p className='text-custom-blue font-medium'>{note.department}</p>
                  <a href={note.document} target="_blank" rel="noopener noreferrer">
                    <PictureAsPdfIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Videos</h2>
          <button 
            className="text-custom-blue hover:underline"
            onClick={() => setSelectedCategory('Videos')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {videos.slice(0, 5).map(video => (
            <div className="min-w-[350px] max-w-[350px]" key={video.video_id}>
              <VideoCard video={video} onDelete={handleDeleteVideo} isAdmin={isAdmin} />
            </div>
          ))}
        </div>
      </div>

      {/* Posts Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <button 
            className="text-custom-blue hover:underline"
            onClick={() => setSelectedCategory('Posts')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {posts.slice(0, 3).map(post => (
            <div className="min-w-[350px] max-w-[350px]" key={post.post_id}>
              <div className="border p-4 rounded-lg bg-gray-300 shadow">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-lg">{post.title}</p>
                </div>
                <div className="flex flex-col items-center mb-4">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                </div>
                <div className="mb-4">
                  <p className="text-sm border-b-[1px] pb-3 border-custom-blue">
                    {post.description?.substring(0, 80)}...
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <FavoriteBorderOutlinedIcon className="text-blue-500 mr-1" style={{ width: '20px', height: '20px' }} />
                    <p className="text-custom-blue font-medium">{post.likes}</p>
                  </div>
                  <p className="text-custom-blue font-medium">{post.subtype}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : null;

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
              { name: 'All', icon: null },
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
          
          {/* Filter toggle button */}
          <button
            className='mb-6 px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300'
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {/* Filters */}
          {showFilters && (
            <div className='w-full mb-8 p-4 bg-white rounded-lg shadow'>
              {selectedCategory === 'Jobs' || selectedCategory === 'All' ? (
                <div className='mb-4'>
                  <h3 className='font-semibold mb-2'>Job Filters</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Mode</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={jobFilters.mode}
                        onChange={(e) => setJobFilters({...jobFilters, mode: e.target.value})}
                      >
                        <option value="all">All</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Type</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={jobFilters.type}
                        onChange={(e) => setJobFilters({...jobFilters, type: e.target.value})}
                      >
                        <option value="all">All</option>
                        <option value="internship">Internship</option>
                        <option value="job">Job</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Duration</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={jobFilters.duration}
                        onChange={(e) => setJobFilters({...jobFilters, duration: e.target.value})}
                      >
                        <option value="all">All</option>
                        <option value="short">Short (≤ 3 months)</option>
                        <option value="medium">Medium (3-6 months)</option>
                        <option value="long">Long (6 months+)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {selectedCategory === 'Notes' || selectedCategory === 'All' ? (
                <div className='mb-4'>
                  <h3 className='font-semibold mb-2'>Notes Filters</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Minimum Rating</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="5" 
                        step="0.5"
                        className='w-full'
                        value={noteFilters.minRating}
                        onChange={(e) => setNoteFilters({...noteFilters, minRating: parseFloat(e.target.value)})}
                      />
                      <div className='flex justify-between'>
                        <span>0</span>
                        <span>{noteFilters.minRating}</span>
                        <span>5</span>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Department</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={noteFilters.department}
                        onChange={(e) => setNoteFilters({...noteFilters, department: e.target.value})}
                      >
                        <option value="all">All Departments</option>
                        <option value="computer">Computer</option>
                        <option value="it">Information Technology</option>
                        <option value="extc">EXTC</option>
                        <option value="mechanical">Mechanical</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {/* Add Video filters */}
              {selectedCategory === 'Videos' || selectedCategory === 'All' ? (
                <div className='mb-4'>
                  <h3 className='font-semibold mb-2'>Video Filters</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Subject</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={videoFilters.subject}
                        onChange={(e) => setVideoFilters({...videoFilters, subject: e.target.value})}
                      >
                        <option value="all">All Subjects</option>
                        {/* Get unique subjects from videos */}
                        {Array.from(new Set(videos.map(v => v.subject))).filter(Boolean).map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Semester</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={videoFilters.semester}
                        onChange={(e) => setVideoFilters({...videoFilters, semester: e.target.value})}
                      >
                        <option value="all">All Semesters</option>
                        {/* Get unique semesters from videos */}
                        {Array.from(new Set(videos.map(v => v.sem))).filter(Boolean).sort().map(sem => (
                          <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {/* Add Post filters */}
              {selectedCategory === 'Posts' || selectedCategory === 'All' ? (
                <div className='mb-4'>
                  <h3 className='font-semibold mb-2'>Post Filters</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Date Range</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={postFilters.dateRange}
                        onChange={(e) => setPostFilters({...postFilters, dateRange: e.target.value})}
                      >
                        <option value="all">All Time</option>
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="upcoming">Upcoming Events</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Event Type</label>
                      <select 
                        className='w-full p-2 border rounded'
                        value={postFilters.eventType}
                        onChange={(e) => setPostFilters({...postFilters, eventType: e.target.value})}
                      >
                        <option value="all">All Types</option>
                        {/* Get unique subtypes from posts */}
                        {Array.from(new Set(posts.map(p => p.subtype))).filter(Boolean).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className='w-full'>
          {isLoading ? (
            // Skeleton loader
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-40 bg-gray-300 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {selectedCategory === 'All' && searchQuery ? allFilteredContent : null}
              {selectedCategory === 'All' && !searchQuery ? allContent : null}
              {selectedCategory === 'Jobs' && <Jobs jobs={filteredJobs} onDelete={handleDeleteJob} isAdmin={isAdmin} />}
              {selectedCategory === 'Notes' && <Notes notes={filteredNotes} onDelete={handleDeleteNote} isAdmin={isAdmin} />}
              {selectedCategory === 'Videos' && <Videos videos={filteredVideos} onDelete={handleDeleteVideo} isAdmin={isAdmin} />}
              {selectedCategory === 'Posts' && <Posts posts={filteredPosts} onDelete={handleDeletePost} isAdmin={isAdmin} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Discover;
