import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('https://monilmeh.pythonanywhere.com/api/videolinks/', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjY5MzkxLCJpYXQiOjE3MTgyNDc3OTEsImp0aSI6ImI1NDU5NTYyOThhMDQwNGY4ZTkzN2JkYWM0MjRiNjYyIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.3Tap7Xk9toixMMOwbnkgegqcg4vBZ-3WJvLlyoST97g' // Replace with your actual access token
      }
    })
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleDelete = (videoId) => {
    fetch(`https://monilmeh.pythonanywhere.com/api/videos/${videoId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjI5OTc4LCJpYXQiOjE3MTgyMDgzNzgsImp0aSI6IjM2ZTljNTE1MzgyNDRlNjNiMjlhN2IxZDk3NjkyOWM1IiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.taIPP2tzCiUFtYX8I20yWUaNfp8ESZvJa9auROp8-tc' // Replace with your actual access token
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
    <div className='m-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
      {videos.map((video) => (
        <VideoCard key={video.video_id} video={video} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Videos;
