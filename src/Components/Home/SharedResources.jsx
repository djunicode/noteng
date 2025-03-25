import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Video } from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';

function SharedResources() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const handleViewMore = () => {
    navigate('/DiscoverPage', { state: { activeTab: 'Videos' } });
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com//api/videolinks/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = response.data.toReversed().map((item) => ({
          id: item.video_id,
          heading1: item.subject,
          heading2: item.topics,
          semester: item.sem,
          url: item.links,
          user: '6000422020100'
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
      await axios.delete(`https://monilmeh.pythonanywhere.com//api/videolinks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCardData((prevData) => prevData.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting video resource', error);
    }
  };

  return (
    <section className='bg-white rounded-xl shadow-sm p-6 mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center'>
          <Video className="mr-2 text-custom-blue" size={24} />
          Shared Resources
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
            <div key={item} className='bg-gray-100 rounded-lg p-4 h-full'>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="rectangular" height={180} />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {cardData.map((data) => (
            <div 
              key={data.id} 
              className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer'
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <h3 className='font-bold text-lg text-gray-800'>{data.heading1}</h3>
                <Trash2 
                  size={18}
                  className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
                  onClick={(e) => handleDelete(data.id, e)}
                />
              </div>
              <div className='p-4'>
                <div className='flex justify-between text-sm text-gray-600 mb-3'>
                  <p>{data.heading2}</p>
                  <p>Semester: {data.semester}</p>
                </div>
                <div className='aspect-video rounded overflow-hidden bg-gray-200'>
                  <iframe 
                    src={data.url} 
                    className='w-full h-full' 
                    title={data.heading1} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SharedResources;