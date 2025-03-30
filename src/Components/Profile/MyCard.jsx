import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Avatar from '@mui/material/Avatar'; 
import '../../styles/profile.css';

const MyCard = ({ userData }) => {
  // Generate initials for avatar
  const getInitials = () => {
    return `${userData.fname?.[0] || ''}${userData.lname?.[0] || ''}`;
  };

  return (
    <div className='flex flex-col h-auto items-start w-full'>
      <div className='border-b-2 w-full'></div>
      <div className='flex flex-col justify-center items-center m-6 gap-5 md:flex-row md:justify-evenly w-[90%] mx-auto'>
        <div className='profilecard flex justify-evenly w-full mr-1 ml-1 md:mr-2 md:ml-2'>
          <div className='border p-4 rounded-lg bg-gradient-to-r from-custom-blue to-blue-600 shadow-lg w-full h-auto relative'>
            <div className='absolute top-3 right-3 z-10'>
              <p className='border px-3 py-1 rounded-lg bg-white text-custom-blue font-semibold text-xs md:text-sm shadow-sm'>Student</p>
            </div>
            
            <div className='flex items-center gap-4 mb-4'>
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: 'white', 
                  color: '#3a7bd5',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {getInitials()}
              </Avatar>
              
              <p className='font-bold text-white text-xl md:text-2xl'>
                {userData.fname} {userData.lname}
              </p>
            </div>
            
            <div className='flex flex-col md:flex-row justify-between mt-4 gap-3'>
              <div className='flex items-center p-2 hover:bg-blue-600 rounded-md transition-colors'>
                <EmailOutlinedIcon className='text-blue-100' style={{ width: '20px', height: '20px' }} />
                <p className='text-white text-[12px] md:text-[14px] ml-2 truncate max-w-[200px]'>{userData.email}</p>
              </div>
              
              <div className='flex items-center p-2 hover:bg-blue-600 rounded-md transition-colors'>
                <PhoneIcon className='text-blue-100' style={{ width: '20px', height: '20px' }} />
                <p className='text-white text-[12px] md:text-[14px] ml-2'>{userData.contact_number}</p>
              </div>
              
              <div className='flex items-center p-2 hover:bg-blue-600 rounded-md transition-colors'>
                <AccountBalanceOutlinedIcon className='text-blue-100' style={{ width: '20px', height: '20px' }} />
                <p className='text-white text-[12px] md:text-[14px] ml-2'>{userData.sapid}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
