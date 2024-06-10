import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Sidebarresponsive from './Sidebarresponsive';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
// import LoginPage from '../../Pages/LoginPage';
const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleHomeClick() {
    navigate('/');
  }

  function createJob() {
    navigate('/createjob');
  }
  function createPost() {
    navigate('/createpost');
  }
  function createNote() {
    navigate('/createnote');
  }
  function uploadVideo() {
    navigate('/uploadvideo');
  }

  function loginNavigate() {
    navigate('/profile');
  }
  function toggleSidebar() {
    setIsOpen(!isOpen);
    document.body.style.overflowY = isOpen ? 'auto' : 'hidden';
  }
  function Discover(){
    navigate('/DiscoverPage');
  }

  return (
    <div className='flex '>
      {!isOpen && (
        <div onClick={toggleSidebar} className='lg:hidden '>
          <Sidebarresponsive />
        </div>
      )}
      <div className='flex h-full lg:h-auto '>
      <div className={`lg:flex lg:flex-col lg:w-[19vw]  min-h-[100vh] bg-custom-blue h-full absolute top-0 left-0 lg:relative z-10  ${isOpen ? '' : 'hidden'}`}>

          <div className='flex justify-end p-3 lg:hidden' onClick={toggleSidebar}>
              <CloseIcon/>
          </div>
          <div className='flex flex-row px-4 py-4'>
            <div className='flex flex-col'>
              <p className='text-2xl font-poppins text-white'>NOTENG</p>
              <p className='text-xl font-poppins text-white'>Hey, John Doe</p>

            </div>
            <div className='flex items-center justify-around h-16 ml-auto mr-3'>
              <div className='flex w-10 h-10 bg-custom-white justify-center items-center rounded-l-lg rounded-r-lg cursor-pointer'>
                <PersonOutlineIcon style={{ width: '30px', height: '30px', color: '#394DFD' }} onClick={loginNavigate}/>
              </div>
            </div>
          </div>
          <div className='flex items-center bg-white rounded-l-lg rounded-r-lg mx-4 my-4 '>
            <input type='text' placeholder='Search for posts, notes...' className='w-full outline-none border-none rounded-l-lg' />
            <div className='w-8 h-8 bg-custom-blue flex justify-center items-center rounded-md mr-4 cursor-pointer'>
              <SearchIcon style={{ color: 'white'  }} />
            </div>
          </div>
          <div className='flex bg-custom-gray rounded-l-lg rounded-r-lg mx-4 my-3 p-1 cursor-pointer' onClick={handleHomeClick}>
            <div className='pl-2'>
              <HomeOutlinedIcon style={{ width: '30px', height: '30px', color: '#394DFD' }} />
            </div>
            <p className='flex items-center font-bold text-custom-blue font-poppins mx-auto'>Home</p>
          </div>
          <div className='flex bg-custom-gray rounded-l-lg rounded-r-lg mx-4 my-3 p-1 cursor-pointer' onClick={Discover}>
            <div className='pl-2 cursor-pointer'>
              < ExploreIcon style={{ width: '30px', height: '30px', color: '#394DFD' }}/>
            </div>
            <p className='flex items-center text-center font-bold text-custom-blue font-poppins ml-auto mr-auto'>Discover</p>
          </div>
          <div className='flex flex-col justify-center items-center max-w-auto my-3'>
            <div className='flex flex-col gap-2 mt-8'>
              <div className='flex gap-2 cursor-pointer' onClick={createJob}>
                <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
                  <AddIcon style={{ color: '#394DFD' }} />
                </div>
                <p className='font-bold text-white'>Add Job Opportunity</p>
              </div>
              <div className='flex gap-2 mt-2 cursor-pointer' onClick={createPost}>
                <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
                  <AddIcon style={{ color: '#394DFD' }} />
                </div>
                <p className='font-bold text-white'>Create New Post</p>
              </div>
              <div className='flex gap-2 mt-2 cursor-pointer' onClick={createNote}>
                <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
                  <AddIcon style={{ color: '#394DFD' }} />
                </div>
                <p className='font-bold text-white'>Upload Notes</p>
              </div>
              <div className='flex gap-2 mt-2 cursor-pointer' onClick={uploadVideo}>
                <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-l-lg rounded-r-lg'>
                  <AddIcon style={{ color: '#394DFD' }} />
                </div>
                <p className='font-bold text-white'>Share Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
