import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

function Notes({ notes = [], onDelete, isAdmin }) {
  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 gap-5 m-10 md:grid-cols-4 md:gap-10'>
        {notes.length === 0 ? (
          <h1 className='flex justify-center items-center self-center font-semibold text-xl md:text-2xl lg:text-3xl col-span-4'>
            No notes found that match your criteria.
          </h1>
        ) : (
          notes.map((note) => (
            <div className='lg:flex md:flex justify-evenly flex-1 mr-1 ml-1 md:mr-2 block md:ml-2 lg:mr-4 lg:ml-2' key={note.note_id}>
              <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-300 md:w-full h-full'>
                <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                  <p className='font-bold'>{note.note_title}</p>
                  <div className='flex items-center'>
                    <StarIcon className="text-yellow-400 mr-1" style={{ width: '20px', height: '20px' }} />
                    <p>{note.average_rating && note.average_rating.toFixed(1)}</p>
                    {isAdmin && (
                      <DeleteIcon 
                        className='text-[#394dfd] cursor-pointer hover:text-red-500 ml-2' 
                        onClick={() => onDelete(note.note_id)} 
                      />
                    )}
                  </div>
                </div>
                
                <div className='flex-grow'>
                  <p className='text-sm md:text-base'>{note.note_description}</p>
                </div>
                
                <div className='flex justify-between mt-auto'>
                  <p className='text-custom-blue font-medium'>{note.department}</p>
                  <a href={note.document} target="_blank" rel="noopener noreferrer">
                    <PictureAsPdfOutlinedIcon className='text-custom-blue cursor-pointer hover:text-blue-700' style={{ width: '20px', height: '20px' }} />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;