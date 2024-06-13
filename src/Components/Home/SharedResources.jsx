import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SharedResources() {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  function Discover() {
    navigate('/DiscoverPage');
  }

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com//api/videolinks/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log('API Response:', response.data); 
        const data = response.data.map((item) => ({
          heading1: item.subject,
          heading2:item.topics,
          semester:item.sem,
          url:item.links,
          user:'60004220207'
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
    <div className='flex flex-col'>
      <p className=' md:ml-6 md:justify-start  flex justify-center items-center'>
        <span className='font-bold text-[35px]'>Explore Latest Job Opportunities</span>
      </p>
      <div className='ml-6 md:w-full border-b-2'></div>
      <div className='flex flex-col justify-center items-center mr-10 ml-10 gap-5 md:flex-row md:ml-2 md:mr-2 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200 md:w-[100%]'>
              <p className='font-bold '>{data.heading1}</p>
              <div className='flex gap-2'>
              <p className='text-sm md:text-[18px]'>{data.heading2}</p>
              <p className='text-sm md:text-[18px]'>Semester:{data.semester}</p>
              </div>
              <div className='flex '>
                <video src={data.url} controls width='400' />
              </div>

              
             
            </div>
           
          </div>
        })}
      </div>
      <div className="flex justify-center md:justify-end md:mr-5">
      <p className="text-blue-600 font-bold cursor-pointer" onClick={Discover}>See More</p>
      </div>
    </div>
  )
}

export default SharedResources