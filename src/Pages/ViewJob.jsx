import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Home/Sidebar';
import BackButton from '../assets/BackButton.png';
import { Button } from '@mui/material';
import '../styles/ViewJob.css';

const ViewJob = () => {
  const navigate = useNavigate();

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
      <div>
      <h3 className='company-name'>Company Name</h3>
      <p className='company-location'>U, 15, Bhaktivedanta Swami Rd, opp. Cooper Hospital, 
      Navpada, JVPD Scheme, Vile Parle, Mumbai, 
      Maharashtra 400056</p>
            <div>
                <button type="button" class="badges1 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Internship
                </button>
                <button type="button" class="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                3 Months
                </button>
                <button type="button" class="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Part Time
                </button>
                <button type="button" class="badges inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Online
                </button>
            </div>
        </div>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>
        <h3 className='company-name'>Job Description</h3>
        <p className='job-descrip'>We are seeking a highly motivated and enthusiastic Technology Intern to join our dynamic team.
        As an intern, you will have the opportunity to gain hands-on experience in various aspects of technology, including software development, 
        data analysis, and IT support. You will work closely with our experienced professionals on real-world projects and contribute to the success of our company.</p>

        <h3 className='company-name'>Job Requirements</h3>
        <p className='job-descrip'>
            <ul>
                <li>Currently enrolled in a Bachelor's or Master's degree program in Computer Science, Information Technology, or related field</li>
                <li>Strong understanding of programming languages such as Python, Java, or C++</li>
                <li>Knowledge of database management systems and data analysis tools</li>
                <li>Excellent problem-solving and analytical skills</li>
                <li>Ability to work independently and in a team environment</li>
                <li>Excellent communication and interpersonal skills</li>
                <li>Must be available to work a minimum of 20 hours per week</li>
            </ul>
        </p>
        <hr className='full-width-hr mr-6 ml-6 mt-8 border-b-2 border-gray'/>
        <div className='flex flex-row'>
  <div className='flex flex-col poster-details'>
    <p>Posted By:</p>
    <p>Monil Mehta</p>
  </div>
  <div className='flex flex-col post-datetime'>
    <p>24th March 2024</p>
    <p>15:18</p>
  </div>
  <div className='flex flex-grow contactbutton'>
    <button type="submit" className="submit-button">
      Contact Recruiter
    </button>
  </div>
</div>

    </div>
      </>
    </div>
  )
}

export default ViewJob
