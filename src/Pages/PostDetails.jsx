import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button } from '@mui/material';
import '../styles/ViewJob.css';
import '../Components/NewPost/viewpost.css';
import PosDetailsImg from '../assets/postdetails.svg';
const PostDetails = () => {
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate.goBack();
    };

    return (
        <div className='flex flex-row'>
            <Sidebar />
            <>
                <div className='flex flex-col maincontent'>
                    <div className='flex flex-row'>
                        <Button className='backButton' onClick={handleGoBack}>
                            <img src={BackButton} alt='Back' />
                        </Button>
                        <p className='ml-6 mt-10 flex items-center'>
                            <span className='font-bold heading custom-heading'>Post Details</span>
                        </p>
                    </div>
                    <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
                    <div>
                        <h3 className='company-name'>Post Title</h3>
                    </div>
                    <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
                    <h3 className='company-description'>Post Description</h3>
                    <p className='job-descrip'>Hey tech enthusiasts and innovators! Are you ready to showcase your skills, collaborate with like-minded individuals, and create groundbreaking solutions to real-world challenges? your calendars for the Annual Tech Innovators Hackathon, where creativity meets technology..</p>
                    <div className='postimg'><img src={PosDetailsImg} alt="" /></div>
                    <hr className='full-width-hr mr-6 ml-6 mt-8 border-b-2 border-gray' />
                    <div className='flex flex-row'>
                        <div className='flex flex-col poster-details'>
                            <p>Posted By:</p>
                            <p>Ansh Shah</p>
                        </div>
                        <div className='flex flex-col post-datetime'>
                            <p>19th May 2024</p>
                            <p>16:22</p>
                        </div>
                        <div className='flex flex-grow contactbutton'>
                            <button type="submit" className="submit-button">
                                Contact Post Admin
                            </button>
                        </div>
                    </div>

                </div>
            </>
        </div>
    )
}

export default PostDetails;