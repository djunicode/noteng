import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Home/Sidebar';
import BackButton from '../../assets/BackButton.png';
import { Button } from '@mui/material';
import axios from 'axios'; // Import Axios
import './viewnote.css';

const ViewNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [noteDetails, setNoteDetails] = useState(null);
  
    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}/`, {
                    headers: {
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NzA5NTEwLCJpYXQiOjE3MTc2ODc5MTAsImp0aSI6IjdhZmY0OWY4OGU2ZTQ4NzNhY2ExNDc5MGFmM2VlMzU3IiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.2qEts4v2MSFYoVfC1Ge2Tv5xJyhI8cMB5UoesbsDz-0' 
                    }
                });
                console.log(response.data);
                setNoteDetails(response.data);
            } catch (error) {
                console.error('Error fetching note details:', error);
            }
        };

        if (noteId) {
            fetchNoteDetails();
        }
    }, [noteId]);
  
    const handleGoBack = (event) => {
        event.preventDefault();
        navigate.goBack();
    };

    const downloadNote = async () => {
        try {
            const response = await axios.get(noteDetails.document, {
                responseType: 'blob', // Set response type to blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${noteDetails.note_title}.pdf`); // Set the file name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading note:', error);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} role='img' aria-label='star'>⭐️</span>);
        }
        return stars;
    };

    return (
        <div className='flex flex-row'>
            <Sidebar />
            <div className='flex flex-col maincontent'>
                <div className='flex flex-row'>
                    <Button className='backButton' onClick={handleGoBack}>
                        <img src={BackButton} alt='Back'/>
                    </Button>
                    <p className='ml-6 mt-10 flex items-center'>
                        <span className='font-bold heading custom-heading'>Notes</span>
                    </p>
                </div>
                <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
                <div className='subtitle'>
                    <h2>{noteDetails && noteDetails.note_title}</h2>
                </div>
                <div className='head3'>
                    <h2 className='px-40'>Subject: {noteDetails && noteDetails.subject}</h2>
                    <h2 className='px-40'>Department: {noteDetails && noteDetails.department}</h2>
                </div>
                <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
                <h3 className='notes-description'>Notes Description</h3>
                <p className='job-descrip'>
                    {noteDetails && noteDetails.note_description}
                </p>
                <div className='noteimg'>
                    <img src={noteDetails && noteDetails.document} alt='Note Preview' className='note-preview'/>
                </div>
                <div className='flex justify-center'>
                    <button type="button" className="badges inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={downloadNote}>
                        Download Now!!
                    </button>
                </div>
                <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
                <div className='flex flex-row'>
                    <div className='flex flex-col poster-details'>
                        <p>Uploaded By:</p>
                        <p>{noteDetails && noteDetails.user}</p>
                    </div>
                    <div className='flex flex-row ml-auto items-center'>
                        <div className='flex flex-col post-datetime'>
                            <p>Rate :</p>
                        </div>
                        <div className='flex flex-row ml-2'>
                            {noteDetails && renderStars(noteDetails.rating)}
                        </div>
                    </div>
                    <button type="button" className="badges1 inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg
                    -blue-700 dark:focus:ring-blue-800">
                    Contact Note Administrator
                </button>
            </div>
        </div>
    </div>
);
};

export default ViewNote;
