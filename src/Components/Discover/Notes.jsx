import React from 'react';
import { Star, FileText, Tag, Building, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Notes({ notes = [], onDelete, isAdmin }) {
  const navigate = useNavigate();

  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation(); // Prevent any parent click event
    onDelete(noteId);
  };

  const handleCardClick = (noteId) => {
    navigate(`/viewnote/${noteId}`);
  };

  return (
    <div className='p-4 md:p-6'>
      {notes.length === 0 ? (
        <div className='flex justify-center items-center py-10'>
          <h1 className='font-semibold text-xl md:text-2xl lg:text-3xl text-gray-700'>
            No notes found that match your criteria.
          </h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {notes.map((note) => (
            <div 
              key={note.note_id}
              onClick={() => handleCardClick(note.note_id)}
              className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer min-h-[360px] flex flex-col'
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <div className="flex items-center max-w-[70%]">
                  <span className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                    note.subject === 'CS' ? 'bg-blue-500' :
                    note.subject === 'IT' ? 'bg-green-500' :
                    note.subject === 'AIML' ? 'bg-purple-500' :
                    note.subject === 'AIDS' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></span>
                  <h3 className='font-bold text-lg text-gray-800 truncate'>{note.note_title}</h3>
                </div>
                
                <div className='flex items-center gap-2'>
                  {note.average_rating && (
                    <div className='flex items-center bg-yellow-100 px-2 py-1 rounded'>
                      <Star className="text-yellow-400" size={16} />
                      <span className='ml-1 text-sm font-medium'>{note.average_rating.toFixed(1)}</span>
                    </div>
                  )}
                  {isAdmin && (
                    <button 
                      className='p-1 rounded-full hover:bg-gray-200 transition-colors'
                      onClick={(e) => handleDeleteClick(e, note.note_id)}
                    >
                      <Trash2 
                        size={18}
                        className='text-gray-400 hover:text-red-500' 
                      />
                    </button>
                  )}
                </div>
              </div>
              
              <div className='p-4 flex-1 flex flex-col'>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs">
                    <Tag size={12} className="mr-1 text-custom-blue" />
                    <span>{note.subject}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    <Building size={12} className="mr-1 text-gray-500" />
                    <span>{note.department}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className='text-gray-700 mb-4 line-clamp-4'>{note.note_description}</p>
                </div>
                
                <div className='mt-auto pt-4 border-t border-gray-100'>
                  <a 
                    href={note.document} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className='text-custom-blue hover:text-blue-700 flex items-center hover:underline'
                  >
                    <FileText size={16} className='mr-1' />
                    <span>View PDF</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;