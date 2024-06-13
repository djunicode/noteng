import React, { useState, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [cardData, setCardData] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log('API Response:', response.data); 
        const data = response.data.map((item) => ({
          heading1: item.title,
          id: item.post_id,
          body: item.description,
          icon: <FavoriteBorderOutlinedIcon className="text-blue-500" style={{ width: '20px', height: '20px' }} />,
          timelimit: item.likes,
          category: item.subtype, 
          url: item.post_url,
          deadlines: item.deadline,
          image: item.image,
        }));
        console.log('Mapped Data:', data); 
        setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCardData((prevData) => prevData.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 gap-5 m-10 md:grid-cols-2 md:gap-10'>
        {cardData.map((data, i) => (
          <div
            className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2 cursor-pointer'
            key={i}
            onClick={() => handleCardClick(data.id)}
          >
            <div className='border p-3 rounded-lg bg-gray-300 w-full'>
              <div className='flex justify-between'>
                <p className='font-bold text-[18px] md:text-[15px]'>{data.heading1}</p>
                <DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500' onClick={(e) => { e.stopPropagation(); handleDelete(data.id); }} />
              </div>
              <div className='flex flex-col items-center'>
                <img src={data.image} alt={data.heading1} className='w-full h-80 object-cover mb-3' />
                <p className='mt-2 text-sm border-b-[1px] pb-3 text-[16px]'>{data.body}</p>
              </div>
              <p className='font-bold text-[18px] md:text-[15px] border-custom-blue'>{data.url}</p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {data.icon}
                  <p className='text-custom-blue font-bold md:font-normal'>{data.timelimit}</p>
                </div>
                <p className='text-custom-blue font-bold md:font-normal'>{data.category}</p>
                <p className='text-custom-blue font-bold md:font-normal'>{data.deadlines}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
