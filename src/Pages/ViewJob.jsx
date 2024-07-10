import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button } from '@mui/material';
import axios from 'axios';
import '../styles/ViewJob.css';

const ViewJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
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

  return (
    <div className='flex flex-col md:flex-row'>
      <Sidebar />
      <div className='flex flex-col flex-grow overflow-y-scroll h-screen p-4'>
        <div className='flex flex-col sm:flex-row items-center'>
          <Button className='backButton' onClick={handleGoBack}>
            <img src={BackButton} alt='Back' />
          </Button>
          <p className='ml-6 mt-10 sm:mt-0 flex items-center'>
            <span className='font-bold text-xl sm:text-2xl custom-heading'>View Job Opportunities</span>
          </p>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
        {jobDetails && (
          <div className='p-4'>
            <h3 className='company-name text-xl sm:text-2xl'>{jobDetails.company}</h3>
            <p className='company-location text-sm sm:text-base'>{jobDetails.location}</p>
            <div className='flex flex-wrap gap-2 mt-2'>
              <button type="button" className="badges1 inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {jobDetails.subtype}
              </button>
              <button type="button" className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {jobDetails.duration_in_months} Months
              </button>
              <button type="button" className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {jobDetails.mode}
              </button>
              <button type="button" className="badges inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {jobDetails.location}
              </button>
            </div>
          </div>
        )}
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray' />
        {jobDetails && (
          <div className='p-4'>
            <h3 className='company-name text-xl sm:text-2xl'>Job Description</h3>
            <p className='job-descrip text-sm sm:text-base'>{jobDetails.description}</p>
            <h3 className='company-name text-xl sm:text-2xl mt-4'>Job Requirements</h3>
            <p className='job-descrip text-sm sm:text-base'>
              <ul className='list-disc pl-5'>
                {jobDetails.requirements.split(' - ').map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </p>
            <hr className='full-width-hr mr-6 ml-6 mt-8 border-b-2 border-gray' />
            <div className='flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 mb-20'>
              <div className='flex flex-col'>
                <p className='font-medium'>Posted By:</p>
                <p className='font-light'>Monil Mehta</p>
              </div>
              <div className='flex flex-col sm:text-right'>
                <p>{new Date(jobDetails.upload_time).toLocaleDateString()}</p>
                <p>{new Date(jobDetails.upload_time).toLocaleTimeString()}</p>
              </div>
              <div className='mt-4 sm:mt-0 sm:ml-4'>
                <button type="submit" className="submit-button inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Contact Recruiter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewJob;
