import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button } from '@mui/material';
import axios from 'axios'; // Import Axios
import '../styles/ViewJob.css';

const ViewJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3ODQ4NDcyLCJpYXQiOjE3MTc4MjY4NzIsImp0aSI6IjZmNTI5ZGEzM2QwZjQzNDM4NzZhM2UyNzlhMTEyZjdmIiwidXNlcl9pZCI6IjYwMDA0MjIwMTgzIn0.1IRs_bt9_9KFtwpbwlhDd9YG-3bYFcKrU2H1Nw__HcA' 
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
  }, [jobId]);

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate.goBack();
  };

  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <>
        <div className='flex flex-col maincontent'>
          <div className='flex flex-row'>
            <Button className='backButton' onClick={handleGoBack}>
              <img src={BackButton} alt='Back'/>
            </Button>
            <p className='ml-6 mt-10 flex items-center'>
              <span className='font-bold heading custom-heading'>Post Job Opportunities</span>
            </p>
          </div>
          <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
          {jobDetails && (
            <div>
              <h3 className='company-name'>{jobDetails.company}</h3>
              <p className='company-location'>{jobDetails.location}</p>
              <div>
                <button type="button" className="badges1 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {jobDetails.subtype}
                </button>
                <button type="button" className="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {jobDetails.duration_in_months} Months
                </button>
                <button type="button" className="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {jobDetails.mode}
                </button>
                <button type="button" className="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {jobDetails.location}
                </button>
              </div>
            </div>
          )}
          <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
          {jobDetails && (
            <div>
              <h3 className='company-name'>Job Description</h3>
              <p className='job-descrip'>{jobDetails.description}</p>
              <h3 className='company-name'>Job Requirements</h3>
              <p className='job-descrip'>
                <ul>
                  {jobDetails.requirements.split(' - ').map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </p>
              <hr className='full-width-hr mr-6 ml-6 mt-8 border-b-2 border-gray'/>
              <div className='flex flex-row'>
                <div className='flex flex-col poster-details'>
                  <p>Posted By:</p>
                  <p>Monil Mehta</p>
                </div>
                <div className='flex flex-col post-datetime'>
                  <p>{new Date(jobDetails.upload_time).toLocaleDateString()}</p>
                  <p>{new Date(jobDetails.upload_time).toLocaleTimeString()}</p>
                </div>
                <div className='flex flex-grow contactbutton'>
                  <button type="submit" className="submit-button">
                    Contact Recruiter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
}

export default ViewJob;
