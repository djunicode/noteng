import React from 'react'

import StarIcon from '@mui/icons-material/Star';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';


const cardData = [
    {
      "heading1": 'Notes Title',
      
      "body": "Check out these Study Buddy Notes crafted by students who have been through coding sub..  ",
      "icon": <StarIcon className=" text-yellow-400 " style={{width:'20px',height:'20px'}}  />,
      "department":" Department",
     
      'timelimit': '100 + Likes',
      'pdf':<PictureAsPdfOutlinedIcon className='text-custom-blue' style={{width:'20px',height:'20px'}} />
    
    },
    {
      "heading1": 'Notes Title',
    
      "body": "Check out these Study Buddy Notes crafted by students who have been through coding sub..",
      "icon": <StarIcon className="  text-yellow-400 " style={{width:'20px',height:'20px'}}  />,
      "department":" Department",
      'timelimit': '100 + Likes',
      'pdf':<PictureAsPdfOutlinedIcon className='text-custom-blue' style={{width:'20px',height:'20px'}} />
    
    },
    {
      "heading1": 'Notes Title',
      "body": "Check out these Study Buddy Notes crafted by students who have been through coding sub..",
      "icon": <StarIcon className=" text-yellow-400 " style={{width:'20px',height:'20px'}}  />,
      "department":" Department",
      'pdf':<PictureAsPdfOutlinedIcon className='text-custom-blue' style={{width:'20px',height:'20px'}} />,
      'timelimit': '100 + Likes',
     
    },
    {
        "heading1": 'Notes Title',
        "body": "Check out these Study Buddy Notes crafted by students who have been through coding sub..",
        "icon": <StarIcon className=" text-yellow-400 " style={{width:'20px',height:'20px'}}  />,
        "department":" Department",
        'pdf':<PictureAsPdfOutlinedIcon className='text-custom-blue' style={{width:'20px',height:'20px'}} />
       
       
      },
      {
        "heading1": 'Notes Title',
        "body": "Check out these Study Buddy Notes crafted by students who have been through coding sub..",
        "icon": <StarIcon className=" text-yellow-400 " style={{width:'20px',height:'20px'}}  />,
        "department":" Department",
        'pdf':<PictureAsPdfOutlinedIcon className='text-custom-blue' style={{width:'20px',height:'20px'}} />
       
      },
  ]
function ShareNotes() {
  return (
    <div className='flex flex-col '>
         <p className='ml-6  flex items-center'>
        <span className='font-bold'>Share Notes</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <div className='flex flex-row ml-1 mt-4 justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex max-w-full justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
           <div className='flex flex-col gap-2 border p-3 rounded-lg bg-gray-200'>
                <div className='flex justify-between border-b-[1px] border-custom-blue pb-2'>
                    <p className='font-bold'>{data.heading1}</p>
                    <div className='flex  itmes-center'>
                        {data.icon}
                        <p>4.6</p>
                    </div>

                </div>
                <div className='flex'>
                    <p>{data.body}</p>
                </div>
                <div className='flex justify-between'>
                    
                    {data.department}
                    {data.pdf}
                </div>
            </div>
           
          </div>
        })}
      </div>
      <p className='flex justify-end mr-5 text-custom-blue font-bold '>See more</p>
    </div>
  )
}

export default ShareNotes