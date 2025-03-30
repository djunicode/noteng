import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import { Button } from '@mui/material';
import BackButton from '../assets/BackButton.png';
import '../styles/profile.css';
import MyJobs from '../Components/Profile/MyJobs';
import MyPosts from '../Components/Profile/MyPosts';
import MyNotes from '../Components/Profile/MyNotes';
import MyCard from '../Components/Profile/MyCard';
import DescriptionProfile from '../Components/Profile/DescriptionProfile';
import axios from 'axios';
import MyVideos from '../Components/Profile/MyVideos';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'jobs', 'posts', 'notes', 'videos'

  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: 'https://monilmeh.pythonanywhere.com',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const handleJobDelete = (jobId) => {
    fetch(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Replace with your actual access token
      }
    })
      .then(response => {
        if (response.ok) {
          setUserJobs(userJobs.filter(job => job.job_id !== jobId));
        } else {
          console.error('Error deleting job');
        }
      })
      .catch(error => console.error('Error deleting job:', error));
  };
  const handlePostDelete = (postId) => {
    const token = localStorage.getItem('token'); // Ensure the token is fetched correctly
  
    fetch(`https://monilmeh.pythonanywhere.com/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Use the actual access token
      }
    })
      .then(response => {
        if (response.ok) {
          setUserPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
        } else {
          console.error('Error deleting post');
        }
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user data
        const userResponse = await axiosInstance.get('/auth/user/');
        setUserData(userResponse.data);

        // Check if user is admin
        const adminResponse = await axiosInstance.get('/api/isAdmin/');
        setIsAdmin(adminResponse.data);

        // Fetch all data and filter by sapid
        const [notesResponse, postsResponse, jobsResponse, videosResponse] = await Promise.all([
          axiosInstance.get('/api/notes/'),
          axiosInstance.get('/api/posts'),
          axiosInstance.get('/api/jobboard/'),
          axiosInstance.get('/api/videolinks/')
        ]);

        setUserNotes(notesResponse.data.filter(note => note.user === sapid));
        setUserPosts(postsResponse.data.filter(post => post.user === sapid));
        setUserJobs(jobsResponse.data.filter(job => job.user === sapid));
        if (adminResponse.data) {
          setUserVideos(videosResponse.data.filter(video => video.user === sapid));
        }
        
        // Add a small delay for smoother transition from loading state
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'jobs':
        return (
          <motion.div
            key="jobs"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MyJobs jobs={userJobs} onDelete={handleJobDelete} isLoading={isLoading} />
          </motion.div>
        );
      case 'posts':
        return (
          <motion.div
            key="posts"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MyPosts posts={userPosts} onDelete={handlePostDelete} isLoading={isLoading} />
          </motion.div>
        );
      case 'notes':
        return (
          <motion.div
            key="notes"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MyNotes notes={userNotes} isLoading={isLoading} />
          </motion.div>
        );
      case 'videos':
        if (isAdmin) {
          return (
            <motion.div
              key="videos"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MyVideos videos={userVideos} isLoading={isLoading} />
            </motion.div>
          );
        }
        return null;
      case 'all':
      default:
        return (
          <motion.div
            key="all"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MyJobs jobs={userJobs} onDelete={handleJobDelete} isLoading={isLoading} />
            <MyPosts posts={userPosts} onDelete={handlePostDelete} isLoading={isLoading} />
            <MyNotes notes={userNotes} isLoading={isLoading} />
            {isAdmin && <MyVideos videos={userVideos} isLoading={isLoading} />}
          </motion.div>
        );
    }
  };

  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col maincontent'>
        <div className='flex flex-row mt-12'>
          <div className="w-auto">
            <Button 
              className='backButton' 
              onClick={handleGoBack}
              sx={{ 
                minWidth: 'auto',
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }
              }}
            >
              <img src={BackButton} alt='Back' className="transition-transform hover:scale-110" />
            </Button>
          </div>
          <p className='ml-6 mt-10 flex items-center'>
            <span className='font-bold text-xl sm:text-2xl md:text-3xl heading custom-heading'>My Profile</span>
          </p>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
        
        <div className='flex flex-col overflow-y-scroll h-[100vh] pb-10'>
          <MyCard userData={userData} isLoading={isLoading} />
          <DescriptionProfile
            jobCount={userJobs.length}
            postCount={userPosts.length}
            noteCount={userNotes.length}
            videoCount={userVideos.length}
            userData={userData}
            updateUser={setUserData}
            isLoading={isLoading}
          />
          
          {/* Tab navigation */}
          <div className="flex justify-center mb-6 mt-4 mx-6">
            <div className="bg-white rounded-lg shadow-sm flex p-1 overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                  activeTab === 'all' 
                    ? 'bg-custom-blue text-white font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                  activeTab === 'jobs' 
                    ? 'bg-custom-blue text-white font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                  activeTab === 'posts' 
                    ? 'bg-custom-blue text-white font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                  activeTab === 'notes' 
                    ? 'bg-custom-blue text-white font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Notes
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                    activeTab === 'videos' 
                      ? 'bg-custom-blue text-white font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Videos
                </button>
              )}
            </div>
          </div>
          
          {/* Content area with animations */}
          <div className="mx-auto w-full">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
