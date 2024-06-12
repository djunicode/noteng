import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function VideoCard({ video, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ViewVideo/${video.video_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(video.video_id);
  };

  return (
    <div className='border p-4 rounded-lg shadow bg-gray-300 md:w-full cursor-pointer' onClick={handleCardClick}>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500' onClick={handleDeleteClick} />
        </div>
        <h2 className='font-bold'>{video.subject}</h2>
        <p className='text-sm md:text-[18px]'>{video.topics} - {video.sem} Semester</p>
        <div className='flex justify-between mt-2'>
          
          <iframe
            width="100%"
            height="200"
            src={video.links}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
