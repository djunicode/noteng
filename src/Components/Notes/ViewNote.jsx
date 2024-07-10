import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Home/Sidebar';
import BackButton from '../../assets/BackButton.png';
import { Button } from '@mui/material';
import axios from 'axios';
import './viewnote.css';

const ViewNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [noteDetails, setNoteDetails] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/notes/${noteId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNoteDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching note details:', error);
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
        } catch (error) {
            console.error('Error downloading note:', error);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<span key={i} role='img' aria-label={i < rating ? 'star-filled' : 'star-empty'}>{i < rating ? '⭐️' : '☆'}</span>);
        }
        return stars;
    };

    return (
        <div className='flex flex-col lg:flex-row'>
            <Sidebar />
            <div className='flex flex-col lg:ml-4 maincontent p-4'>
                <div className='flex flex-row items-center mb-4'>
                    <Button className='backButton' onClick={handleGoBack}>
                        <img src={BackButton} alt='Back' />
                    </Button>
                    <p className='ml-6 mt-2 flex items-center'>
                        <span className='font-bold heading custom-heading text-lg lg:text-2xl'>Notes</span>
                    </p>
                </div>
                <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                <div className='subtitle mb-4'>
                    <h2 className='text-xl lg:text-2xl'>{noteDetails && noteDetails.note_title}</h2>
                </div>
                <div className='head3 flex flex-col lg:flex-row mb-4'>
                    <h2 className='lg:px-4 text-left'>Subject: {noteDetails && noteDetails.subject}</h2>
                    <h2 className='lg:px-4 text-left'>Department: {noteDetails && noteDetails.department}</h2>
                </div>
                <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                <h3 className='notes-description text-lg lg:text-xl mb-4'>Notes Description</h3>
                <p className='job-descrip mb-4'>
                    {noteDetails && noteDetails.note_description}
                </p>
                <div className='noteimg mb-4'>
                    {noteDetails && noteDetails.document && (
                        noteDetails.document.endsWith('.pdf') ? (
                            <object data={noteDetails.document} type="application/pdf" width="100%" height="500px">
                                <p>Alternative text - include a link <a href={noteDetails.document}>to the PDF!</a></p>
                            </object>
                        ) : (
                            <img src={noteDetails.document} alt='Note Preview' className='note-preview w-full h-auto' />
                        )
                    )}
                </div>
                <div className='flex justify-center mb-4'>
                    <button type="button" className="badges inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={downloadNote}>
                        Download Now!!
                    </button>
                </div>
                <hr className='full-width-hr mb-4 border-b-2 border-gray' />
                <div className='flex flex-col lg:flex-row justify-center items-center mb-4'>
                    <div className='flex flex-col poster-details mb-4 lg:mb-0'>
                        <p>Uploaded By:</p>
                        <p>{noteDetails && noteDetails.user}</p>
                    </div>
                    <div className='flex flex-row items-center lg:ml-auto mb-4 lg:mb-0'>
                        <div className='flex flex-col post-datetime mr-2'>
                            <p>Rate :</p>
                        </div>
                        <div className='flex flex-row'>
                            {noteDetails && renderStars(noteDetails.average_rating)}
                        </div>
                    </div>
                    <button type="button" className="badges1 inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Contact Note Administrator
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
