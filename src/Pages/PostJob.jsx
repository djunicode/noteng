import React, { useState } from 'react';
import Sidebar from '../Components/Home/Sidebar';
import '../styles/PostJob.css';

const PostJob = () => {
  const [jobType, setJobType] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);

  // Function to handle the selection of job type
  const handleJobTypeSelection = (type) => {
    setJobType(type);
    setFormData({
      ...formData,
      jobType: type
    });
  };

  // Function to handle the selection of job location
  const handleJobLocationSelection = (location) => {
    setJobLocation(location);
    
    setFormData({
      ...formData,
      jobLocation: location
    });
  };
  const [formData, setFormData] = useState({
    companyName: '',
    companyLocation: '',
    companyNumber: '',
    jobDescription: '',
    jobTenure: '',
    jobType: null,
    jobRequirements: '',
    jobLocation: null
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform POST request with formData
    console.log(formData);
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

        <form className="main-form m-16">
          <div className="mb-6">
            <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900 ">Company Name</label>
            <input type="text" value={formData.companyName} onChange={handleInputChange} placeholder="Enter Company Name" id="company_name" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="company_location" className="block mb-2 text-sm font-medium text-gray-900 ">Company Location</label>
              <input type="text" value={formData.companyLocation} onChange={handleInputChange} id="company_location" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Location" required />
            </div>
            <div>
              <label htmlFor="company_number" className="block mb-2 text-sm font-medium text-gray-900 ">Company Number</label>
              <input type="text" id="company_number" value={formData.companyNumber} onChange={handleInputChange} className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Contact Phone/Email/URL" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="job_description" className="block mb-2 text-sm font-medium text-gray-900 ">Job Description</label>
            <input type="text" value={formData.jobDescription} onChange={handleInputChange} placeholder="Enter Job Description" style={{height: '160px'}} id="job_description" className="inputarea block w-full p-4 text-black border border-gray-100 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="job_tenure" className="block mb-2 text-sm font-medium text-gray-900 ">Job Tenure</label>
              <input type="text" value={formData.jobTenure} onChange={handleInputChange} id="job_tenure" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Job Tenure" required />
            </div>  
            <div>
              <label htmlFor="job_type" className="block mb-2 text-sm font-medium text-gray-900 ">Job Type</label>
              <input type="text" value={formData.jobType} onChange={handleInputChange} id="job_type" className="inputarea bg-white border border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Job Type" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="job_requirements" className="block mb-2 text-sm font-medium text-gray-900 ">Job Requirements</label>
            <input type="text" id="job_requirements" value={formData.jobRequirements} onChange={handleInputChange} placeholder='Enter Job Requirements' className="inputarea block w-full p-4 text-black border border-gray-100 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{height: '160px'}}/>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
          
          <div className="job-button-container flex flex-col">

          <label className="block mb-2 text-sm font-medium text-gray-900">Work Type</label>
          <div className='flex flex-row'>
            <button
              type="button"
              className={`job-button ${jobType === 'full-time' ? 'selected' : ''}`}
              onClick={() => handleJobTypeSelection('full-time')}
            >
              Full Time
            </button>
            <button
              type="button"
              className={`job-button ${jobType === 'part-time' ? 'selected' : ''}`}
              onClick={() => handleJobTypeSelection('part-time')}
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
              className={`job-button ${jobLocation === 'online' ? 'selected' : ''}`}
              onClick={() => handleJobLocationSelection('online')}
            >
              Online
            </button>
            <button
              type="button"
              className={`job-button ${jobLocation === 'offline' ? 'selected' : ''}`}
              onClick={() => handleJobLocationSelection('offline')}
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


      </div>
      </>
    </div>
  );
}

export default PostJob;
