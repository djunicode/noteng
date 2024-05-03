import React from 'react'
import Sidebar from '../Home/Sidebar';
import BackButton from '../../assets/BackButton.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import img from '../../assets/noteimg.png';
import './viewnote.css'

const ViewNote = () => {
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
                    <img src={BackButton} alt='Back'/>
                </Button>
            <p className='ml-6 mt-10 flex items-center'>
                <span className='font-bold heading custom-heading'>Notes</span>
            </p>
            </div>
            <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
            <div className='subtitle'>
                <h2>Notes Title</h2>
            </div>
            <div className='head3'>
                <h2 className='px-40'>Subject:</h2>
                <h2 className='px-40'>Department:</h2>
            </div>
            <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
            <h3 className='notes-description'>Notes Description</h3>
            <p className='job-descrip'>
            Access your study materials anytime, anywhere with our new Notes Upload feature! Simply upload your notes directly from your device and have them at your fingertips whenever you need them. Whether it's lecture slides, study guides, or handwritten notes, our platform makes it easy to keep everything organized and accessible. Say goodbye to the hassle of carrying around bulky notebooks and hello to seamless studying on the go
            </p>
            <div className='noteimg'>
                <img src={img} alt='Note' />
            </div>
            <div className='flex justify-center'>
            <button type="button" class="badges inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Download Now!!
            </button>
            </div>
            <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
            <div className='flex flex-row'>
    <div className='flex flex-col poster-details'>
        <p>Uploaded By:</p>
        <p>Monil Mehta</p>
    </div>
    <div className='flex flex-col post-datetime'>
        <p>24th March 2024</p>
        <p>15:18</p>
    </div>
    <div className='flex flex-row ml-60 items-center'> {/* Use ml-auto to push to the right */}
        <div className='flex flex-col post-datetime'>
            <p>Rate :</p>
        </div>
        <div className='flex flex-row ml-2'> {/* Add ml-2 for spacing */}
            {/* Simulated star rating */}
            <span role='img' aria-label='star'>⭐️</span>
            <span role='img' aria-label='star'>⭐️</span>
            <span role='img' aria-label='star'>⭐️</span>
            <span role='img' aria-label='star'>⭐️</span>
            <span role='img' aria-label='star'>⭐️</span>
        </div>
    </div>
    <button type="button" class="badges1 inline-flex items-center px-10 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Contact Note Administrator
    </button>
</div>

        </div>
        </>
    </div>
  )
}

export default ViewNote
