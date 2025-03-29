import React, { useState, useEffect } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, FormControl, Select, Alert, Snackbar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import BackButton from '../../assets/BackButton.png';
import dayjs from 'dayjs';
import './viewpost.css';

function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtype: '',
    description: '',
    document: null,
    deadline: null,
    likes: 100,
    post_url: '',
    user: '60004220207',
    organised_by: 'college'
  });
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem('token');

  const EVENT_TYPES = [
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'cultural', label: 'Cultural Event' },
    { value: 'datathon', label: 'Datathon' },
    { value: 'startup', label: 'Startup Event' }
  ];

  const ORGANIZER_TYPES = [
    { value: 'college', label: 'College' },
    { value: 'commitee', label: 'Committee' }
  ];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('File is too large. Please select a file under 10MB.', 'error');
      return;
    }
    
    setFormData({
      ...formData,
      document: file
    });
    setFileName(file.name);
    
    // Create image preview
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      showNotification('Please select an image file', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.document) {
      showNotification('Please upload an image', 'error');
      return;
    }

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/posts';
    const form = new FormData();

    form.append('title', formData.title);
    form.append('subtype', formData.subtype);
    form.append('description', formData.description);
    form.append('image', formData.document);
    form.append('deadline', formData.deadline ? formData.deadline.format('YYYY-MM-DDTHH:mm:ssZ') : '');
    form.append('likes', formData.likes);
    form.append('post_url', formData.post_url);
    form.append('organised_by', formData.organised_by);
    form.append('user', formData.user);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        showNotification('Post created successfully!');
        navigate('/');
        // Reset form
        setFormData({
          title: '',
          subtype: '',
          description: '',
          document: null,
          deadline: null,
          likes: 100,
          post_url: '',
          user: '60004220207',
          organised_by: 'college'
        });
        setFileName('');
        setImagePreview(null);
      } else {
        showNotification('Failed to create post', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred while uploading. Please try again later.', 'error');
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
      
      <div className='flex flex-row items-center'>
        <Button className='h-20' onClick={handleGoBack}>
          <img src={BackButton} alt='Back' />
        </Button>
        <p className='ml-6 mt-10 sm:mt-0 flex items-center'>
          <span className='flex font-bold text-[35px]'>Create New Post</span>
        </p>
      </div>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      
      <div className='flex flex-col lg:flex-row gap-6 px-6 mt-4'>
        <div className='w-full lg:w-1/2'>
          <div className='mb-6'>
            <p className='text-[20px] mb-2'>Post Title</p>
            <TextField
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter Post Title'
              variant="outlined"
              fullWidth
              className='inputarea'
            />
          </div>
          
          <div className='flex flex-col lg:flex-row gap-4 mb-6'>
            <div className='w-full'>
              <p className='text-[20px] mb-2'>Event Type</p>
              <FormControl fullWidth variant="outlined" className="inputarea">
                <Select
                  name="subtype"
                  value={formData.subtype}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Event Type</MenuItem>
                  {EVENT_TYPES.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            
            <div className='w-full'>
              <p className='text-[20px] mb-2'>Organized By</p>
              <FormControl fullWidth variant="outlined" className="inputarea">
                <Select
                  name="organised_by"
                  value={formData.organised_by}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Organizer</MenuItem>
                  {ORGANIZER_TYPES.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          
          <div className='mb-6'>
            <p className='text-[20px] mb-2'>Post Description</p>
            <TextField
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter Post Description'
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className='inputarea'
            />
          </div>
          
          <div className='flex flex-col lg:flex-row gap-4 mb-6'>
            <div className='flex flex-col flex-1'>
              <p className='text-[20px] mb-2'>Deadline</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={formData.deadline}
                  onChange={handleDateChange}
                  renderInput={(params) => 
                    <TextField {...params} fullWidth className="inputarea" />
                  }
                />
              </LocalizationProvider>
            </div>
            
            <div className='flex flex-col flex-1'>
              <p className='text-[20px] mb-2'>Post URL</p>
              <TextField
                name='post_url'
                value={formData.post_url}
                onChange={handleChange}
                placeholder='Enter Post URL'
                variant="outlined"
                fullWidth
                className='inputarea'
              />
            </div>
          </div>
          
          <div className='mt-4 mb-6'>
            <p className='text-[20px] mb-2'>Upload Image</p>
            <div 
              className='flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50'
              onClick={handleButtonClick}
            >
              <div className='flex flex-col items-center'>
                <CloudUploadOutlinedIcon fontSize="large" />
                <p className='mt-2'>Click to upload image</p>
                <p className='text-sm text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                <input
                  type='file'
                  accept="image/*"
                  onChange={handleFileChange}
                  className='hidden'
                  id='fileUpload'
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            className='w-full bg-custom-blue py-4 rounded-lg text-white mt-4'
          >
            Add New Post
          </button>
        </div>
        
        <div className='w-full lg:w-1/2'>
          <div className='bg-gray-100 rounded-lg p-6 h-full'>
            <h3 className='text-xl font-semibold mb-4'>Post Preview</h3>
            
            <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
              <h4 className='text-lg font-medium mb-2'>{formData.title || 'Post Title'}</h4>
              <div className='flex gap-2 mb-3'>
                {formData.subtype && (
                  <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                    {EVENT_TYPES.find(t => t.value === formData.subtype)?.label || formData.subtype}
                  </span>
                )}
                {formData.organised_by && (
                  <span className='bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                    {ORGANIZER_TYPES.find(t => t.value === formData.organised_by)?.label || formData.organised_by}
                  </span>
                )}
              </div>
              
              <div className='mb-4'>
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className='w-full h-52 object-cover rounded-lg' 
                  />
                ) : (
                  <div className='w-full h-52 bg-gray-200 flex items-center justify-center rounded-lg'>
                    <p className='text-gray-500'>Image preview will appear here</p>
                  </div>
                )}
              </div>
              
              <p className='text-sm text-gray-700 mb-3 line-clamp-3'>
                {formData.description || 'Post description will appear here...'}
              </p>
              
              {formData.deadline && (
                <div className='flex items-center text-sm text-gray-600 mb-2'>
                  <span>Deadline: {formData.deadline.format('MMMM D, YYYY h:mm A')}</span>
                </div>
              )}
              
              {formData.post_url && (
                <div className='text-sm text-blue-500 truncate'>
                  <a href={formData.post_url} target="_blank" rel="noopener noreferrer">
                    {formData.post_url}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
