import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Home/Sidebar';
import BackButton from '../../assets/BackButton.png';
import { Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import './viewnote.css';
import { Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const ViewNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [noteDetails, setNoteDetails] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
    const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
    const [calendarDate, setCalendarDate] = useState(dayjs());
    const [calendarNote, setCalendarNote] = useState('');
    
    const token = localStorage.getItem('token');
    const sapid = localStorage.getItem('sapid');  // Get SAP ID from localStorage

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNoteDetails(response.data);
                
                // Try to get user's existing rating
                try {
                    const ratingResponse = await axios.get(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}/ratings/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (ratingResponse.data && ratingResponse.data.user_rating) {
                        setUserRating(ratingResponse.data.user_rating);
                    }
                } catch (ratingError) {
                    console.log('No existing rating found or error fetching rating');
                }
            } catch (error) {
                console.error('Error fetching note details:', error);
                setNotification({
                    open: true,
                    message: 'Failed to load note details',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        if (noteId) {
            fetchNoteDetails();
        }
    }, [noteId, token]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const downloadNote = async () => {
        try {
            const response = await axios.get(noteDetails.document, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${noteDetails.note_title}.pdf`);
            document.body.appendChild(link);
            link.click();
            
            setNotification({
                open: true,
                message: 'Download started!',
                type: 'success'
            });
        } catch (error) {
            console.error('Error downloading note:', error);
            setNotification({
                open: true,
                message: 'Failed to download note',
                type: 'error'
            });
        }
    };

    const handleRatingSubmit = async (rating) => {
        try {
            const method = userRating ? 'patch' : 'post';
            const response = await axios({
                method,
                url: `https://monilmeh.pythonanywhere.com/api/notes/${noteId}/ratings/`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    rating,
                    user: sapid  // Include the user's SAP ID in the request body
                }
            });
            
            setUserRating(rating);
            
            // Update note details to reflect new average rating
            const updatedNoteResponse = await axios.get(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNoteDetails(updatedNoteResponse.data);
            
            setNotification({
                open: true,
                message: userRating ? 'Rating updated!' : 'Rating submitted!',
                type: 'success'
            });
        } catch (error) {
            console.error('Error submitting rating:', error);
            setNotification({
                open: true,
                message: 'Failed to submit rating',
                type: 'error'
            });
        }
    };

    const renderRatingStars = (interactive = false) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div 
                        key={star}
                        className={`text-2xl cursor-${interactive ? 'pointer' : 'default'} transition-colors`}
                        onClick={() => interactive && handleRatingSubmit(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                    >
                        {interactive ? 
                            (star <= (hoverRating || userRating) ? "★" : "☆") : 
                            (star <= (noteDetails?.average_rating || 0) ? "★" : "☆")}
                    </div>
                ))}
            </div>
        );
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
                title: `Review Note: ${noteDetails.note_title}`,
                description: `Review the note "${noteDetails.note_title}" for ${noteDetails.subject} (${noteDetails.department})`,
                note: calendarNote || 'Added from notes section'
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
                <div className='flex items-center mb-4'>
                    <Button className='backButton' onClick={handleGoBack}>
                        <img src={BackButton} alt='Back' className="w-6 h-6 sm:w-8 sm:h-8" />
                    </Button>
                    <p className='ml-6 flex items-center'>
                        <span className='font-bold heading custom-heading text-lg lg:text-2xl'>Notes</span>
                    </p>
                </div>
                <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                {noteDetails && (
                    <div className='flex flex-col'>
                        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
                            <h2 className='text-xl lg:text-2xl font-bold text-center'>{noteDetails.note_title}</h2>
                            <div className='flex flex-col lg:flex-row justify-center items-center mt-3 gap-4'>
                                <div className='badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                                    Subject: {noteDetails.subject}
                                </div>
                                <div className='badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                                    Department: {noteDetails.department}
                                </div>
                            </div>
                        </div>
                        <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
                            <h3 className='text-lg lg:text-xl font-semibold mb-2'>Notes Description</h3>
                            <p className='text-gray-700 leading-relaxed'>
                                {noteDetails.note_description}
                            </p>
                        </div>
                        <div className='noteimg bg-white rounded-lg shadow-sm p-2 mb-4'>
                            {noteDetails.document && (
                                noteDetails.document.endsWith('.pdf') ? (
                                    <object data={noteDetails.document} type="application/pdf" width="100%" height="500px">
                                        <p>Unable to display PDF. <a href={noteDetails.document} target="_blank" rel="noreferrer">Open PDF</a></p>
                                    </object>
                                ) : (
                                    <img src={noteDetails.document} alt='Note Preview' className='note-preview w-full h-auto' />
                                )
                            )}
                        </div>
                        <div className='flex justify-center mb-4 gap-4'>
                            <motion.button 
                                type="button" 
                                className="download-button inline-flex items-center px-6 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all shadow-md hover:shadow-lg" 
                                onClick={downloadNote}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Now
                            </motion.button>
                            
                            <motion.button
                                type="button"
                                className="calendar-button inline-flex items-center px-6 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition-all shadow-md hover:shadow-lg"
                                onClick={handleAddToCalendar}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CalendarIcon className="h-5 w-5 mr-2" />
                                Add to Calendar
                            </motion.button>
                        </div>
                        <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                        <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
                            <div className='flex flex-col lg:flex-row justify-between items-center'>
                                <div className='flex flex-col mb-4 lg:mb-0'>
                                    <p className='font-semibold text-gray-700'>Uploaded By:</p>
                                    <p>{noteDetails.user}</p>
                                </div>
                                <div className='flex flex-col items-center mb-4 lg:mb-0'>
                                    <p className='font-semibold text-gray-700'>Average Rating:</p>
                                    <div className='flex items-center'>
                                        {renderRatingStars(false)}
                                        <span className='ml-2 font-bold'>{noteDetails.average_rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='font-semibold text-gray-700 mb-1'>Rate this note:</p>
                                    {renderRatingStars(true)}
                                </div>
                            </div>
                            <div className='flex justify-center mt-6'>
                                <button type="button" className="contact-button inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition-all shadow-sm hover:shadow-md">
                                    <MessageCircle size={20} className="mr-2" />
                                    Contact Note Administrator
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <Dialog open={calendarDialogOpen} onClose={handleCloseCalendarDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add to Calendar</DialogTitle>
                <DialogContent>
                    <div className="py-4 space-y-4">
                        <p>Add "{noteDetails?.note_title}" to your calendar:</p>
                        
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
};

export default ViewNote;
