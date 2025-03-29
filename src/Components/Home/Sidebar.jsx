import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, Plus, X, Compass, Calendar, LogOut } from 'lucide-react';
import Sidebarresponsive from './Sidebarresponsive';
import { motion } from 'framer-motion';
import '../../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({ fname: 'John', lname: 'Doe' });
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://monilmeh.pythonanywhere.com/auth/user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData({ fname: data.fname, lname: data.lname });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check admin status from localStorage first
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsAdmin(adminStatus === 'true');
    } else {
      // Fallback to API if not in localStorage
      const checkAdminStatus = async () => {
        try {
          const response = await fetch('https://monilmeh.pythonanywhere.com/api/isAdmin/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setIsAdmin(data.is_admin);
          localStorage.setItem('isAdmin', data.is_admin);
          console.log('Admin status:', data.is_admin);
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      };
      checkAdminStatus();
    }

    fetchUserData();
  }, [token]);

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

  function Discover() {
    navigate('/DiscoverPage');
  }

  function handleCalendar() {
    navigate('/calendar');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/splash');
  }

  // Animation variants for menu items
  const menuItemVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: '#242f8e',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      backgroundColor: '#202a80' 
    }
  };

  return (
    <div className='flex'>
      {!isOpen && (
        <motion.div 
          onClick={toggleSidebar} 
          className='lg:hidden'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sidebarresponsive />
        </motion.div>
      )}
      
      {/* Mobile overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="mobile-sidebar-overlay lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
      
      <div 
        className={`fixed lg:fixed top-0 left-0 h-screen w-[300px] lg:w-[260px] bg-custom-blue 
                   overflow-hidden z-20 transition-all duration-300 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className='flex justify-end p-3 lg:hidden' onClick={toggleSidebar}>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X color="white" size={24} />
          </motion.div>
        </div>
        
        <div className='flex flex-col h-screen'>
          <div className='flex flex-row px-5 py-5'>
            <div className='flex flex-col mr-3 flex-shrink'>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className='text-2xl font-poppins text-white'
              >
                NOTENG
              </motion.p>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className='text-lg font-poppins text-white truncate max-w-[170px]'
              >
                Hey, {userData.fname} {userData.lname}
              </motion.p>
            </div>
            <div className='flex items-center justify-around h-16 ml-auto flex-shrink-0'>
              <motion.div 
                className='flex w-12 h-12 bg-custom-white justify-center items-center rounded-lg cursor-pointer'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={loginNavigate}
              >
                <User size={28} color="#394DFD" />
              </motion.div>
            </div>
          </div>
          
          <div className='flex flex-col justify-between flex-grow'>
            <div className='space-y-3 py-2'>
              {/* Navigation Section */}
              <motion.div 
                className='flex bg-custom-gray rounded-lg mx-5 py-1 px-4 cursor-pointer max-h-11' 
                onClick={handleHomeClick}
                variants={menuItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className='pl-1'>
                  <Home size={24} color="#394DFD" />
                </div>
                <p className='flex items-center font-bold text-sm text-custom-blue font-poppins mx-auto'>Home</p>
              </motion.div>
              
              <motion.div 
                className='flex bg-custom-gray rounded-lg mx-5 py-1 px-4 cursor-pointer max-h-11' 
                onClick={Discover}
                variants={menuItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className='pl-1 cursor-pointer'>
                  <Compass size={24} color="#394DFD" />
                </div>
                <p className='flex items-center text-center font-bold text-sm text-custom-blue font-poppins ml-auto mr-auto'>Discover</p>
              </motion.div>
              
              <motion.div 
                className='flex bg-custom-gray rounded-lg mx-5 py-1 px-4 cursor-pointer max-h-11' 
                onClick={handleCalendar}
                variants={menuItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className='pl-1 cursor-pointer'>
                  <Calendar size={24} color="#394DFD" />
                </div>
                <p className='flex items-center text-center font-bold text-sm text-custom-blue font-poppins ml-auto mr-auto'>Calendar</p>
              </motion.div>

              {/* Create Section */}
              <div className='mt-6 px-4'>
                <p className='text-white text-sm font-medium mb-2 ml-2 opacity-70'>CREATE</p>
                <div className='space-y-3'>
                  <motion.div 
                    className='flex gap-2 cursor-pointer items-center pl-2' 
                    onClick={createJob}
                    whileHover={{ x: 5 }}
                  >
                    <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-lg'>
                      <Plus size={20} color="#394DFD" />
                    </div>
                    <p className='font-bold text-sm text-white'>Add Job Opportunity</p>
                  </motion.div>
                  
                  <motion.div 
                    className='flex gap-2 cursor-pointer items-center pl-2' 
                    onClick={createPost}
                    whileHover={{ x: 5 }}
                  >
                    <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-lg'>
                      <Plus size={20} color="#394DFD" />
                    </div>
                    <p className='font-bold text-sm text-white'>Create New Post</p>
                  </motion.div>
                  
                  <motion.div 
                    className='flex gap-2 cursor-pointer items-center pl-2' 
                    onClick={createNote}
                    whileHover={{ x: 5 }}
                  >
                    <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-lg'>
                      <Plus size={20} color="#394DFD" />
                    </div>
                    <p className='font-bold text-sm text-white'>Upload Notes</p>
                  </motion.div>
                  
                  {isAdmin && (
                    <motion.div 
                      className='flex gap-2 cursor-pointer items-center pl-2' 
                      onClick={uploadVideo}
                      whileHover={{ x: 5 }}
                    >
                      <div className='flex h-8 w-8 bg-custom-gray items-center justify-center rounded-lg'>
                        <Plus size={20} color="#394DFD" />
                      </div>
                      <p className='font-bold text-sm text-white'>Share Video</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Logout Section */}
            <motion.div 
className="flex gap-3 items-center justify-center cursor-pointer mx-auto mb-20 sm:mb-12 md:mb-8"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className='font-bold text-white text-xl'>Logout</p>
              <div className='flex h-11 w-11 bg-custom-gray items-center justify-center rounded-full'>
                <LogOut size={26} color="#394DFD" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Spacer div to ensure content doesn't go under sidebar on large screens */}
      <div className='hidden lg:block lg:min-w-[260px] lg:w-[260px]'></div>
    </div>
  );
}

export default Sidebar;
