import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import '../../styles/profile.css';

const cardData = [
    {
        "heading1": 'Meet Chavan',
        
        
        "icon": <EmailOutlinedIcon className=" text-white " style={{width:'20px',height:'20px'}}  />,
        "email": "meetchavan24@gmail.com",
        "phoneicon": <PhoneIcon className=" text-white  " style={{width:'20px',height:'20px'}}  />,
        'phone': '8369620196',
        "mode": "Computer Engineering-2026",
        "education": <SchoolOutlinedIcon className="h-2 w-2 text-white " style={{width:'20px',height:'20px'}} />,
        
    },
    ]
    
    function MyCard() {
        return (
            <div className='flex flex-col w-full h-auto'>
                
                <div className='border-b-2'></div>
                <div className='flex flex-col justify-center items-center m-10 gap-5 md:flex-row md:ml-1 mt-4 md:justify-evenly'>
                    {cardData.map((data, i) => {
                        return (
                            <div className='profilecard flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 ' key={i}>
                                <div className=' border p-3 rounded-lg bg-custom-blue md:full-width h-[110px]'>
                                    <div className='absolute top-2 right-2 z-10'>
                                        <p className='relative border p-1 rounded-lg bg-white md:w-[100%] md:text-[10px]'>Student</p>
                                    </div>
                                    <p className='font-bold text-white md:text-[25px] '>{data.heading1}</p>
                                    
                                    <p className='mt-2 text-sm  pb-3  md:text-[16px]'>{data.body}</p>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center'>
                                            {data.icon}
                                            <p className='text-white text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal mr-20'>{data.email}</p>
                                        </div>
                                        <div className='flex items-center '>
                                            {data.phoneicon}
                                            <p className='text-white text-[8px] md:text-[10px] lg:text-[12px] font-bold md:font-normal mr-20'>{data.phone}</p>
                                        </div>
                                        <div className='flex items-center '>
                                            {data.education}
                                            <p className='text-white text-[9px] md:text-[10px] lg:text-[12px] font-bold md:font-normal'>{data.mode}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
export default MyCard;