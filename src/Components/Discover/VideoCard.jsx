import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function VideoCard({ video, onDelete, isAdmin }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ViewVideo/${video.video_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(video.video_id);
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
        
        <div className='mb-4'>
          <h2 className='font-bold text-lg'>{video.subject}</h2>
          <p className='text-sm md:text-base'>{video.topics} - {video.sem} Semester</p>
        </div>
        
        <div className='w-full mt-2'>
          <iframe
            width="100%"
            height="200"
            src={video.links}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>
        
        <div className='flex justify-between mt-3'>
          <p className='text-custom-blue text-sm font-medium'>{video.subject}</p>
          <p className='text-custom-blue text-sm font-medium'>Semester {video.sem}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
