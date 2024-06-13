import React,{useState,useEffect} from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import axios from 'axios';
function JobOpportunity() {
  const[cardData,setCardData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        
        const response=await axios.get('https://monilmeh.pythonanywhere.com//api/jobboard/',{
          headers:{
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjY5MzkxLCJpYXQiOjE3MTgyNDc3OTEsImp0aSI6ImI1NDU5NTYyOThhMDQwNGY4ZTkzN2JkYWM0MjRiNjYyIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.3Tap7Xk9toixMMOwbnkgegqcg4vBZ-3WJvLlyoST97g'
          }
        });
        const data=response.data.slice(0, 3).map((item)=>({
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
  },[]);
  return (
    <div className='flex flex-col'>
      <p className=' md:ml-6 md:justify-start mt-5 flex justify-center items-center'>
        <span className='font-bold text-[35px]'>Explore Latest Job Opportunities</span>
      </p>
      <div className='ml-6 md:w-full border-b-2'></div>
      <div className='flex flex-col justify-center items-center m-10 gap-5 md:flex-row md:ml-2 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200 md:w-[100%]'>
              <p className='font-bold '>{data.heading1}</p>
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
      
    </div>
  )
}

export default JobOpportunity;
