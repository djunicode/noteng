import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import axios from 'axios';

function ShareNotes() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3OTMyMjc2LCJpYXQiOjE3MTc5MTA2NzYsImp0aSI6IjFkNjI5MWViOGQzYzQwNjc5OTQyN2U4YWFiYjQ2ODIxIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.bK54XJ1-vnJjzGMhLdubn47FpZnxNgG1x4NZwnu1dsE'; // Replace with the actual token
        const response = await axios.get('https://monilmeh.pythonanywhere.com/api/notes/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data.map((item) => ({
          heading1: item.note_title,
          body: item.note_description,
          icon: <StarIcon className="text-yellow-400" style={{ width: '20px', height: '20px' }} />,
          stars: item.average_rating,
          department: item.department,
          pdf: (
            <a href={item.document} >
              <PictureAsPdfOutlinedIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            </a>
          ),
        }));

        setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <p className='justify-center md:ml-6 md:justify-start flex items-center mt-5'>
        <span className='font-bold text-[35px]'>Share Notes</span>
      </p>
      <div className='ml-6 w-full border-b-2'></div>
      <div className='flex flex-col m-10 gap-5 md:flex-row md:ml-10 mt-4 justify-evenly'>
        {cardData.map((data, i) => (
          <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
            <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-200'>
              <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                <p className='font-bold'>{data.heading1}</p>
                <div className='flex items-center'>
                  {data.icon}
                  <p>{data.stars}</p>
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
    </div>
  );
}

export default ShareNotes;
