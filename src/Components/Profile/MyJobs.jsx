import React from 'react';
import JobCard from './JobCard';
import './jobs.css';

function MyJobs({ jobs, onDelete }) {
  // Create a reversed copy of the jobs array
  const reversedJobs = [...jobs].reverse();
  
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center mt-10 mb-4 px-6'>
        <h2 className='text-xl font-bold text-gray-800'>My Posted Job Opportunities</h2>
        {jobs.length > 0 && <span className='text-sm text-gray-500'>Scroll to see more →</span>}
      </div>
      <div className='mx-6 border-b-2 mb-4'></div>

      {jobs.length === 0 ? (
        <div className='flex justify-center items-center py-12 bg-gray-50 rounded-lg mx-6'>
          <p className='text-gray-500'>You haven't posted any jobs yet.</p>
        </div>
      ) : (
        <div className='job-scroll-container mx-auto'>
          <div className='job-cards-wrapper'>
            {reversedJobs.map((job, i) => (
              <div key={i} className='job-card-container'>
                <JobCard job={job} onDelete={onDelete} isAdmin={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
