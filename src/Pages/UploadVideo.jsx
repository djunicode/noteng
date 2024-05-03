import React, { useState } from 'react';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../styles/UploadVideo.css';

const ViewNote = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        videoName: '',
        videoLink: ''
    });

    
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handler for form submission (if needed)
    const handleSubmit = (event) => {
        event.preventDefault();
        
    };

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate.goBack();
    };

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
                    <form className="main-form m-16" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="video_topic" className="block mb-2 text-sm font-medium text-gray-900">Video Topic</label>
                            <input
                                type="text"
                                value={formData.videoName}
                                onChange={handleInputChange}
                                placeholder="Enter Video Topic"
                                id="videoName"
                                className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="video_link" className="block mb-2 text-sm font-medium text-gray-900">Video Link</label>
                            <input
                                type="text"
                                value={formData.videoLink}
                                onChange={handleInputChange}
                                placeholder="Enter Video Link"
                                id="videoLink"
                                className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <button type="submit" className="submit-button">
                        Post Video Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
