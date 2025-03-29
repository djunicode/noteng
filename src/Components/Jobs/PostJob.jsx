import React, { useState } from 'react';
import Sidebar from '../Home/Sidebar';
import './PostJob.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Slider, TextField, FormControl, Select, MenuItem, Alert, Snackbar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import BackButton from '../../assets/BackButton.png';
import dayjs from 'dayjs';

const PostJob = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({...notification, open: false});
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const JOB_TITLES = [
    'Software Engineer',
    'Data Analyst',
    'Web Developer',
    'UI/UX Designer',
    'Project Manager',
    'Business Analyst',
    'Backend Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'Machine Learning Engineer',
  ];

  const JOB_TYPES = ['Full-time', 'Part-time', 'Contract'];
  const MODE_TYPES = ['Offline', 'Online', 'Hybrid', 'Remote'];
  const JOB_SUBTYPES = ['internship', 'Job'];

  const [formData, setFormData] = useState({
    title: '',
    subtype: 'internship',
    description: '',
    deadline: null,
    post_url: '',
    user: '60004220207',
    mode: 'Remote',
    location: '',
    salary: [30000, 100000],
    job_type: '',
    company: '',
    duration_in_months: 3,
    contact_no: '',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  const handleSalaryChange = (event, newValue) => {
    setFormData({
      ...formData,
      salary: newValue,
    });
  };

  const handleJobRoleSelect = (role) => {
    setFormData({
      ...formData,
      title: role,
      // Prefill some fields based on role
      requirements: getDefaultRequirements(role),
    });
  };

  const getDefaultRequirements = (role) => {
    const requirements = {
      'Software Engineer': 'Proficiency in programming languages (Java, Python, etc.), knowledge of data structures and algorithms, experience with software development methodologies.',
      'Data Analyst': 'Experience with data analysis tools (Excel, SQL, Python), statistical knowledge, data visualization skills.',
      'Web Developer': 'Proficiency in HTML, CSS, JavaScript, experience with modern frameworks like React, Angular, or Vue.',
      // Add more default requirements for other roles
    };
    return requirements[role] || '';
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data for submission
    const submissionData = {
      ...formData,
      job_title: formData.title, // Map title field to job_title for API
      deadline: formData.deadline ? formData.deadline.format('YYYY-MM-DDTHH:mm:ssZ') : '',
      salary: `₹${formData.salary[0]} - ₹${formData.salary[1]}`,
    };

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/jobboard/';

    try {
      const response = await axios.post(endpoint, submissionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        showNotification('Job post created successfully!');
        navigate('/');
        // Reset form
        setFormData({
          title: '',
          subtype: 'internship',
          description: '',
          deadline: null,
          post_url: '',
          user: '60004220207',
          mode: 'Remote',
          location: '',
          salary: [30000, 100000],
          job_type: '',
          company: '',
          duration_in_months: 3,
          contact_no: '',
          requirements: '',
        });
      } else {
        showNotification('Failed to create job post', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred while uploading. Please try again later.', 'error');
    }
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className='flex flex-col lg:flex-row h-full' onKeyPress={handleKeyPress}>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
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
        
        {/* Job Role Selector */}
        <div className='mb-6'>
          <p className='text-[25px] mb-3'>Quick Select Job Role</p>
          <div className='flex flex-wrap gap-2 mb-4'>
            {JOB_TITLES.map((role) => (
              <Chip
                key={role}
                label={role}
                clickable
                onClick={() => handleJobRoleSelect(role)}
                color={formData.title === role ? 'primary' : 'default'}
                className='m-1'
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Job Title</p>
            <TextField
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter Job Title'
              variant='outlined'
              fullWidth
              className='inputarea'
            />
          </div>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Job Type</p>
            <FormControl fullWidth variant="outlined" className="inputarea">
              <Select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Job Type</MenuItem>
                {JOB_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Company</p>
            <TextField
              name='company'
              value={formData.company}
              onChange={handleChange}
              placeholder='Enter Company Name'
              variant='outlined'
              fullWidth
              className='inputarea'
            />
          </div>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Job Subtype</p>
            <FormControl fullWidth variant="outlined" className="inputarea">
              <Select
                name="subtype"
                value={formData.subtype}
                onChange={handleChange}
                displayEmpty
              >
                {JOB_SUBTYPES.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        
        <div className='mb-6'>
          <p className='text-[20px] mb-2'>Job Description</p>
          <TextField
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter Job Description'
            multiline
            rows={4}
            variant='outlined'
            fullWidth
            className='inputarea'
          />
        </div>

        <div className='mb-6'>
          <p className='text-[20px] mb-2'>Job Requirements</p>
          <TextField
            name='requirements'
            value={formData.requirements}
            onChange={handleChange}
            placeholder='Enter Job Requirements'
            multiline
            rows={4}
            variant='outlined'
            fullWidth
            className='inputarea'
          />
        </div>
        
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Deadline</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.deadline}
                onChange={handleDateChange}
                renderInput={(params) => 
                  <TextField {...params} fullWidth className='inputarea' />
                }
              />
            </LocalizationProvider>
          </div>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Post URL</p>
            <TextField
              name='post_url'
              value={formData.post_url}
              onChange={handleChange}
              placeholder='Enter Post URL'
              variant='outlined'
              fullWidth
              className='inputarea'
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Mode</p>
            <FormControl fullWidth variant="outlined" className="inputarea">
              <Select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                displayEmpty
              >
                {MODE_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Location</p>
            <TextField
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='Enter Location'
              variant='outlined'
              fullWidth
              className='inputarea'
              disabled={formData.mode === 'Remote'}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Duration (months)</p>
            <TextField
              type='number'
              name='duration_in_months'
              value={formData.duration_in_months}
              onChange={handleChange}
              variant='outlined'
              fullWidth
              className='inputarea'
            />
          </div>
          <div className='flex flex-col flex-1 mb-6'>
            <p className='text-[20px] mb-2'>Contact Number</p>
            <TextField
              name='contact_no'
              value={formData.contact_no}
              onChange={handleChange}
              placeholder='Enter Contact Number'
              variant='outlined'
              fullWidth
              className='inputarea'
            />
          </div>
        </div>
        
        <div className='mb-6'>
          <p className='text-[20px] mb-2'>Salary Range (₹)</p>
          <div className='px-4'>
            <Slider
              value={formData.salary}
              onChange={handleSalaryChange}
              valueLabelDisplay="auto"
              min={0}
              max={500000}
              step={5000}
              marks={[
                { value: 0, label: '₹0' },
                { value: 250000, label: '₹250K' },
                { value: 500000, label: '₹500K' },
              ]}
            />
            <div className='flex justify-between mt-2'>
              <span>₹{formData.salary[0].toLocaleString()}</span>
              <span>₹{formData.salary[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className='flex w-full h-full items-center justify-center mt-6'>
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
