import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Home/Sidebar';
import { Snackbar, Alert, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Trash2, Edit, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Calendar = () => {
  const [calendarItems, setCalendarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: dayjs(),
    note: ''
  });
  
  const token = localStorage.getItem('token');
  const sapid = localStorage.getItem('sapid');
  
  useEffect(() => {
    fetchCalendarItems();
  }, []);
  
  const fetchCalendarItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://monilmeh.pythonanywhere.com/api/calendar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCalendarItems(response.data);
    } catch (error) {
      console.error('Error fetching calendar items:', error);
      setNotification({
        open: true,
        message: 'Failed to load calendar events',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  const handleOpenDialog = (item = null) => {
    if (item) {
      // Edit existing item
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        date: dayjs(item.date),
        note: item.note || ''
      });
    } else {
      // Create new item
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        date: dayjs(),
        note: ''
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date
    });
  };
  
  const handleSubmit = async () => {
    try {
      const payload = {
        user: sapid,
        date: formData.date.format('YYYY-MM-DD'),
        title: formData.title,
        description: formData.description,
        note: formData.note || 'Added manually'
      };
      
      let response;
      if (editingItem) {
        // Update existing item
        response = await axios.patch(
          `https://monilmeh.pythonanywhere.com/api/calendar/${editingItem.calendar_id}/`,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        setNotification({
          open: true,
          message: 'Calendar event updated successfully!',
          type: 'success'
        });
      } else {
        // Create new item
        response = await axios.post(
          'https://monilmeh.pythonanywhere.com/api/calendar',
          payload,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        setNotification({
          open: true,
          message: 'Calendar event added successfully!',
          type: 'success'
        });
      }
      
      handleCloseDialog();
      fetchCalendarItems();
    } catch (error) {
      console.error('Error saving calendar item:', error);
      setNotification({
        open: true,
        message: 'Failed to save calendar event',
        type: 'error'
      });
    }
  };
  
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this calendar event?')) {
      return;
    }
    
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/calendar/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Calendar event deleted successfully!',
        type: 'success'
      });
      
      fetchCalendarItems();
    } catch (error) {
      console.error('Error deleting calendar item:', error);
      setNotification({
        open: true,
        message: 'Failed to delete calendar event',
        type: 'error'
      });
    }
  };
  
  // Group calendar items by month
  const groupedItems = calendarItems.reduce((groups, item) => {
    const date = dayjs(item.date);
    const monthYear = date.format('MMMM YYYY');
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(item);
    return groups;
  }, {});
  
  // Add this animation logic for month change
  const monthChangeAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
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
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-grow p-4 overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold'>Your Calendar</h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors'
            onClick={() => handleOpenDialog()}
          >
            <Plus size={20} />
            Add Event
          </motion.button>
        </div>
        
        <div className='mb-8'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Jump to date"
              value={currentDate}
              onChange={(newDate) => setCurrentDate(newDate)}
              slotProps={{ textField: { fullWidth: true, className: "bg-white rounded-lg" } }}
              className="bg-white rounded-lg"
            />
          </LocalizationProvider>
        </div>
        
        {Object.keys(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([monthYear, items]) => (
            <motion.div 
              key={monthYear} 
              className='mb-8'
              initial="hidden" 
              animate="visible"
              variants={monthChangeAnimation}
            >
              <h2 className='text-xl font-semibold mb-4'>{monthYear}</h2>
              <motion.div className='space-y-4' variants={monthChangeAnimation}>
                {items.sort((a, b) => new Date(a.date) - new Date(b.date)).map((item) => (
                  <motion.div 
                    key={item.calendar_id} 
                    className='bg-white rounded-lg shadow-md p-4'
                    variants={monthChangeAnimation}
                    whileHover={{ scale: 1.01, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <h3 className='text-lg font-semibold'>{item.title}</h3>
                        <p className='text-sm text-gray-500'>{dayjs(item.date).format('dddd, MMMM D, YYYY')}</p>
                      </div>
                      <div className='flex gap-2'>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='p-1 text-blue-600 hover:bg-blue-100 rounded-full'
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='p-1 text-red-600 hover:bg-red-100 rounded-full'
                          onClick={() => handleDeleteItem(item.calendar_id)}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                    <p className='text-gray-700'>{item.description}</p>
                    {item.note && (
                      <p className='text-xs text-gray-500 mt-2 italic'>Note: {item.note}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg'>
            <p className='text-xl text-gray-500 mb-4'>No calendar events found</p>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleOpenDialog()}
              startIcon={<Plus size={18} />}
            >
              Add Your First Event
            </Button>
          </div>
        )}
      </div>
      
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Calendar Event' : 'Add New Calendar Event'}</DialogTitle>
        <DialogContent>
          <div className='space-y-4 py-4'>
            <TextField
              name="title"
              label="Event Title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={formData.date}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
            
            <TextField
              name="description"
              label="Event Description"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={handleInputChange}
            />
            
            <TextField
              name="note"
              label="Additional Note"
              fullWidth
              value={formData.note}
              onChange={handleInputChange}
              helperText="Optional note about this event"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!formData.title}
          >
            {editingItem ? 'Update' : 'Add'} Event
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
};

export default Calendar;
