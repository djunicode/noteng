import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'; // Use this for SAP ID
import '../../styles/profile.css';

const MyCard = ({ userData }) => {
  return (
    <div className='flex flex-col h-auto items-start'>
      <div className='border-b-2'></div>
      <div className='flex flex-col justify-center items-center m-10 gap-5 md:flex-row mt-4 md:justify-evenly w-[77vw]'>
        <div className='profilecard flex justify-evenly w-full mr-1 ml-1 md:mr-2 md:ml-2'>
          <div className='border p-3 rounded-lg bg-custom-blue w-full h-auto'>
            <div className='absolute top-2 right-2 z-10'>
              <p className='relative border p-1 rounded-lg bg-white md:w-[100%] md:text-[10px]'>Student</p>
            </div>
            <p className='font-bold text-white md:text-[25px]'>
              {userData.fname} {userData.lname}
            </p>
            <div className='flex flex-col md:flex-row justify-between mt-4'>
              <div className='flex items-center mb-2 md:mb-0'>
                <EmailOutlinedIcon className='text-white' style={{ width: '20px', height: '20px' }} />
                <p className='text-white text-[12px] md:text-[14px] ml-2'>{userData.email}</p>
              </div>
              <div className='flex items-center mb-2 md:mb-0'>
                <PhoneIcon className='text-white' style={{ width: '20px', height: '20px' }} />
                <p className='text-white text-[12px] md:text-[14px] ml-2'>{userData.contact_number}</p>
              </div>
              <div className='flex items-center'>
                <AccountBalanceOutlinedIcon className='text-white' style={{ width: '20px', height: '20px' }} />
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
