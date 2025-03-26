import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { Calendar, MessageCircle } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); 
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [calendarNote, setCalendarNote] = useState('');
  
  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setPostDetails(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setNotification({
          open: true,
          message: 'Failed to load post details',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, token]);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleContactAdmin = () => {
    // Here you could implement functionality to contact the admin
    // For now, just show a notification
    setNotification({
      open: true,
      message: 'Contact request sent to post administrator',
      type: 'success'
    });
    
    // If there's an email available, you could also open a mail client
    if (postDetails && postDetails.contact_email) {
      window.location.href = `mailto:${postDetails.contact_email}?subject=Regarding Post: ${postDetails.title}`;
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  const handleAddToCalendar = () => {
    setCalendarNote('');
    setCalendarDate(postDetails.deadline ? dayjs(postDetails.deadline) : dayjs());
    setCalendarDialogOpen(true);
  };
  
  const handleCloseCalendarDialog = () => {
    setCalendarDialogOpen(false);
  };
  
  const handleSaveToCalendar = async () => {
    try {
      const payload = {
        user: sapid,
        date: calendarDate.format('YYYY-MM-DD'),
        title: postDetails.title,
        description: postDetails.description.substring(0, 150) + (postDetails.description.length > 150 ? '...' : ''),
        note: calendarNote || 'Added from posts section'
      };
      
      await axios.post(
        'https://monilmeh.pythonanywhere.com/api/calendar',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setCalendarDialogOpen(false);
      setNotification({
        open: true,
        message: 'Added to your calendar!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error adding to calendar:', error);
      setNotification({
        open: true,
        message: 'Failed to add to calendar',
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col md:flex-row'>
        <Sidebar />
        <div className='flex flex-grow items-center justify-center h-screen'>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!postDetails) {
    return (
      <div className='flex flex-col md:flex-row'>
        <Sidebar />
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className="text-xl">Post not found or error loading details</div>
          <button 
            onClick={handleGoBack} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <Sidebar />
      <div className='flex flex-col flex-grow p-4 overflow-y-scroll h-[100vh]'>
        <div className='flex flex-row items-center'>
          <Button className='backButton' onClick={handleGoBack}>
            <img src={BackButton} alt='Back' className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
          <p className='ml-6 font-bold text-xl md:text-3xl'>Post Details</p>
        </div>
        <hr className='my-3 border-b-2 border-gray-300' />
        
        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
          <h3 className='text-2xl md:text-3xl font-bold mb-3'>{postDetails.title}</h3>
          <div className='flex flex-wrap gap-2'>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
              {new Date(postDetails.deadline).toLocaleDateString()}
            </span>
            {postDetails.tags && postDetails.tags.split(',').map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
        
        <hr className='my-3 border-b-2 border-gray-300' />
        
        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
          <h3 className='text-xl font-semibold mb-3'>Post Description</h3>
          <p className='text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap'>
            {postDetails.description}
          </p>
        </div>
        
        {postDetails.image && (
          <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
            <div className='flex justify-center items-center'>
              <img 
                src={postDetails.image} 
                alt={postDetails.title} 
                className='max-w-full h-auto object-contain rounded-lg shadow-md' 
                style={{maxHeight: '500px'}}
              />
            </div>
          </div>
        )}
        
        <div className='flex justify-center mb-4'>
          <motion.button
            className="inline-flex items-center px-6 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition-all shadow-md hover:shadow-lg"
            onClick={handleAddToCalendar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Add to Calendar
          </motion.button>
        </div>
        
        <hr className='my-4 border-b-2 border-gray-300' />
        
        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
            <div className='mb-4 sm:mb-0'>
              <p className='font-semibold text-gray-600'>Posted By:</p>
              <p className='font-medium'>{postDetails.posted_by || sapid}</p>
            </div>
            
            <div className='mb-4 sm:mb-0'>
              <p className='font-semibold text-gray-600'>Posted on:</p>
              <p>{new Date(postDetails.deadline).toLocaleDateString()}</p>
              <p>{new Date(postDetails.deadline).toLocaleTimeString()}</p>
            </div>
            
            <motion.button 
              onClick={handleContactAdmin}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              Contact Post Admin
            </motion.button>
          </div>
        </div>
      </div>
      
      <Dialog open={calendarDialogOpen} onClose={handleCloseCalendarDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add to Calendar</DialogTitle>
        <DialogContent>
          <div className="py-4 space-y-4">
            <p>Add "{postDetails.title}" to your calendar:</p>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={calendarDate}
                onChange={(newDate) => setCalendarDate(newDate)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
            
            <TextField
              label="Additional Notes"
              multiline
              rows={3}
              fullWidth
              value={calendarNote}
              onChange={(e) => setCalendarNote(e.target.value)}
              placeholder="Add any additional notes for this calendar event"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCalendarDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveToCalendar} 
            variant="contained" 
            color="primary"
          >
            Save to Calendar
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.type} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PostDetails;
