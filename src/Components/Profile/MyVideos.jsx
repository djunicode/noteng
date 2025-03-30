import React, { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import './videos.css'; // Adjust the path according to your project structure

const MyVideos = ({ videos = [], onDelete }) => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  videos= videos.reverse(); // Reverse the videos array for display

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of visible width
      
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Update arrows visibility after scroll animation
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      }, 300);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  // Helper function to extract video ID from YouTube URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // If it's already an embed URL, return as is
    if (url.includes('embed')) return url;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return match && match[2].length === 11 
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="flex flex-col mb-20">
      <p className="flex items-center justify-center md:justify-start md:ml-6">
        <span className="flex font-bold">My Videos</span>
      </p>
      <div className="ml-6 w-[78vw] border-b-2"></div>
      
      <div className="relative mt-4 px-4">
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            onClick={() => scroll('left')}
          >
            <ArrowBackIosNewIcon style={{ fontSize: 20 }} className="text-gray-700" />
          </button>
        )}
        
        {videos.length === 0 ? (
          <h1 className='flex justify-center items-center font-semibold text-xl md:text-2xl lg:text-3xl py-16'>
            No videos found. Are you an Admin?
          </h1>
        ) : (
          <div 
            ref={carouselRef} 
            className="flex overflow-x-auto gap-6 py-8 px-2 scrollbar-hide" 
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onScroll={handleScroll}
          >
            {videos.map((video, index) => (
              <div
                className='flex-shrink-0 w-full md:w-[400px] lg:w-[450px] scroll-snap-align-start'
                style={{ scrollSnapAlign: 'start' }}
                key={index}
              >
                <div className='border p-4 rounded-lg bg-gray-100 w-full shadow hover:shadow-lg transition-shadow flex flex-col h-[350px]'>
                  {onDelete && (
                    <div className='absolute top-3 right-3 z-10'>
                      <DeleteIcon 
                        className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                        onClick={(e) => handleDelete(e, video.id || index)} 
                      />
                    </div>
                  )}
                  
                  <div className='flex items-center mb-3'>
                    <VideoLibraryIcon className="text-red-500 mr-2" />
                    <p className='font-bold text-lg line-clamp-1'>{video.subject || 'Untitled Video'}</p>
                  </div>
                  
                  <div className='mb-3 overflow-hidden'>
                    <p className='text-sm text-gray-700 line-clamp-2'>{video.topics || 'No description available'}</p>
                  </div>
                  
                  <div className='flex-grow w-full rounded-lg overflow-hidden mb-3 shadow-inner'>
                    <iframe
                      className="w-full h-full"
                      src={getYoutubeEmbedUrl(video.links)}
                      title={video.subject || 'Video'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className='mt-auto'>
                    <p className='text-gray-600 text-sm'>{video.category || video.department || ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            onClick={() => scroll('right')}
          >
            <ArrowForwardIosIcon style={{ fontSize: 20 }} className="text-gray-700" />
          </button>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MyVideos;
