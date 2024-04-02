import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
  function handleHomeClick(){ 
    navigate('/')
  }
  function createJob(){
    navigate('/createjob')
  }
  return (
    <div className='flex flex-col bg-custom-blue h-[auto] min-h-[100vh] w-[22vw] min-w-[22vw] '>
      <div className='flex flex-row  px-4 py-4'>
        <div className='flex flex-col'>
          <p className='text-2xl font-poppins text-white'>NOTENG</p>
          <p className='text-xl font-poppins text-white'>Hey, John Doe</p>
        </div>
        <div className='flex items-center justify-around h-15 ml-auto mr-3'>
          <div className='flex w-10 h-10 bg-custom-white justify-center items-center rounded-l-lg rounded-r-lg'>
            <PersonOutlineIcon style={{ width: '30px', height: '30px', color: '#394DFD' }} />
          </div>
        </div>
      </div>
      <div className='flex items-center bg-white rounded-l-lg rounded-r-lg   mx-4 my-4  '>
        <input type='text' placeholder='Search for posts, notes...' className=' p-2 outline-none border-none rounded-l-lg' />
        <div className='w-8 h-8 bg-custom-blue flex justify-center items-center rounded-md mr-4 ml-auto'>
          <SearchIcon style={{color:'white'}} />
        </div>
      </div>
    <div className='flex bg-custom-gray rounded-l-lg rounded-r-lg mx-4 my-3  p-1' onClick={handleHomeClick}>
      <div className='pl-2'>
        <HomeOutlinedIcon style={{width:'30px',height:'30px',color:'#394DFD'}}/>
      </div>
      <p className='flex items-center font-bold text-custom-blue font-poppins mx-auto '>Home</p>
    </div>
    <div className='flex bg-custom-gray rounded-l-lg rounded-r-lg mx-4 my-3  p-1' >
      <div className='pl-2'>
        <HomeOutlinedIcon style={{width:'30px',height:'30px',color:'#394DFD'}}/>
      </div>
      <p className='flex items-center text-center font-bold text-custom-blue font-poppins ml-auto mr-auto  '>Discover</p>
    </div>
    <div className='flex flex-col my-3'>
      <div className='flex flex-col mx-12 gap-5'>
        <div className='flex gap-5'>
          <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg' onClick={createJob}>
            <AddIcon style={{color:'#394DFD'}}/>
          </div>
          <p className='mt-1 font-bold text-white'>Add Job Opportunity</p>
         </div>
         <div className='flex gap-5'>
          <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
            <AddIcon style={{color:'#394DFD'}}/>
          </div>
          <p className='mt-1 font-bold text-white'>Create New Post</p>
         </div>
         <div className='flex gap-5'>
          <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
            <AddIcon style={{color:'#394DFD'}}/>
          </div>
          <p className='mt-1 font-bold text-white'> Upload Notes</p>
         </div>
         <div className='flex gap-5'>
          <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
            <AddIcon style={{color:'#394DFD'}}/>
          </div>
          <p className='mt-1 font-bold text-white'>Share Video</p>
         </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Sidebar
