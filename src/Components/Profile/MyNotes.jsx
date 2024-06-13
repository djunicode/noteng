import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css'; // Adjust the path according to your project structure

const MyNotes = ({ notes }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNoteClick = (noteId) => {
    navigate(`/viewnote/${noteId}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === notes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? notes.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col">
      <p className="flex items-center justify-center md:justify-start md:ml-6">
        <span className="flex font-bold">My Notes</span>
      </p>
      <div className="ml-6 w-[78vw] border-b-2"></div>
      {notes.length > 0 ? (
        <div className="slider-container mt-4">
          <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {notes.map((note, index) => (
              <div
                key={index}
                className="slide p-4 cursor-pointer"
                onClick={() => handleNoteClick(note.note_id)}
              >
                <div className="p-4 bg-gray-300 rounded-lg shadow-lg">
                  <h2 className="font-bold text-lg">{note.note_title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{note.note_description.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-gray-700">{note.department}</p>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-bold">Rating:</span>
                      <p className="text-gray-700 ml-2">{note.average_rating}</p>
                    </div>
                  </div>
                  {note.document.endsWith('.pdf') ? (
                    <div className="mt-4">
                      <object data={note.document} type="application/pdf" width="100%" height="200px">
                        <p>Alternative text - include a link <a href={note.document}>to the PDF!</a></p>
                      </object>
                    </div>
                  ) : (
                    <img src={note.document} alt={note.note_title} className="mt-4 w-full h-40 object-cover rounded-lg" />
                  )}
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
        <p className="text-center text-gray-500 mt-4">No notes found.</p>
      )}
    </div>
  );
};

export default MyNotes;
