import React from 'react'

function Discover() {
  return (
    <div className='flex w-full'>
        
        <div className='flex  lg:flex-col justify-center  md:justify-start w-full' >
       
        <div className='flex flex-col justify-center lg:justify-start '>
        <p className='ml-3 font-bold text-[35px] border-b-2 w-full'>Discover</p>
            <div className='flex flex-col md:flex-row border-b-2 w-full pb-4'>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-blue text-white' >
                <p>All </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>Comps </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>IT </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>AIML </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>CSDS </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>AIML </p>
            </div>
            </div>
            <div className='flex flex-col md:flex-row border-b-2 w-full pb-4'>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-blue text-white' >
                <p>Jobs </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>Posts </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>Notes </p>
            </div>
            <div className=' ml-3 mt-4 px-10 py-1 rounded-lg bg-custom-gray' >
                <p>Videos </p>
            </div>
            
            </div>
        </div>
        </div>
    </div>
  )
}

export default Discover