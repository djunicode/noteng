import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';

function Videos() {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('https://monilmeh.pythonanywhere.com/api/videolinks/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, [token]);

  const handleDelete = (videoId) => {
    fetch(`https://monilmeh.pythonanywhere.com/api/videos/${videoId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          setVideos(videos.filter(video => video.video_id !== videoId));
        } else {
          console.error('Error deleting video');
        }
      })
      .catch(error => console.error('Error deleting video:', error));
  };

  return (
    <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
      {videos.map((video) => (
        <VideoCard key={video.video_id} video={video} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Videos;
