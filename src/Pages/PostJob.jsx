import React, { useState } from 'react';
import Sidebar from '../Components/Home/Sidebar';
import '../styles/PostJob.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [subtype, setsubtype] = useState(null);
  const [mode, setmode] = useState(null);
  const [message, setMessage] = useState(''); // Add this line
  const navigate = useNavigate();
  // Function to handle the selection of job type
  const handlesubtypeSelection = (type) => {
    setsubtype(type);
    setFormData({
      ...formData,
      subtype: type
    });
  };
  const JOB_TITLES = [
    'Software Engineer',
    'Data Analyst',
    'Web Developer',
    'UI/UX Designer',
    'Project Manager',
    'Business Analyst',
    'Backend Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'Machine Learning Engineer',
  ];

  // Function to handle the selection of job mode
  const handleModeSelection = (mode) => {
    setmode(mode);
    
    setFormData({
      ...formData,
      mode: mode,
      user: '60004220207'
    });
  };
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    contact_no: '',
    description: '',
    job_title: '',
    subtype: null,
    requirements: '',
    mode: null,
    duration_in_months: 3,
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
 

// Inside the PostJob component
const handleSubmit = (e) => {
  e.preventDefault();
  
  axios.post('https://monilmeh.pythonanywhere.com/api/jobboard/', formData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjY5MzkxLCJpYXQiOjE3MTgyNDc3OTEsImp0aSI6ImI1NDU5NTYyOThhMDQwNGY4ZTkzN2JkYWM0MjRiNjYyIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.3Tap7Xk9toixMMOwbnkgegqcg4vBZ-3WJvLlyoST97g'
     
    }
  })
  .then((response) => {
    console.log(response.data);
    setMessage('Job opportunity posted successfully!'); // Add this line
    navigate('/'); // Add this line
    // Handle success, e.g., show a success message to the user
  })
  .catch((error) => {
    console.error('Error posting job opportunity:', error);
    // Handle error, e.g., show an error message to the user
  });
};
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <>
      <div className='flex flex-col maincontent'>
        <p className='ml-6 mt-10 flex items-center'>
          <span className='font-bold heading custom-heading'>Post Job Opportunities</span>
        </p>
        <hr className='full-width-hr mr-6 ml-6 mt-2 border-b-2 border-gray'/>

        <form className="main-form m-16" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900 ">Company Name</label>
            <input type="text" value={formData.company} name="company"  onChange={handleInputChange} placeholder="Enter Company Name" id="company_name" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="company_location" className="block mb-2 text-sm font-medium text-gray-900 ">Company Location</label>
              <input type="text" value={formData.location} name="location"  onChange={handleInputChange} id="company_location" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Location" required />
            </div>
            <div>
              <label htmlFor="company_number" className="block mb-2 text-sm font-medium text-gray-900 ">Company Number</label>
              <input type="text" id="company_number" name="contact_no" value={formData.contact_no} onChange={handleInputChange} className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Contact Phone/Email/URL" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="job_description" className="block mb-2 text-sm font-medium text-gray-900 ">Job Description</label>
            <input type="text" value={formData.description} name="description" onChange={handleInputChange} placeholder="Enter Job Description" style={{height: '160px'}} id="job_description" className="inputarea block w-full p-4 text-black border border-gray-100 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
            <label htmlFor="job_title" className="block mb-2 text-sm font-medium text-gray-900 ">Job Title</label>
            <select value={formData.job_title} name="job_title" onChange={handleInputChange} id="job_title" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="">Select Job Title</option>
              {JOB_TITLES.map((title) => (
                <option value={title}>{title}</option>
              ))}
            </select>
            </div>
            <div>
            
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="job_requirements" className="block mb-2 text-sm font-medium text-gray-900 ">Job Requirements</label>
            <input type="text" id="job_requirements" name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder='Enter Job Requirements' className="inputarea block w-full p-4 text-black border border-gray-100 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{height: '160px'}}/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
          
          <div className="job-button-container flex flex-col">

          <label className="block mb-2 text-sm font-medium text-gray-900">Work Type</label>
          <div className='flex flex-row'>
            <button
              type="button"
              className={`job-button ${subtype === 'internship' ? 'selected' : ''}`}
              onClick={() => handlesubtypeSelection('internship')}
            >
              Full Time
            </button>
            <button
              type="button"
              className={`job-button ${subtype === 'Job' ? 'selected' : ''}`}
              onClick={() => handlesubtypeSelection('Job')}
            >
              Part Time
            </button>
          </div>
          </div>
          
          <div className="job-button-container flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">Work Mode</label>
          <div className='flex flex-row'>
          <button
          type="button"
          className={`job-button ${mode === 'Online' ? 'selected' : ''}`}
          onClick={() => handleModeSelection('Online')}
        >
          Online
        </button>
        <button
          type="button"
          className={`job-button ${mode === 'Offline' ? 'selected' : ''}`}
          onClick={() => handleModeSelection('Offline')}
        >
          Offline
        </button>
          </div>
          </div>
          </div>
          <div className='submit-btn'>
          <button type="submit" className="submit-button">
          Post Job Oppurtunity
          </button>
          </div>
        </form>
        {message && <p className='text-green-500 text-center'>{message}</p>} {/* Add this line */}  

      </div>
      </>
    </div>
  );
}

export default PostJob;
