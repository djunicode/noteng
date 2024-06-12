import React,{useState,useEffect}from 'react'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';


function LatestPosts() {
  const [cardData,setCardData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get('https://monilmeh.pythonanywhere.com//api/posts ',{
          headers:{
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3OTU1NzY5LCJpYXQiOjE3MTc5MzQxNjksImp0aSI6IjBmMzZhMzkzNGY2ZTQzNWZiY2JlNTEwM2VmYWQ4ZmFjIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0._fHqpLGaofy8ZdgRGkH1cshkWOK5gnMNTkKLWlhb9iY'
          }
        });
        const data=response.data.map((item)=>({
          heading1:item.title,
          body:item.description,
          icon: <FavoriteBorderOutlinedIcon className=" text-blue-500" style={{width:'20px',height:'20px'}}  />,
          timelimit:item.likes,
          category:item.subtype,
          url:item.post_url,
          deadlines:item.deadline,

        }));
        setCardData(data);
      }catch(error){
        console.error('Error fetching data:',error);
      }
    };
    fetchData();
  },[]);
  return (
    <div className='flex flex-col w-full'>
      <p className=' flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold  text-[35px]'>Latest Posts</span>
      </p>
      <div className='ml-6 w-full border-b-2'></div>
      <div className='flex flex-col gap-5  ml-10 mr-10 md:flex-row  md:ml-2 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex  justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200'>
              <p className='font-bold text-[18px] md:text-[15px] '>{data.heading1}</p>
              
             
              
              <p className=' mt-2 text-sm border-b-[1px] pb-3 text-[16px]'>{data.body}</p>
              <p className='font-bold text-[18px] md:text-[15px] border-custom-blue'>{data.url}</p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {data.icon }
                  <p className='text-custom-blue font-bold md:font-normal '>{data.timelimit}</p>
                </div>
              <p className='text-custom-blue font-bold md:font-normal'>{data.category}</p>
              <p className='text-custom-blue font-bold md:font-normal'>{data.deadlines}</p>
              </div>
            </div>
           
          </div>
        })}
      </div>
    
    </div>
  )
}

export default LatestPosts