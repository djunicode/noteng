import React from 'react'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const cardData = [
  {
    "heading1": 'Post Title',
    
    "body": "Hello tech enthusiastics and innovators! Are you ready to show case your skills,collabrate with like-minded individuals,and create ground-breaking solutions for real-world challenges? ",
    "icon": <FavoriteBorderOutlinedIcon className=" text-custom-blue " style={{width:'20px',height:'20px'}}  />,
    
   
    'timelimit': '100 + Likes',
  
  },
  {
    "heading1": 'Post Title',
  
    "body": "Hello tech enthusiastics and innovators! Are you ready to show case your skills,collabrate with like-minded individuals,and create ground-breaking solutions for real-world challenges?",
    "icon": <FavoriteBorderOutlinedIcon className=" text-blue-500" style={{width:'20px',height:'20px'}}  />,
    
    'timelimit': '100 + Likes',
  
  },
  {
    "heading1": 'Post Title',
   
    "body": "Hello tech enthusiastics and innovators! Are you ready to show case your skills,collabrate with like-minded individuals,and create ground-breaking solutions for real-world challenges?",
    "icon": <FavoriteBorderOutlinedIcon className=" text-blue-500" style={{width:'20px',height:'20px'}}  />,
   
    
    'timelimit': '100 + Likes',
   
  },
]
function LatestPosts() {
  return (
    <div className='flex flex-col'>
      <p className=' flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold  '>Latest Posts</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <div className='flex flex-col gap-5  ml-10 mr-10 md:flex-row  md:ml-1 mt-4 md:justify-evenly'>
        {cardData.map((data, i) => {
          return <div className='flex max-w-full justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
            <div className='border p-3 rounded-lg bg-gray-200'>
              <p className='font-bold text-[18px] md:text-[15px] '>{data.heading1}</p>
              
              <p className=' mt-2 text-sm border-b-[1px] pb-3 border-custom-blue text-[16px]'>{data.body}</p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {data.icon }
                  <p className='text-custom-blue font-bold md:font-normal '>{data.timelimit}</p>
                </div>
              <p className='text-custom-blue font-bold md:font-normal'>Categories</p>
              </div>
            </div>
           
          </div>
        })}
      </div>
      <p className='flex justify-end mr-12 text-custom-blue font-bold '>See more</p>
    </div>
  )
}

export default LatestPosts