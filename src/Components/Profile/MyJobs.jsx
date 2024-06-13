import React from 'react';
import JobCard from './JobCard';

function MyJobs({ jobs, onDelete }) {
  return (
    <div className='flex flex-col'>
      <p className='md:ml-6 md:justify-start mt-10 flex justify-center items-center'>
        <span className='font-bold'>My Posted Job Opportunities</span>
      </p>
      <div className='ml-6 border-b-2'></div>
      <div className='flex overflow-x-scroll p-4 space-x-4'>
        {jobs.map((job, i) => (
          <JobCard key={i} job={job} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default MyJobs;
