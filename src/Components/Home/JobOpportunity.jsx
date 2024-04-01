import React from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
const cardData=[
  {
    "heading1":'Internship',
    "heading2":'Company Name',
    "body":"We are seeking highly motivated and enthusiastic",
    "body1":"Technology intern to join us",
    "icon":<CalendarTodayIcon style={{'height':'20px','color':'#394DFD'}}/>,
    "time":"3 Months",
    "timeicon":<AccessTimeOutlinedIcon style={{'height':'20px','color':'#394DFD'}}/>,
    'timelimit':'Part-time',
    "mode":"Online",
    "mobile":<SmartphoneOutlinedIcon  style={{'height':'20px','color':'#394DFD'}}/> ,
    "date":"24th March"
  },
  {
    "heading1":'Internship',
    "heading2":'Company Name',
    "body":"We are seeking highly motivated and enthusiastic",
    "body1":"Technology intern to join us",
    "icon":<CalendarTodayIcon style={{'height':'20px','color':'#394DFD'}}/>,
    "time":"3 Months",
    "timeicon":<AccessTimeOutlinedIcon style={{'height':'20px','color':'#394DFD'}}/>,
    'timelimit':'Part-time',
    "mode":"Online",
    "mobile":<SmartphoneOutlinedIcon  style={{'height':'20px','color':'#394DFD'}}/> ,
    "date":"24th March",
  },
  {
    "heading1":'Internship',
    "heading2":'Company Name',
    "body":"We are seeking highly motivated and enthusiastic",
    "body1":"Technology intern to join us",
    "icon":<CalendarTodayIcon style={{'height':'20px','color':'#394DFD'}}/>,
    "time":"3 Months",
    "timeicon":<AccessTimeOutlinedIcon style={{'height':'20px','color':'#394DFD'}}/>,
    'timelimit':'Part-time',
    "mode":"Online",
    "mobile":<SmartphoneOutlinedIcon  style={{'height':'20px','color':'#394DFD'}}/> ,
    "date":"24th March",
  },
]
function JobOpportunity() {
  return (
    <div className='flex flex-col'>
       <p className='ml-6 mt-10 flex items-center'>
        <span className='font-bold'>Explore Latest Job Opportunities</span>
        
      </p>
      <div className='ml-6  w-[78vw] border-b-2'></div>
     <div className='flex flex-row ml-1 mt-4 justify-evenly '>
          {cardData.map((data,i)=>{
            return < div className=' flex flex-col border p-3 rounded-l-lg rounded-r-lg  bg-custom-gray' key={i}>
              <p className='font-bold'>{data.heading1}</p>
              <p >{data.heading2}</p>
              <p className='mt-2'>{data.body}</p>
              <p  className='border-b-black'>{data.body1}</p>
                     <div className='flex justify-between'>
                          <div className='flex justify-between items-center'>
                             {data.icon }
                             <p className='text-custom-blue '>{data.time}</p>
                        </div>
                          <div className='flex  justify-between  items-center'>
                              {data.timeicon}
                              <p className='text-custom-blue'>{data.timelimit}</p>
                          </div>
                          <div className='flex  justify-between items-center'>
                            {data.mobile}
                          <p className='text-custom-blue'>{data.mode}</p>  
                          </div>
                          <div className='flex justify-between items-center'>
                            <p className='text-custom-blue '>{data.date}</p>
                          </div>
                      </div>
               </div>
          })}
     </div>


    </div>
  )
}

export default JobOpportunity