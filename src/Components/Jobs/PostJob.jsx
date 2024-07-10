import React, { useState } from 'react';
import Sidebar from '../Home/Sidebar';
import './PostJob.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BackButton from '../../assets/BackButton.png';

const PostJob = () => {
  const [subtype, setSubtype] = useState(null);
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubtypeSelection = (type) => {
    setSubtype(type);
    setFormData({
      ...formData,
      subtype: type
    });
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const JOB_TITLES = [
    'Software Engineer',
    'Data Analyst',
    'Web Developer',
    'UI/UX Designer',
    'Project Manager',
  ];

  const JOB_TYPES = ['Full-time', 'Part-time', 'Contract'];

  const [formData, setFormData] = useState({
    title: '',
    subtype: '',
    description: '',
    deadline: '',
    post_url: '',
    user: '',
    mode: '',
    location: '',
    salary: '',
    job_type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/jobs';

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Job post created successfully!');
        navigate('/');
        setFormData({
          title: '',
          subtype: '',
          description: '',
          deadline: '',
          post_url: '',
          user: '',
          mode: '',
          location: '',
          salary: '',
          job_type: '',
        });
      } else {
        alert('Failed to create job post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex flex-col lg:flex-row h-full' onKeyPress={handleKeyPress}>
      <div className='flex flex-col ml-3 gap-4 w-full maincontent mb-10'>
        <div className='flex flex-col sm:flex-row items-center'>
          <Button className='h-20 items-left sm:items-center' onClick={handleGoBack}>
            <img src={BackButton} alt='Back' />
          </Button>
          <p className='mt-10 sm:mt-0 flex items-center'>
            <span className='flex font-bold text-[35px]'>Create New Job Opportunity</span>
          </p>
        </div>
        <div className='w-[78vw] border-b-2'></div>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px] '>Job Title</p>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter Job Title'
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px] '>Job Type</p>
            <select
              name='job_type'
              value={formData.job_type}
              onChange={handleChange}
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value='' disabled>Select Job Type</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className='text-[25px] '>Job Description</p>
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Enter Job Description'
          className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <div className='flex flex-col lg:flex-row'>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px]'>Deadline</p>
            <input
              type='text'
              name='deadline'
              value={formData.deadline}
              onChange={handleChange}
              placeholder='Enter Deadline'
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px] '>Post URL</p>
            <input
              type='text'
              name='post_url'
              value={formData.post_url}
              onChange={handleChange}
              placeholder='Enter Post URL'
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px] '>Mode</p>
            <input
              type='text'
              name='mode'
              value={formData.mode}
              onChange={handleChange}
              placeholder='Enter Mode (e.g. Remote, On-site)'
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col flex-1'>
            <p className='text-[25px] '>Location</p>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='Enter Location'
              className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>
        <p className='text-[25px] '>Salary</p>
        <input
          type='text'
          name='salary'
          value={formData.salary}
          onChange={handleChange}
          placeholder='Enter Salary'
          className='border mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <div className='flex w-full h-full items-center justify-center'>
          <div className='w-full mr-6'>
            <button
              onClick={handleSubmit}
              className='w-full bg-custom-blue py-4 rounded-lg text-white'
            >
              Add New Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
