import React from 'react';
import JobCard from './JobCard';

function Jobs({ jobs = [], onDelete, isAdmin }) {
  return (
    <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      {jobs.length === 0 ? (
        <h1 className='flex justify-center items-center self-center font-semibold text-xl md:text-2xl lg:text-3xl col-span-2'>
          No job openings found that match your criteria.
        </h1>
      ) : (
        jobs.map((job) => (
          <div className="hover:translate-y-[-5px] transition-all duration-300" key={job.job_id}>
            <JobCard 
              job={job} 
              onDelete={onDelete} 
              isAdmin={isAdmin} 
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;
