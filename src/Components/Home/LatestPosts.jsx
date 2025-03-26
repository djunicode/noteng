import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Calendar, Link as LinkIcon, Users, Trash2 } from 'lucide-react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useAdmin } from './AdminContext';

function LatestPosts() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  
  const handleViewMore = () => {
    navigate('/DiscoverPage', { state: { activeTab: 'Posts' } });
  };
  
  function handleCardClick(id) {
    navigate(`/Postdetails/${id}`);
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.toReversed().map((item) => ({
          id: item.post_id,
          heading1: item.title,
          body: item.description,
          likes: item.likes,
          category: item.subtype,
          organizer: item.organised_by,
          url: item.post_url,
          deadline: item.deadline,
          image: item.image,
          dateUploaded: item.date_uploaded,
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
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCardData((prevData) => prevData.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Here you would implement the actual like API call
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'hackathon':
        return 'bg-purple-100 text-purple-700';
      case 'cultural':
        return 'bg-pink-100 text-pink-700';
      case 'datathon':
        return 'bg-blue-100 text-blue-700';
      case 'startup':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className='bg-white rounded-xl shadow-sm p-6 mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center'>
          <MessageCircle className="mr-2 text-custom-blue" size={24} />
          Latest Posts
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
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {cardData.map((post) => (
            <div 
              key={post.id}
              onClick={() => handleCardClick(post.id)}
              className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer'
            >
              <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
                <h3 className='font-bold text-lg text-gray-800 line-clamp-1'>{post.heading1}</h3>
                {isAdmin && (
                  <Trash2 
                    className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
                    size={18}
                    onClick={(e) => handleDelete(post.id, e)}
                  />
                )}
              </div>
              
              {post.image && (
                <div className='aspect-[4/3] overflow-hidden'>
                  <img 
                    src={post.image} 
                    alt={post.heading1} 
                    className='w-full h-full object-cover transition-transform hover:scale-105'
                  />
                </div>
              )}
              
              <div className='p-4'>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEventTypeColor(post.category)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs">
                    <Users size={12} className="mr-1 text-gray-600" />
                    <span>{post.organizer}</span>
                  </div>
                </div>
                
                <p className='text-gray-700 mb-4 line-clamp-3'>{post.body}</p>
                
                {post.url && (
                  <div className="mb-4 flex">
                    <LinkIcon size={14} className="mr-1 text-custom-blue flex-shrink-0 mt-1" />
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className='text-custom-blue hover:underline truncate'
                    >
                      {post.url}
                    </a>
                  </div>
                )}
                
                <div className='flex justify-between items-center border-t pt-3 mt-3'>
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className='flex items-center text-gray-600 hover:text-red-500 transition-colors'
                  >
                    {likedPosts[post.id] ? 
                      <FavoriteIcon size={18} className="text-red-500" /> : 
                      <Heart size={18} />
                    }
                    <span className='ml-1'>{post.likes}</span>
                  </button>
                  
                  {post.deadline && (
                    <div className='flex items-center text-gray-600 text-sm'>
                      <Calendar size={16} className="mr-1" />
                      {new Date(post.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LatestPosts;
