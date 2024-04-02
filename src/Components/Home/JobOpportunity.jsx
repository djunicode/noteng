import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';

const cardData = [
  {
    "heading1": 'Internship',
    "heading2": 'Company Name',
    "body": "We are seeking highly motivated and enthusiastic technology intern to join us",
    "icon": <CalendarTodayIcon className=" text-blue-500 " style={{width:'20px',height:'20px'}}  />,
    "time": "3 Months",
    "timeicon": <AccessTimeOutlinedIcon className=" text-blue-500  " style={{width:'20px',height:'20px'}}  />,
    'timelimit': 'Part-time',
    "mode": "Online",
    "mobile": <SmartphoneOutlinedIcon className="h-2 w-2 text-blue-500 " style={{width:'20px',height:'20px'}} />,
    "date": "24th March,2024"
  },
  {
    "heading1": 'Internship',
    "heading2": 'Company Name',
    "body": "We are seeking highly motivated and enthusiastic technology intern to join us",
    "icon": <CalendarTodayIcon className=" text-blue-500" style={{width:'20px',height:'20px'}}  />,
    "time": "3 Months",
    "timeicon": <AccessTimeOutlinedIcon className=" text-blue-500"style={{width:'20px',height:'20px'}}  />,
    'timelimit': 'Part-time',
    "mode": "Online",
    "mobile": <SmartphoneOutlinedIcon className=" text-blue-500" style={{width:'20px',height:'20px'}} />,
    "date": "24th March,2024",
  },
  {
    "heading1": 'Internship',
    "heading2": 'Company Name',
    "body": "We are seeking highly motivated and enthusiastic technology intern to join us",
    "icon": <CalendarTodayIcon className=" text-blue-500" style={{width:'20px',height:'20px'}}  />,
    "time": "3 Months",
    "timeicon": <AccessTimeOutlinedIcon className=" text-blue-500  " style={{width:'20px',height:'20px'}} />,
    'timelimit': 'Part-time',
    "mode": "Online",
    "mobile": <SmartphoneOutlinedIcon className=" text-blue-500" style={{width:'20px',height:'20px'}} />,
    "date": "24th March,2024",
  },
]

function JobOpportunity() {
  return (
    <div className='flex flex-col'>
      <p className='ml-6 mt-10 flex items-center'>
        <span className='font-bold'>Explore Latest Job Opportunities</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <div className='flex flex-row ml-1 mt-4 justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex max-w-full justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200'>
              <p className='font-bold '>{data.heading1}</p>
              <p className='text-sm md:text-[18px]'>{data.heading2}</p>
              <p className='mt-2 text-sm border-b-[1px] pb-3 border-custom-blue md:text-[16px]'>{data.body}</p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {data.icon }
                  <p className='text-blue-500 text-[8px] md:text-[10px] lg:text-[12px]'>{data.time}</p>
                </div>
                <div className='flex items-center'>
                  {data.timeicon}
                  <p className='text-blue-500 text-[8px] md:text-[10px] lg:text-[12px]'>{data.timelimit}</p>
                </div>
                <div className='flex items-center'>
                  {data.mobile}
                  <p className='text-blue-500 text-[8px] md:text-[10px] lg:text-[12px]'>{data.mode}</p>
                </div>
                <div className='flex items-center'>
                  <p className='text-blue-500 text-[8px] md:text-[10px] lg:text-[12px]'>{data.date}</p>
                </div>
              </div>
            </div>
           
          </div>
        })}
      </div>
      <p className='flex justify-end mr-5 text-custom-blue font-bold '>See more</p>
    </div>
  )
}

export default JobOpportunity;
