import React,{useState,useEffect} from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
function JobOpportunity() {
  const[cardData,setCardData]=useState([]);

  const navigate = useNavigate();
  function Discover() {
    navigate('/DiscoverPage');
  }

  const token=localStorage.getItem('token');

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        
        const response=await axios.get('https://monilmeh.pythonanywhere.com//api/jobboard/',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        const data=response.data.slice(0, 3).map((item)=>({
          id:item.job_id,
          heading1:item.company,
          heading2:item.job_title,
          heading3:item.subtype,
          body:item.requirements,
          body1:item.description,
          contact:item.contact_no,
          icon:<CalendarTodayIcon className=" text-custom-blue " style={{width:'20px',height:'20px'}}  />,
          time:item.duration_in_months,
          timeicon:<AccessTimeOutlinedIcon className=" text-custom-blue  " style={{width:'20px',height:'20px'}}  />,
          timelimit:item.location,
          mobile:<SmartphoneOutlinedIcon className="h-2 w-2 text-custom-blue " style={{width:'20px',height:'20px'}} />,
          mode:item.mode,
          date:item.upload_time,


        }));
        setCardData(data);
      

      }catch(error){
        console.log('Error in fetching',error);
      }
    };
    fetchData();
  },[token]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://monilmeh.pythonanywhere.com/api/jobboard/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove the deleted job from the state
      setCardData((prevData) => prevData.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };
  return (
    <div className='flex flex-col'>
      <p className=' md:ml-6 md:justify-start mt-5 flex justify-center items-center'>
        <span className='font-bold text-[35px]'>Explore Latest Job Opportunities</span>
      </p>
      <div className='ml-6  border-b-2'></div>
      <div className='flex flex-col justify-center items-center  mr-10 ml-10 gap-5 md:flex-row md:mr-2  md:ml-2 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200 md:w-[100%]'>
              <div className='flex justify-between'>
              <p className='font-bold '>{data.heading1}</p>
              <DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500 ' onClick={() => handleDelete(data.id)} />
              </div>
              <p className='text-sm md:text-[18px]'>{data.heading2}</p>
              <p className='text-sm md:text-[18px]'>{data.heading3}</p>
              {/* <p className='text-sm border-b-[1px] md:text-[16px]'>{data.body.substring(0, 100)}</p> */}

              <p className=' text-sm border-b-[1px]  md:text-[16px]'>{data.body1.substring(0,60)}</p>
              <p className=' text-sm border-b-[1px] pb-3 border-custom-blue md:text-[16px]'>{data.contact}</p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {data.icon }
                  <p className='text-custom-blue text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{data.time}</p>
                </div>
                <div className='flex items-center'>
                  {data.timeicon}
                  <p className='text-custom-blue text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{data.timelimit}</p>
                </div>
                <div className='flex items-center'>
                  {data.mobile}
                  <p className='text-custom-blue text-[9px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{data.mode}</p>
                </div>
                <div className='flex items-center'>
                  <p className='text-custom-blue text-[9px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{data.date}</p>
                </div>
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

export default JobOpportunity;
