import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button } from '@mui/material';

import axios from 'axios';

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Assuming you are passing post postId as a URL parameter
  const [postDetails, setPostDetails] = useState(null);
  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setPostDetails(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId, token]);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex flex-col maincontent p-4 overflow-y-scroll h-[100vh]'>
        <div className='flex flex-row items-center'>
              <Button className='backButton' onClick={handleGoBack}>
              <img src={BackButton} alt='Back'/>
          </Button>
          <p className='ml-6 mt-10 mb-6 font-bold text-4xl'>Post Details</p>
        </div>
        <hr className='my-2 border-b-2 border-gray-300' />
        <div>
          <h3 className='text-3xl font-bold mb-3 mt-3'>{postDetails.title}</h3>
        </div>
        <hr className='my-2 border-b-2 border-gray-300' />
        <h3 className='text-2xl font-bold mt-3 mb-3 ml-6'>Post Description</h3>
        <p className='text-xl mt-3 mb-3 ml-6'>{postDetails.description}</p>
        <div className='postimg flex justify-center items-center mt-4'>
          <img src={postDetails.image} alt={postDetails.title} className='w-[450px] h-auto object-contain' style={{borderRadius:'10%'}}/>
        </div>
        <hr className='my-4 border-b-2 border-gray-300' />
        <div className='flex flex-row'>
          <div className='flex flex-col mr-8'>
            <p className='font-bold text-xl'>Posted By:</p>
            <p className='text-base'>{sapid}</p>
          </div>
          <div className='flex flex-col mr-8'>
            <p className='font-bold text-xl'>Posted on:</p>
            <p className='text-base'>{new Date(postDetails.deadline).toLocaleDateString()}</p>
            <p className='text-base'>{new Date(postDetails.deadline).toLocaleTimeString()}</p>
          </div>
          <div className='flex flex-grow'>
            <button className='submit-button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
              Contact Post Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
