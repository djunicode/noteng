import React from 'react';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

function DescriptionProfile(){
    return(
        <div className='flex flex-col gap-3 w-[100vw] '>
            <div className="flex flex-row justify-center">
        <div className="bg-gray-200 p-4 rounded-md max-w-[800px] ml-0 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <WorkOutlineOutlinedIcon className="text-black" style={{width:'40px',height:'40px'}}  />
                        </span>
                    </div>
                    <h5 className="mb-1 font-bold text-primary">12</h5>
                    <h6 className="mb-0 font-normal dark:text-primary">Jobs Posted</h6>
                    <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <PhotoSizeSelectActualOutlinedIcon className="text-black" style={{width:'40px',height:'40px'}}  />
                        </span>
                    </div>
                    <h5 className="mb-1 font-bold text-primary">09</h5>
                    <h6 className="mb-0 font-normal dark:text-primary">Posts Created</h6>
                    <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <DescriptionOutlinedIcon className="h-2 w-2 text-black" style={{width:'40px',height:'40px'}} />
                        </span>
                    </div>
                    <h5 className="mb-1 font-bold text-primary">34</h5>
                    <h6 className="mb-0 font-normal dark:text-primary">Notes Shared</h6>
                    <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <VideocamOutlinedIcon className="h-2 w-2 text-black" style={{width:'40px',height:'40px'}} />
                        </span>
                    </div>
                    <h5 className="mb-1 font-bold text-primary">23</h5>
                    <h6 className="mb-0 font-normal dark:text-primary">Videos shared</h6>
                </div>
            </div>
            
        </div>
        <div className='flex  h-full items-center justify-between  '>
            <div className='  mr-6  ml-6 lg:mr=l-0' >
                <button className='  w-full  bg-custom-blue py-4 px-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-white mb-5 ml-15'>Add New Post</button>
                <button className='  w-full  bg-gray-200 py-4 px-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-primary ml-15'>Edit profile</button>
            </div>
            </div>
        </div>
        </div>
        
    );
}

export default DescriptionProfile;
