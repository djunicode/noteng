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
// import VideoCard from './VideoCard';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import StarIcon from '@mui/icons-material/Star';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useLocation, useNavigate } from 'react-router-dom';
import {  Star, Trash2, Tag, Building, FileText } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/Delete';

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract search term from URL params and prefill the search input
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');
    
    if (searchParam) {
      setSearchTerm(searchParam);
      setSearchQuery(searchParam); // Set the search input value directly
    }
    
    // If activeTab is passed from state (from the "See More" links)
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);
  
  // Use the search term to filter results or call API
  useEffect(() => {
    if (searchTerm) {
      // Fetch data based on searchTerm and activeTab
      console.log(`Searching for: ${searchTerm} in tab: ${activeTab}`);
      // Call your search API here
    }
  }, [searchTerm, activeTab]);
  
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

  // Simplified handleAuthError function - just do a basic redirect
  const handleAuthError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  // Function to fetch all data
  useEffect(() => {
    setIsLoading(true);
    
    const fetchAllData = async () => {
      try {
        // Fetch jobs
        try {
          const jobsResponse = await axios.get('https://monilmeh.pythonanywhere.com/api/jobboard/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          // Sort jobs by date - newest first
          const sortedJobs = jobsResponse.data.sort((a, b) => {
            if (a.upload_time && b.upload_time) {
              return new Date(b.upload_time) - new Date(a.upload_time);
            }
            return 0;
          });
          setJobs(sortedJobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            handleAuthError();
            return;
          }
        }
        
        // Fetch notes
        try {
          const notesResponse = await axios.get('https://monilmeh.pythonanywhere.com/api/notes/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          // Sort notes by date if available, otherwise use provided order
          const sortedNotes = notesResponse.data.sort((a, b) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at) - new Date(a.created_at);
            }
            return 0;
          });
          setNotes(sortedNotes);
        } catch (error) {
          console.error('Error fetching notes:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            handleAuthError();
            return;
          }
        }
        
        // Fetch videos
        try {
          const videosResponse = await fetch('https://monilmeh.pythonanywhere.com/api/videolinks/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!videosResponse.ok) {
            if (videosResponse.status === 401 || videosResponse.status === 403) {
              handleAuthError();
              return;
            }
            throw new Error(`HTTP error! Status: ${videosResponse.status}`);
          }
          const videosData = await videosResponse.json();
          // Sort videos by date if available
          const sortedVideos = videosData.sort((a, b) => {
            if (a.upload_time && b.upload_time) {
              return new Date(b.upload_time) - new Date(a.upload_time);
            }
            return 0;
          });
          setVideos(sortedVideos);
        } catch (error) {
          console.error('Error fetching videos:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            handleAuthError();
            return;
          }
        }
        
        // Fetch posts
        try {
          const postsResponse = await axios.get('https://monilmeh.pythonanywhere.com/api/posts', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          // Sort posts by date - newest first
          const sortedPosts = postsResponse.data.sort((a, b) => {
            if (a.upload_time && b.upload_time) {
              return new Date(b.upload_time) - new Date(a.upload_time);
            }
            return 0;
          });
          setPosts(sortedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            handleAuthError();
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        handleAuthError();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [token, navigate,handleAuthError]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update URL with search parameter
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery.trim()) {
      queryParams.set('search', searchQuery.trim());
      navigate(`${location.pathname}?${queryParams.toString()}`);
    } else {
      queryParams.delete('search');
      navigate(`${location.pathname}?${queryParams.toString()}`);
    }
    
    // Set the search term for filtering
    setSearchTerm(searchQuery);
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

  const handleCardClick = (noteId) => {
    navigate(`/viewnote/${noteId}`);
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
          <h2 className="text-2xl font-semibold">Latest Jobs</h2>
          <button 
            className="text-custom-blue hover:underline font-medium"
            onClick={() => setSelectedCategory('Jobs')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {jobs.slice(0, 5).map(job => (
            <div className="min-w-[300px] max-w-[300px] hover:translate-y-[-5px] transition-all duration-300" key={job.job_id}>
              <JobCard job={job} onDelete={handleDeleteJob} isAdmin={isAdmin} />
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="w-full text-center py-8 text-gray-500">No jobs available</div>
          )}
        </div>
      </div>
       {/* Posts Carousel */}
       <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
          <button 
            className="text-custom-blue hover:underline font-medium"
            onClick={() => setSelectedCategory('Posts')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {posts.slice(0, 3).map(post => (
            <div className="min-w-[350px] max-w-[350px] hover:translate-y-[-5px] transition-all duration-300" key={post.post_id}>
              <div className="border p-4 rounded-lg bg-gray-300 shadow hover:shadow-lg transition-shadow relative cursor-pointer" 
                   onClick={() => navigate(`/post/${post.post_id}`)}>
                {isAdmin && (
                  <button 
                    className='absolute top-3 right-3 text-[#394dfd] hover:text-red-500 z-10'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.post_id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
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
          {posts.length === 0 && (
            <div className="w-full text-center py-8 text-gray-500">No posts available</div>
          )}
        </div>
      </div>

      {/* Notes Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Notes</h2>
          <button 
            className="text-custom-blue hover:underline font-medium"
            onClick={() => setSelectedCategory('Notes')}
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {notes.slice(0, 4).map(note => (
            <div 
              key={note.note_id} 
              onClick={() => handleCardClick(note.note_id)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer min-h-[360px] flex flex-col"
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <div className="flex items-center max-w-[70%]">
                  <span className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                    note.subject === 'CS' ? 'bg-blue-500' :
                    note.subject === 'IT' ? 'bg-green-500' :
                    note.subject === 'AIML' ? 'bg-purple-500' :
                    note.subject === 'AIDS' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></span>
                  <h3 className='font-bold text-lg text-gray-800 truncate'>{note.note_title}</h3>
                </div>
                
                <div className='flex items-center gap-2'>
                  {note.average_rating && (
                    <div className='flex items-center bg-yellow-100 px-2 py-1 rounded'>
                      <Star className="text-yellow-400" size={16} />
                      <span className='ml-1 text-sm font-medium'>{note.average_rating.toFixed(1)}</span>
                    </div>
                  )}
                  {isAdmin && (
                    <button 
                      className='p-1 rounded-full hover:bg-gray-200 transition-colors'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.note_id);
                      }}
                    >
                      <Trash2 
                        size={18}
                        className='text-gray-400 hover:text-red-500' 
                      />
                    </button>
                  )}
                </div>
              </div>
              
              <div className='p-4 flex-1 flex flex-col'>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs">
                    <Tag size={12} className="mr-1 text-custom-blue" />
                    <span>{note.subject}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    <Building size={12} className="mr-1 text-gray-500" />
                    <span>{note.department}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className='text-gray-700 mb-4 line-clamp-4'>{note.note_description}</p>
                </div>
                
                <div className='mt-auto pt-4 border-t border-gray-100'>
                  <a 
                    href={note.document} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className='text-custom-blue hover:text-blue-700 flex items-center hover:underline'
                  >
                    <FileText size={16} className='mr-1' />
                    <span>View PDF</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="col-span-4 text-center py-8 text-gray-500">No notes available</div>
          )}
        </div>
      </div>

      {/* Videos Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Videos</h2>
          <button 
            className="text-custom-blue hover:underline font-medium"
            onClick={() => setSelectedCategory('Videos')}
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {videos.slice(0, 5).reverse().map(video => (
            <div className="min-w-[450px] max-w-[450px] transition-shadow duration-300" key={video.video_id}>
              <div className='border p-4 rounded-lg shadow bg-gray-300 w-full cursor-pointer hover:shadow-md transition-shadow' 
                   onClick={() => navigate(`/ViewVideo/${video.video_id}`)}>
                <div className='relative'>
                  {isAdmin && (
                    <div className='absolute top-2 right-2 z-10'>
                      <DeleteIcon 
                        className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVideo(video.video_id);
                        }} 
                      />
                    </div>
                  )}
                  
                  <div className='mb-4'>
                    <h2 className='font-bold text-lg'>{video.subject}</h2>
                    <p className='text-sm md:text-base'>{video.topics} - {video.sem} Semester</p>
                    {video.upload_time && (
                      <p className='text-xs text-gray-600 mt-1'>
                        {new Date(video.upload_time).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className='w-full mt-2 overflow-hidden rounded-lg'>
                    <iframe
                      width="100%"
                      height="300"
                      src={video.links}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded transition-opacity"
                    ></iframe>
                  </div>
                  
                  <div className='flex justify-between mt-3'>
                    <p className='text-gray-700 text-sm font-medium'>{video.subject}</p>
                    <p className='text-gray-700 text-sm font-medium'>Semester {video.sem}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
            <div className="w-full text-center py-8 text-gray-500">No videos available</div>
          )}
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
