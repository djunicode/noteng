import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


function Notes() {
    const [cardData, setCardData] = useState([]);
    const token=localStorage.getItem('token');
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
            id:item.note_id,
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

        setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com//api/notes/${id}`, {
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
    <div className='flex flex-col w-full'>
    
     
      <div className='grid grid-cols-1 gap-5 m-10 md:grid-cols-4 md:gap-10 '>
        {cardData.map((data, i) => (
          <div className='lg:flex md:flex justify-evenly flex-1 mr-1 ml-1 md:mr-2 block md:ml-2 lg:mr-4 lg:ml-2 ' key={i}>
            <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-200 md:w-[100%]'>
              <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                <p className='font-bold'>{data.heading1}</p>
                <div className='flex items-center'>
                  {data.icon}
                  <p>{data.stars && data.stars.toFixed(1)}</p>
                  < DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500' onClick={()=>handleDelete(data.id)} />
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
  )
}

export default Notes