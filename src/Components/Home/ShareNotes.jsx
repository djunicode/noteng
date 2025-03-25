import React, { useEffect, useState } from 'react';
import { Star, FileText, BookOpen, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

function ShareNotes() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com/api/notes/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.toReversed().map((item) => ({
          id: item.note_id,
          heading1: item.note_title,
          body: item.note_description,
          stars: item.average_rating,
          department: item.department,
          document: item.document,
        }));

        setCardData(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
     
      setCardData((prevData) => prevData.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleViewMore = () => {
    navigate('/DiscoverPage', { state: { activeTab: 'Notes' } });
  };

  const handleCardClick = (id) => {
    navigate(`/viewnote/${id}`);
  };

  return (
    <section className='bg-white rounded-xl shadow-sm p-6 mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center'>
          <BookOpen className="mr-2 text-custom-blue" size={24} />
          Share Notes
        </h2>
        <button 
          onClick={handleViewMore}
          className='text-custom-blue hover:text-blue-700 font-medium flex items-center'
        >
          See More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='bg-gray-100 rounded-lg p-4'>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" height={20} width="60%" />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {cardData.map((data) => (
            <div 
              key={data.id} 
              onClick={() => handleCardClick(data.id)}
              className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer'
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <h3 className='font-bold text-lg text-gray-800 line-clamp-1'>{data.heading1}</h3>
                <div className='flex items-center'>
                  <div className='flex items-center mr-2 bg-yellow-100 px-2 py-1 rounded'>
                    <Star className="text-yellow-400" size={16} />
                    <span className='ml-1 text-sm font-medium'>{data.stars ? data.stars.toFixed(1) : 'N/A'}</span>
                  </div>
                  <Trash2 
                    size={18}
                    className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
                    onClick={(e) => handleDelete(data.id, e)}
                  />
                </div>
              </div>
              <div className='p-4'>
                <p className='text-gray-700 mb-4 line-clamp-3'>{data.body}</p>
                <div className='flex justify-between items-center mt-4'>
                  <span className='text-custom-blue font-medium bg-blue-50 px-2 py-1 rounded text-sm'>{data.department}</span>
                  <a 
                    href={data.document} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className='text-custom-blue hover:text-blue-700 flex items-center'
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
    </section>
  );
}

export default ShareNotes;
