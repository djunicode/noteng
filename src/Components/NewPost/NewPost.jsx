import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BackButton from '../../assets/BackButton.png';
import './viewpost.css';

function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtype: '',
    description: '',
    document: null,
    deadline: '',
    likes: 100,
    post_url: '',
    user: ''
  });
  const [fileName, setFileName] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document: file,
    });
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/posts';
    const form = new FormData();

    form.append('title', formData.title);
    form.append('category', formData.subtype);
    form.append('description', formData.description);
    form.append('image', formData.document);
    form.append('deadline', formData.deadline);
    form.append('likes', formData.likes);
    form.append('post_url', formData.post_url);
    form.append('user', formData.user);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        navigate('/');
        setFormData({
          title: '',
          subtype: '',
          description: '',
          document: null,
          deadline: '',
          likes: 100,
          post_url: '',
          user: ''
        });
        setFileName('');
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileUpload').click();
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className='flex flex-col gap-3 w-full' onKeyPress={handleKeyPress}>
      <div className='flex flex-row items-center'>
        <Button className='h-20' onClick={handleGoBack}>
          <img src={BackButton} alt='Back' />
        </Button>
        <p className='ml-6 mt-10 sm:mt-0 flex items-center'>
          <span className='flex font-bold text-[35px]'>Create New Post</span>
        </p>
      </div>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col flex-1'>
          <p className='text-[25px] ml-6'>Post Title</p>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Enter Post Title'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='flex flex-col flex-1'>
          <p className='text-[25px] ml-6'>Post Category</p>
          <input
            type='text'
            name='subtype'
            value={formData.subtype}
            onChange={handleChange}
            placeholder='Enter Post Category'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
      </div>
      <p className='text-[25px] ml-6'>Post Description</p>
      <input
        type='text'
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Enter Post Description'
        className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col flex-1'>
          <p className='text-[25px] ml-6'>Deadline</p>
          <input
            type='text'
            name='deadline'
            value={formData.deadline}
            onChange={handleChange}
            placeholder='Enter Deadline'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='flex flex-col flex-1'>
          <p className='text-[25px] ml-6'>Post URL</p>
          <input
            type='text'
            name='post_url'
            value={formData.post_url}
            onChange={handleChange}
            placeholder='Enter Post URL'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
      </div>
      <p className='text-[25px] ml-6'>Upload Images</p>
      <div className='flex gap-8 flex-col md:flex-row'>
        <div onClick={handleButtonClick} className='flex flex-row gap-2 justify-center md:flex-col ml-6 mb-3 p-20 md:p-36 mr-6 md:mr-0 border-dotted border-2 border-gray-400 rounded-lg'>
          <div className='flex flex-col items-center'>
            <CloudUploadOutlinedIcon />
            <button>Upload</button>
            <input
              type='file'
              onChange={handleFileChange}
              className='hidden'
              id='fileUpload'
            />
          </div>
          {fileName && (
            <p className='ml-6 text-green-500'>File Uploaded: {fileName}</p>
          )}
        </div>
        <div className='flex w-full h-full items-center justify-center'>
          <div className='w-full mr-6 ml-6'>
            <button
              onClick={handleSubmit}
              className='w-full bg-custom-blue py-4 rounded-lg text-white'
            >
              Add New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
