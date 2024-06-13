import React, { useState, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function LatestPosts() {
  const [cardData, setCardData] = useState([]);
<<<<<<< HEAD
  const navigate = useNavigate();
  function Discover() {
    navigate('/DiscoverPage');
  }
=======
  const token = localStorage.getItem('token');
>>>>>>> 24b55b5e11785ee244c8c0239a0e29acf4cea551
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com//api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log('API Response:', response.data); 
        const data = response.data.map((item) => ({
          heading1: item.title,
          body: item.description,
          icon: <FavoriteBorderOutlinedIcon className="text-blue-500" style={{ width: '20px', height: '20px' }} />,
          timelimit: item.likes,
          category: item.subtype, 
          url: item.post_url,
          deadlines: item.deadline,
          image: item.image,
        }));
        console.log('Mapped Data:', data); 
        setCardData(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className='flex flex-col w-full'>
      <p className='flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold text-[35px]'>Latest Posts</span>
      </p>
      <div className='ml-6 md:w-full  border-b-2'></div>
      <div className='flex flex-col gap-5 ml-10 mr-10 md:mr-2  md:flex-row md:ml-2 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return (
            <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2  lg:ml-2' key={i}>
              <div className='border p-3 rounded-lg bg-gray-200 w-full'>
                <p className='font-bold text-[18px] md:text-[15px]'>{data.heading1}</p>
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
          );
        })}
      </div>
      <div className="flex justify-center md:justify-end md:mr-5 ">
      <p className="text-blue-600 font-bold cursor-pointer" onClick={Discover}>See More</p>
      </div>
    </div>
  );
}

export default LatestPosts;
