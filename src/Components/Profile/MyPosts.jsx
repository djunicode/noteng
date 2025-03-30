import React, { useState, useRef } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

function MyPosts({ posts = [], onDelete }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
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

  const postItems = posts.map((post) => ({
    heading1: post.title,
    id: post.post_id,
    body: post.description,
    icon: <FavoriteBorderOutlinedIcon className="text-blue-500" style={{ width: '20px', height: '20px' }} />,
    timelimit: post.likes,
    category: post.subtype,
    url: post.post_url,
    deadlines: post.deadline,
    image: post.image,
    uploadDate: post.upload_time,
  }));

  return (
    <div className='flex flex-col'>
      <p className='flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold'>My Created Posts</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      
      <div className="relative mt-4 px-4">
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            onClick={() => scroll('left')}
          >
            <ArrowBackIosNewIcon style={{ fontSize: 20 }} className="text-gray-700" />
          </button>
        )}
        
        {postItems.length === 0 ? (
          <h1 className='flex justify-center items-center font-semibold text-xl md:text-2xl lg:text-3xl py-16'>
            You haven't created any posts yet.
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
            {postItems.map((data, i) => (
              <div
                className='flex-shrink-0 w-full md:w-[400px] lg:w-[450px] scroll-snap-align-start'
                style={{ scrollSnapAlign: 'start' }}
                key={i}
                onClick={() => handleCardClick(data.id)}
              >
                <div className='border p-4 rounded-lg bg-gray-300 w-full shadow hover:shadow-md transition-shadow cursor-pointer relative flex flex-col h-[550px]'>
                  <div className='absolute top-3 right-3 z-10'>
                    <DeleteIcon 
                      className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                      onClick={(e) => handleDelete(e, data.id)} 
                    />
                  </div>
                  
                  <div className='flex justify-between items-center mb-3'>
                    <p className='font-bold text-lg line-clamp-1'>{data.heading1}</p>
                    {data.uploadDate && (
                      <span className='text-xs text-gray-600'>
                        {new Date(data.uploadDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <div className='h-64 mb-4 flex-shrink-0'>
                    <img 
                      src={data.image} 
                      alt={data.heading1} 
                      className='w-full h-full object-cover rounded-lg transition-transform duration-300' 
                    />
                  </div>
                  
                  <div className='mb-4 flex-grow overflow-hidden'>
                    <p className='text-sm md:text-base pb-3 line-clamp-4'>{data.body}</p>
                  </div>
                  
                  {data.url && (
                    <p className='font-medium text-base mb-3 text-gray-700 overflow-hidden text-ellipsis hover:text-[#394dfd] line-clamp-1'>{data.url}</p>
                  )}
                  
                  <div className='flex justify-between mt-auto'>
                    <div className='flex items-center'>
                      {data.icon}
                      <p className='text-gray-700 font-medium ml-1'>{data.timelimit}</p>
                    </div>
                    <p className='text-gray-700 font-medium'>{data.category}</p>
                    {data.deadlines && (
                      <p className='text-gray-700 font-medium'>{data.deadlines}</p>
                    )}
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
}

export default MyPosts;