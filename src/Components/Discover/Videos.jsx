import React from 'react';
import VideoCard from './VideoCard';

function Videos({ videos = [], onDelete, isAdmin }) {
  // Reverse the videos array to show most recent first
  const sortedVideos = [...videos].reverse();
  
  return (
    <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      {sortedVideos.length === 0 ? (
        <h1 className='flex justify-center items-center self-center font-semibold text-xl md:text-2xl lg:text-3xl col-span-2'>
          No videos found that match your criteria.
        </h1>
      ) : (
        sortedVideos.map((video) => (
          <div className="transition-shadow duration-300" key={video.video_id}>
            <VideoCard 
              video={video} 
              onDelete={onDelete}
              isAdmin={isAdmin} 
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Videos;
