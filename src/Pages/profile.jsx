import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import { Button } from '@mui/material';
import BackButton from '../assets/BackButton.png';
import '../styles/profile.css';
import MyJobs from '../Components/Profile/MyJobs';
import MyPosts from '../Components/Profile/MyPosts';
import MyNotes from '../Components/Profile/MyNotes';
import MyResources from '../Components/Profile/MyResources';
import MyCard from '../Components/Profile/MyCard';
import DescriptionProfile from '../Components/Profile/DescriptionProfile';
import axios from 'axios';
import MyVideos from '../Components/Profile/MyVideos'; // Import MyVideos component

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin

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
        console.log(userPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col maincontent'>
        <div className='flex flex-row'>
          <Button className='backButton' onClick={handleGoBack}>
            <img src={BackButton} alt='Back' />
          </Button>
          <p className='ml-6 mt-10 flex items-center'>
            <span className='font-bold heading custom-heading'>My Profile</span>
          </p>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
        <div className='flex flex-col overflow-y-scroll h-[100vh]'>
          <MyCard userData={userData} />
          <DescriptionProfile
            jobCount={userJobs.length}
            postCount={userPosts.length}
            noteCount={userNotes.length}
            videoCount={userVideos.length}
            userData={userData}
            updateUser={setUserData}
          />
          <MyJobs jobs={userJobs} onDelete={handleJobDelete}/>
          <MyPosts posts={userPosts} onDelete={handlePostDelete} />
          <MyNotes notes={userNotes} />
          {isAdmin && <MyVideos videos={userVideos} />} {/* Show MyVideos only if user is admin */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
