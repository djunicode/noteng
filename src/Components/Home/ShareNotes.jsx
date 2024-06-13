import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function ShareNotes() {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  
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
          id: item.note_id,
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

        setCardData(data.slice(0, 3)); // Display only 3 notes
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
     
      setCardData((prevData) => prevData.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleSeeMore = () => {
    navigate('/DiscoverPage'); // Adjust the route as per your requirement
  };

  const handleCardClick = (id) => {
    navigate(`/viewnote/${id}`);
  };

  return (
    <div className='flex flex-col'>
      <p className='justify-center md:ml-6 md:justify-start flex items-center mt-5'>
        <span className='font-bold text-[35px]'>Share Notes</span>
      </p>
      <div className='ml-6 border-b-2'></div>
      <div className='flex flex-col md:flex-row justify-evenly gap-5 mt-4 px-10'>
        {cardData.map((data, i) => (
          <div 
            className='flex justify-center w-full md:w-1/3 cursor-pointer' 
            key={data.id} 
            onClick={() => handleCardClick(data.id)}
          >
            <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-300 w-full'>
              <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                <p className='font-bold'>{data.heading1}</p>
                <div className='flex items-center'>
                  {data.icon}
                  <p className='ml-1'>{data.stars && data.stars.toFixed(1)}</p>
                  <DeleteIcon 
                    className='text-[#394dfd] cursor-pointer hover:text-red-500 ml-2' 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent onClick of parent
                      handleDelete(data.id);
                    }} 
                  />
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
      <div className="flex justify-center md:justify-end md:mr-5 mt-4">
        <p className="text-blue-600 font-bold cursor-pointer" onClick={handleSeeMore}>See More</p>
      </div>
    </div>
  );
}

export default ShareNotes;
