import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

function JobCard({ job, onDelete, isAdmin }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ViewJob/${job.job_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(job.job_id);
  };

  return (
    <div className='border p-4 rounded-lg shadow bg-gray-300 w-full cursor-pointer hover:shadow-lg transition-shadow' onClick={handleCardClick}>
      <div className='relative'>
        {isAdmin && (
          <div className='absolute top-2 right-2 z-10'>
            <DeleteIcon 
              className='text-[#394dfd] cursor-pointer hover:text-red-500' 
              onClick={handleDeleteClick} 
            />
          </div>
        )}
        
        <div className="mb-4">
          <h2 className='font-bold text-lg'>{job.company}</h2>
          <p className='text-md md:text-lg font-medium text-gray-700'>{job.job_title}</p>
        </div>
        
        <div className="mb-4">
          <p className='mt-2 text-sm border-b-[1px] pb-3 border-custom-blue md:text-[16px]'>
            {job.description.substring(0, 120)}...
          </p>
        </div>
        
        <div className='flex flex-wrap justify-between gap-2 mt-4'>
          <div className='flex items-center'>
            <CalendarTodayIcon className='text-custom-blue mr-1' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-sm font-medium'>{job.duration_in_months} months</p>
          </div>
          <div className='flex items-center'>
            <AccessTimeOutlinedIcon className='text-custom-blue mr-1' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-sm font-medium'>{job.subtype}</p>
          </div>
          <div className='flex items-center'>
            <SmartphoneOutlinedIcon className='text-custom-blue mr-1' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-sm font-medium'>{job.mode}</p>
          </div>
          <div className='flex items-center'>
            <p className='text-custom-blue text-sm font-medium'>{new Date(job.upload_time).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
