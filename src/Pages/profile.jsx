import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar'; // Adjust the path according to your project structure
import { Button } from '@mui/material';
import BackButton from '../assets/BackButton.png';
import '../styles/profile.css';
import MyJobs from '../Components/Home/MyJobs';
import MyPosts from '../Components/Home/MyPosts';
import MyNotes from '../Components/Home/MyNotes';
import MyResources from '../Components/Home/MyResources';
import MyCard from '../Components/Home/MyCard';
import DescriptionProfile from '../Components/Home/DescriptionProfile';

const Profile=() => {
    const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate.goBack();
  };

  
  return (
    <div className='flex flex-col lg:flex-row'>
        <Sidebar/>
        <>
        <div className='flex flex-col maincontent'>
        <div className='flex flex-row'>
        <Button className='backButton' onClick={handleGoBack}>
            <img src={BackButton} alt='Back'/>
        </Button>
        <p className='ml-6 mt-10 flex items-center'>
        <span className='font-bold heading custom-heading'>My Profile</span>
        </p>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
        
        
        <div className='flex flex-col overflow-y-scroll h-[100vh]'>
            <MyCard/>
            <DescriptionProfile/>
            <MyJobs/>
            <MyPosts/>
            <MyNotes/>
            <MyResources/>
        </div>
        </div>
        </>
    </div>
);
}

export default Profile;
