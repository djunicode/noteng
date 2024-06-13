import React, { useState } from 'react';
import './videos.css'; // Adjust the path according to your project structure

const MyVideos = ({ videos }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col mb-20">
      <p className="flex items-center justify-center md:justify-start md:ml-6">
        <span className="flex font-bold">My Videos</span>
      </p>
      <div className="ml-6 w-[72vw] border-b-2"></div>
      {videos.length > 0 ? (
        <div className="slider-container mt-4">
          <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {videos.map((video, index) => (
              <div key={index} className="slide p-4">
                <div className="p-4 bg-gray-300 rounded-lg shadow-lg">
                  <h2 className="font-bold text-lg">{video.subject}</h2>
                  <p className="text-sm text-gray-600 mt-2">{video.topics}...</p>
                  <div className="flex justify-center mt-4">
                    <iframe
                      width="100%"
                      height="200"
                      src={video.links}
                      title=''
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="slider-button" onClick={prevSlide}>Previous</button>
            <button className="slider-button" onClick={nextSlide}>Next</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No videos found. Are you an Admin ?? </p>
      )}
    </div>
  );
};

export default MyVideos;
