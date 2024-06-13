import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ViewJob/${job.job_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(job.job_id);
  };

  return (
    <div className='border p-4 rounded-lg shadow bg-gray-300 md:w-full cursor-pointer' onClick={handleCardClick}>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500' onClick={handleDeleteClick} />
        </div>
        <h2 className='font-bold'>{job.company}</h2>
        <p className='text-sm md:text-[18px]'>{job.job_title}</p>
        <p className='mt-2 text-sm border-b-[1px] pb-3 border-custom-blue md:text-[16px]'>{job.description.substring(0, 60)}...</p>
        <div className='flex justify-between mt-2'>
          <div className='flex items-center'>
            <CalendarTodayIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{job.duration_in_months} months</p>
          </div>
          <div className='flex items-center'>
            <AccessTimeOutlinedIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{job.subtype}</p>
          </div>
          <div className='flex items-center'>
            <SmartphoneOutlinedIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue text-[9px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{job.mode}</p>
          </div>
          <div className='flex items-center'>
            <p className='text-custom-blue text-[9px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{new Date(job.upload_time).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
