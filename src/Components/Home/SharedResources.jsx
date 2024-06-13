import React,{useState,useEffect} from 'react'
import axios from 'axios';

function SharedResources() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com//api/videolinks/', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjY5MzkxLCJpYXQiOjE3MTgyNDc3OTEsImp0aSI6ImI1NDU5NTYyOThhMDQwNGY4ZTkzN2JkYWM0MjRiNjYyIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.3Tap7Xk9toixMMOwbnkgegqcg4vBZ-3WJvLlyoST97g'
          }
        });
        // console.log('API Response:', response.data); 
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
  }, []);

  return (
    <div className='flex flex-col'>
        <p className='ml-6  flex items-center'>
        <span className='font-bold'>Explore Shared Video Resources</span>
      </p>
      <div className='ml-6 md:w-full border-b-2'></div>
      <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:ml-2 lg:mr-2'>
        <div className='border p-3 rounded-lg bg-gray-200 w-full'>
          <p className='font-bold text'></p>
        </div>
      </div>
    </div>
  )
}

export default SharedResources