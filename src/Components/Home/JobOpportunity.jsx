import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Smartphone, MapPin, Briefcase, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

function JobOpportunity() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  const handleViewMore = () => {
    navigate('/DiscoverPage', { state: { activeTab: 'Jobs' } });
  };

  function handleCardClick(id) {
    navigate(`/viewjob/${id}`);
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com//api/jobboard/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = response.data.toReversed().slice(0, 3).map((item) => ({
          id: item.job_id,
          company: item.company,
          title: item.job_title,
          subtype: item.subtype,
          requirements: item.requirements,
          description: item.description,
          contact: item.contact_no,
          duration: item.duration_in_months,
          location: item.location,
          mode: item.mode,
          date: item.upload_time,
        }));
        setCardData(data);
      } catch (error) {
        console.log('Error in fetching', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/jobboard/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCardData((prevData) => prevData.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };

  return (
    <section className='bg-white rounded-xl shadow-sm p-6 mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center'>
          <Briefcase className="mr-2 text-custom-blue" size={24} />
          Explore Latest Job Opportunities
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
              <Skeleton variant="rectangular" height={120} />
              <Skeleton variant="text" height={20} width="80%" />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {cardData.map((job) => (
            <div 
              key={job.id}
              onClick={() => handleCardClick(job.id)}
              className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer'
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <h3 className='font-bold text-lg text-gray-800'>{job.company}</h3>
                <Trash2 
                  size={18}
                  className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
                  onClick={(e) => handleDelete(job.id, e)}
                />
              </div>
              
              <div className='p-4'>
                <div className='mb-3'>
                  <h4 className='text-lg font-semibold text-custom-blue'>{job.title}</h4>
                  <span className='text-sm text-gray-500'>{job.subtype}</span>
                </div>
                
                <p className='text-gray-700 mb-4 line-clamp-3'>{job.description}</p>
                
                <div className='border-t border-gray-200 pt-3 mt-3'>
                  <p className='text-sm text-gray-600 mb-2'>
                    <span className='font-medium'>Contact:</span> {job.contact}
                  </p>
                  
                  <div className='grid grid-cols-2 gap-2 mt-3'>
                    <div className='flex items-center text-gray-600 text-sm'>
                      <Calendar className="w-4 h-4 mr-1 text-custom-blue" size={16} />
                      {job.duration} months
                    </div>
                    <div className='flex items-center text-gray-600 text-sm'>
                      <MapPin className="w-4 h-4 mr-1 text-custom-blue" size={16} />
                      {job.location}
                    </div>
                    <div className='flex items-center text-gray-600 text-sm'>
                      <Smartphone className="w-4 h-4 mr-1 text-custom-blue" size={16} />
                      {job.mode}
                    </div>
                    <div className='flex items-center text-gray-600 text-sm'>
                      <Clock className="w-4 h-4 mr-1 text-custom-blue" size={16} />
                      {new Date(job.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default JobOpportunity;
