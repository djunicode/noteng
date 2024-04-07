import React from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
function NewPost() {
  return (
    <div className='flex flex-col gap-3 w-[100vw] '>
         <p className=' flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold text-[35px] '>Create New Post</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <p className='text-[25px] ml-6'>Post title</p>
      <input type='text' placeholder='Enter Post Title' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
      <p className='text-[25px] ml-6'>Post Category</p>
      <input type='text' placeholder='Enter Post Category' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
      <p className='text-[25px] ml-6'>Post Description</p>
      <input type='text' placeholder='Enter Post Description' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
        <p className='text-[25px] ml-6'>Upload Images</p>
        <div className='flex gap-8 md:flex-row flex-col'>
            
            <div className='flex flex-row gap-2 justify-center md:flex-col ml-6 mb-3 md:p-36 p-20 mr-6 md:mr-0  border-dotted border-x-2 border-y-2 border-gray-400 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                <CloudUploadOutlinedIcon/>
                <button>Upload</button>
            </div>
            <div className='flex w-full h-full items-center justify-center '>
          <div className=' w-full mr-6  ml-6 lg:mr=l-0' >
                <button className='  w-full  bg-custom-blue py-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-white'>Add New Post</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NewPost