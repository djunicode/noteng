import React, { useState } from 'react';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';
import '../styles/UploadVideo.css';

const ViewNote = () => {
    const navigate = useNavigate();

    const SUBJECT_CHOICES = [
        {value: 'ALL', label: 'All Subjects'},
        {value: 'CS', label: 'Computer Science'},
        {value: 'IT', label: 'Information Technology'},
        {value: 'AIML', label: 'AI & Machine Learning'},
        {value: 'AIDS', label: 'AI & Data Science'},
        {value: 'DS', label: 'Data Science'},
        {value: 'IOT', label: 'Internet of Things'},
        {value: 'EXTC', label: 'Electronics & Telecommunication'},
        {value: 'ME', label: 'Mechanical Engineering'},
    ];

    const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

    const [formData, setFormData] = useState({
        videoName: '',
        videoLink: '',
        subject: '',
        sem: '',
        topics: '',
        links: '',
        user: localStorage.getItem('sapid')
    });
    
    const [previewLink, setPreviewLink] = useState('');
    const token = localStorage.getItem('token');

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        
        // If videoLink changes, update the links field and preview
        if (id === 'links') {
            setPreviewLink(value);
        }
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://monilmeh.pythonanywhere.com/api/videolinks/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Video resource shared successfully!');
            navigate('/'); // Redirect to homepage after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to share video. Please try again.');
        }
    };

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    // Extract YouTube video ID from URL
    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;
        
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : null;
    };

    const embedUrl = getYoutubeEmbedUrl(previewLink);

    return (
        <div className='view-note-container'>
            <Sidebar />
            <div className='flex flex-col maincontent'>
                <div className='flex flex-row items-center'>
                    <Button className='backButton' onClick={handleGoBack}>
                        <img src={BackButton} alt='Back'/>
                    </Button>
                    <p className='ml-6 mt-10 flex items-center'>
                        <span className='font-bold heading custom-heading'>Share Video Resource</span>
                    </p>
                </div>
                <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
                
                <div className='subtitle'>
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                        <div className="w-full lg:w-1/2 p-4">
                            <form className="main-form" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <p className='text-[20px] mb-2'>Video Topic</p>
                                    <TextField
                                        fullWidth
                                        id="videoName"
                                        value={formData.videoName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Video Topic"
                                        variant="outlined"
                                        className="inputarea"
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className='text-[20px] mb-2'>Video Link</p>
                                    <TextField
                                        fullWidth
                                        id="links"
                                        value={formData.links}
                                        onChange={handleInputChange}
                                        placeholder="Enter YouTube Video Link"
                                        variant="outlined"
                                        className="inputarea"
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <p className='text-[20px] mb-2'>Subject</p>
                                    <FormControl fullWidth variant="outlined" className="inputarea">
                                        <Select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleSelectChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select Subject</MenuItem>
                                            {SUBJECT_CHOICES.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                
                                <div className="mb-6">
                                    <p className='text-[20px] mb-2'>Semester</p>
                                    <FormControl fullWidth variant="outlined" className="inputarea">
                                        <Select
                                            name="sem"
                                            value={formData.sem}
                                            onChange={handleSelectChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select Semester</MenuItem>
                                            {SEMESTER_OPTIONS.map(sem => (
                                                <MenuItem key={sem} value={sem}>
                                                    Semester {sem}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                
                                <div className="mb-6">
                                    <p className='text-[20px] mb-2'>Topics Covered</p>
                                    <TextField
                                        fullWidth
                                        id="topics"
                                        value={formData.topics}
                                        onChange={handleInputChange}
                                        placeholder="Enter Topics (comma separated)"
                                        variant="outlined"
                                        className="inputarea"
                                        multiline
                                        rows={2}
                                    />
                                </div>
                                
                                <button type="submit" className="submit-button">
                                    Post Video Link
                                </button>
                            </form>
                        </div>
                        
                        <div className="w-full lg:w-1/2 p-4">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <h3 className="text-xl font-semibold mb-4">Video Preview</h3>
                                {embedUrl ? (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={embedUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-64 md:h-80 rounded-lg"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-64 md:h-80 bg-gray-200 rounded-lg">
                                        <p className="text-gray-600">Enter a valid YouTube link to see preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
