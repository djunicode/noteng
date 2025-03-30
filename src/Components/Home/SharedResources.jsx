import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Video, Tag, GraduationCap, ExternalLink } from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';
import { useAdmin } from './AdminContext';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';

function SharedResources() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  
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
          user: item.user
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

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setResourceToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com//api/videolinks/${resourceToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCardData((prevData) => prevData.filter((resource) => resource.id !== resourceToDelete));
      setDeleteModalOpen(false);
      setResourceToDelete(null);
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
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    data.heading1 === 'CS' ? 'bg-blue-500' :
                    data.heading1 === 'IT' ? 'bg-green-500' :
                    data.heading1 === 'AIML' ? 'bg-purple-500' :
                    data.heading1 === 'AIDS' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></span>
                  <h3 className='font-bold text-lg text-gray-800'>{data.heading1}</h3>
                </div>
                {isAdmin && (
                  <Trash2 
                    size={18}
                    className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
                    onClick={(e) => handleDelete(data.id, e)}
                  />
                )}
              </div>
              <div className='p-4'>
                <div className='flex flex-col mb-3'>
                  <div className="flex items-center mb-2">
                    <Tag size={14} className="text-custom-blue mr-1" />
                    <p className="text-sm text-gray-600 font-medium">{data.heading2}</p>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap size={14} className="text-custom-blue mr-1" />
                    <p className="text-sm text-gray-600">Semester {data.semester}</p>
                  </div>
                </div>
                
                <div className='aspect-video rounded-lg overflow-hidden bg-gray-200 border'>
                  <iframe 
                    src={data.url} 
                    className='w-full h-full' 
                    title={data.heading1} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <a 
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center mt-3 text-sm text-custom-blue hover:underline"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Open in new tab
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemType="video resource"
      />
    </section>
  );
}

export default SharedResources;