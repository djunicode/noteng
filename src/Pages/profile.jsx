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

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [userVideos, setUserVideos] = useState([]);

  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: 'https://monilmeh.pythonanywhere.com',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axiosInstance.get('/auth/user/');
        setUserData(userResponse.data);

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
        setUserVideos(videosResponse.data.filter(video => video.user === sapid));
        console.log(userData);
        console.log(userNotes);
        console.log(userPosts);
        console.log(userJobs);
        console.log(userVideos);
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
          <MyJobs jobs={userJobs} />
          <MyPosts posts={userPosts} />
          <MyNotes notes={userNotes} />
          <MyResources videos={userVideos} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
