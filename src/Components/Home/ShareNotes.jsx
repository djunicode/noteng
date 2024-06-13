import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import axios from 'axios';

function ShareNotes() {
  const [cardData, setCardData] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://monilmeh.pythonanywhere.com/api/notes/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        const data = response.data.map((item) => ({
          heading1: item.note_title,
          body: item.note_description,
          icon: <StarIcon className="text-yellow-400" style={{ width: '20px', height: '20px' }} />,
          stars: item.average_rating,
          department: item.department,
          pdf: (
            <a href={item.document} target="_blank" rel="noopener noreferrer">
              <PictureAsPdfOutlinedIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            </a>
          ),
        }));

        setCardData(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className='flex flex-col w-full'>
      <p className='justify-center md:ml-6 md:justify-start flex items-center mt-5'>
        <span className='font-bold text-[35px]'>Share Notes</span>
      </p>
      <div className='ml-6 md:w-full border-b-2'></div>
      <div className='flex flex-col mr-10 ml-10  gap-5 md:flex-row md:ml-2 mt-4 lg:justify-evenly md:justify-evenly '>
        {cardData.map((data, i) => (
          <div className='lg:flex md:flex justify-evenly flex-1 mr-1 ml-1 md:mr-2 block md:ml-2  lg:ml-2 ' key={i}>
            <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-200 md:w-[100%]'>
              <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                <p className='font-bold'>{data.heading1}</p>
                <div className='flex items-center'>
                  {data.icon}
                  <p>{data.stars && data.stars.toFixed(1)}</p>
                </div>
              </div>
              <div className='flex'>
                <p>{data.body}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-custom-blue font-bold md:font-normal'>{data.department}</p>
                {data.pdf}
              </div>
             
            </div>
            
          </div>
         
        ))}
         
      </div>
      <div className="flex justify-center md:justify-end md:mr-14">
        <a href="#" className="text-blue-600 font-bold">See More</a>
      </div>
    </div>
  );
}

export default ShareNotes;
