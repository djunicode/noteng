import React, { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

function MyNotes({ notes = [], onDelete }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleNoteClick = (id) => {
    navigate(`/viewnote/${id}`);
  };

  // Helper function to safely get note properties with fallbacks
  const getNoteProperty = (note, props, defaultValue) => {
    if (!note) return defaultValue;
    for (const prop of props) {
      if (note[prop] !== undefined) return note[prop];
    }
    return defaultValue;
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

  return (
    <div className='flex flex-col'>
      <p className='flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold'>My Notes</span>
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
        
        {notes.length === 0 ? (
          <h1 className='flex justify-center items-center font-semibold text-xl md:text-2xl lg:text-3xl py-16'>
            You haven't created any notes yet.
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
            {notes.map((note, i) => {
              // Get properties with fallbacks - updated to match actual note structure
              const noteId = getNoteProperty(note, ['note_id'], i);
              const noteTitle = getNoteProperty(note, ['note_title'], 'Untitled Note');
              const noteDesc = getNoteProperty(note, ['note_description'], 'No description available');
              const noteSubject = getNoteProperty(note, ['subject'], '');
              const noteDepartment = getNoteProperty(note, ['department'], '');
              const noteRating = getNoteProperty(note, ['average_rating'], 0);
              
              return (
                <div
                  className='flex-shrink-0 w-full md:w-[300px] lg:w-[320px] scroll-snap-align-start'
                  style={{ scrollSnapAlign: 'start' }}
                  key={i}
                  onClick={() => handleNoteClick(noteId)}
                >
                  <div className='border p-4 rounded-lg bg-gray-100 w-full shadow hover:shadow-md transition-shadow cursor-pointer relative flex flex-col h-[180px]'>
                    <div className='absolute top-3 right-3 z-10'>
                      <DeleteIcon 
                        className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                        onClick={(e) => handleDelete(e, noteId)} 
                      />
                    </div>
                    
                    <div className='flex items-center mb-3'>
                      <DescriptionIcon className="text-blue-500 mr-2" />
                      <p className='font-bold text-lg line-clamp-1'>{noteTitle}</p>
                    </div>
                    
                    <div className='mb-4 flex-grow overflow-hidden'>
                      <p className='text-sm md:text-base line-clamp-2'>
                        {noteDesc}
                      </p>
                    </div>
                    
                    <div className='flex justify-between mt-auto'>
                      <div>
                        <p className='text-gray-700 font-medium'>{noteSubject}</p>
                        {noteDepartment && <p className='text-gray-600 text-sm'>{noteDepartment}</p>}
                      </div>
                      {noteRating > 0 && (
                        <p className='text-amber-500 font-medium'>★ {noteRating.toFixed(1)}</p>
                      )}
                      <p className='text-blue-600 font-medium'>View Note</p>
                    </div>
                  </div>
                </div>
              );
            })}
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

export default MyNotes;
