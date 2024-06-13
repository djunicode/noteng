import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('https://monilmeh.pythonanywhere.com/api/jobboard/', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjI5OTc4LCJpYXQiOjE3MTgyMDgzNzgsImp0aSI6IjM2ZTljNTE1MzgyNDRlNjNiMjlhN2IxZDk3NjkyOWM1IiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.taIPP2tzCiUFtYX8I20yWUaNfp8ESZvJa9auROp8-tc' // Replace with your actual access token
      }
    })
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleDelete = (jobId) => {
    fetch(`https://monilmeh.pythonanywhere.com/api/jobboard/${jobId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjI5OTc4LCJpYXQiOjE3MTgyMDgzNzgsImp0aSI6IjM2ZTljNTE1MzgyNDRlNjNiMjlhN2IxZDk3NjkyOWM1IiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.taIPP2tzCiUFtYX8I20yWUaNfp8ESZvJa9auROp8-tc' // Replace with your actual access token
      }
    })
      .then(response => {
        if (response.ok) {
          setJobs(jobs.filter(job => job.job_id !== jobId));
        } else {
          console.error('Error deleting job');
        }
      })
      .catch(error => console.error('Error deleting job:', error));
  };

  return (
    <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
      {jobs.map((job) => (
        <JobCard key={job.job_id} job={job} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Jobs;
