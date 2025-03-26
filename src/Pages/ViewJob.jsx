import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import '../styles/ViewJob.css';
import { Calendar, MapPin, MessageCircle } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const ViewJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [calendarNote, setCalendarNote] = useState('');
  
  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setNotification({
          open: true,
          message: 'Failed to load job details',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId, token]);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleApply = () => {
    // If application_link exists, open it in a new tab
    if (jobDetails.application_link) {
      window.open(jobDetails.application_link, '_blank');
    } else {
      // If no link is available, perhaps trigger the contact recruiter action
      setNotification({
        open: true,
        message: 'No direct application link available. Please contact the recruiter.',
        type: 'info'
      });
    }
  };

  const handleContactRecruiter = () => {
    setNotification({
      open: true,
      message: 'Contact request sent to recruiter',
      type: 'success'
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  const handleAddToCalendar = () => {
    setCalendarNote('');
    setCalendarDate(dayjs());
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
        title: `Apply to ${jobDetails.company} - ${jobDetails.subtype}`,
        description: `${jobDetails.subtype} position at ${jobDetails.company} in ${jobDetails.location} (${jobDetails.mode})`,
        note: calendarNote || 'Added from job board'
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
      <div className='flex flex-col lg:flex-row h-screen'>
        <Sidebar />
        <div className='flex flex-grow items-center justify-center'>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1 p-4 overflow-y-auto'>
        <div className='flex flex-row items-center'>
          <Button className='h-12 sm:h-20' onClick={handleGoBack}>
            <img src={BackButton} alt='Back' className="w-12 h-12 sm:w-8 sm:h-8" />
          </Button>
          <p className='ml-6 flex items-center'>
            <span className='font-bold text-md lg:text-2xl custom-heading'>View Job Opportunity</span>
          </p>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
        {jobDetails && (
          <div className='p-4 bg-white rounded-lg shadow-sm mt-2'>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className='company-name text-xl sm:text-2xl'>{jobDetails.company}</h3>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <motion.button 
                  onClick={handleApply} 
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
                <motion.button
                  onClick={handleAddToCalendar}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar size={16} />
                  Reminder
                </motion.button>
              </div>
            </div>
            <p className='company-location text-sm sm:text-base flex items-center gap-1'>
              <MapPin size={16} className="text-gray-600" />
              {jobDetails.location}
            </p>
            <div className='flex flex-wrap gap-2 mt-3'>
              <span className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                {jobDetails.subtype}
              </span>
              <span className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                {jobDetails.duration_in_months} Months
              </span>
              <span className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                {jobDetails.mode}
              </span>
            </div>
          </div>
        )}
        <hr className='full-width-hr mr-6 ml-6 mt-4 border-b-2 border-gray' />
        {jobDetails && (
          <div className='p-4'>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Job Description</h3>
              <p className='text-sm sm:text-base leading-relaxed'>{jobDetails.description}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Job Requirements</h3>
              <ul className='list-disc pl-5 text-sm sm:text-base leading-relaxed'>
                {jobDetails.requirements.split(' - ').filter(req => req.trim()).map((requirement, index) => (
                  <li key={index} className="mb-1">{requirement}</li>
                ))}
              </ul>
            </div>
            
            <hr className='full-width-hr mr-6 ml-6 mt-6 mb-6 border-b-2 border-gray' />
            
            <div className='flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 mb-20 bg-white rounded-lg shadow-sm p-4'>
              <div className='flex flex-col mb-4 sm:mb-0'>
                <p className='font-medium text-gray-600'>Posted By:</p>
                <p className='font-semibold'>{jobDetails.user || "Monil Mehta"}</p>
              </div>
              
              <div className='flex flex-col mb-4 sm:mb-0 sm:text-right'>
                <p className='font-medium text-gray-600'>Posted on:</p>
                <p>{new Date(jobDetails.upload_time).toLocaleDateString()}</p>
                <p>{new Date(jobDetails.upload_time).toLocaleTimeString()}</p>
              </div>
              
              <div className='mt-4 sm:mt-0'>
                <motion.button 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={handleContactRecruiter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={20} />
                  Contact Recruiter
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={calendarDialogOpen} onClose={handleCloseCalendarDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Job Application Reminder</DialogTitle>
        <DialogContent>
          <div className="py-4 space-y-4">
            <p>Add a reminder to apply to {jobDetails?.company} for {jobDetails?.subtype} position:</p>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Reminder Date"
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
              placeholder="Add any additional notes for this reminder"
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
            Save Reminder
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

export default ViewJob;
