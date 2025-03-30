import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Posts({ posts = [], onDelete, isAdmin }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  const postItems = posts.map((post) => ({
    heading1: post.title,
    id: post.post_id,
    body: post.description,
    icon: <FavoriteBorderOutlinedIcon className="text-blue-500" style={{ width: '20px', height: '20px' }} />,
    timelimit: post.likes,
    category: post.subtype,
    url: post.post_url,
    deadlines: post.deadline,
    image: post.image,
    uploadDate: post.upload_time,
  }));

  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 gap-5 m-10 md:grid-cols-2 md:gap-8'>
        {postItems.length === 0 ? (
          <h1 className='flex justify-center items-center self-center font-semibold text-xl md:text-2xl lg:text-3xl col-span-2'>
            No posts found that match your criteria.
          </h1>
        ) : (
          postItems.map((data, i) => (
            <div
              className='transition-shadow duration-300'
              key={i}
              onClick={() => handleCardClick(data.id)}
            >
              <div className='border p-4 rounded-lg bg-gray-300 w-full shadow hover:shadow-md transition-shadow cursor-pointer relative flex flex-col h-[550px]'>
                {isAdmin && (
                  <div className='absolute top-3 right-3 z-10'>
                    <DeleteIcon 
                      className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                      onClick={(e) => handleDelete(e, data.id)} 
                    />
                  </div>
                )}
                
                <div className='flex justify-between items-center mb-3'>
                  <p className='font-bold text-lg line-clamp-1'>{data.heading1}</p>
                  {data.uploadDate && (
                    <span className='text-xs text-gray-600'>
                      {new Date(data.uploadDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className='h-64 mb-4 flex-shrink-0'>
                  <img 
                    src={data.image} 
                    alt={data.heading1} 
                    className='w-full h-full object-cover rounded-lg transition-transform duration-300' 
                  />
                </div>
                
                <div className='mb-4 flex-grow overflow-hidden'>
                  <p className='text-sm md:text-base pb-3 line-clamp-4'>{data.body}</p>
                </div>
                
                {data.url && (
                  <p className='font-medium text-base mb-3 text-gray-700 overflow-hidden text-ellipsis hover:text-[#394dfd] line-clamp-1'>{data.url}</p>
                )}
                
                <div className='flex justify-between mt-auto'>
                  <div className='flex items-center'>
                    {data.icon}
                    <p className='text-gray-700 font-medium ml-1'>{data.timelimit}</p>
                  </div>
                  <p className='text-gray-700 font-medium'>{data.category}</p>
                  {data.deadlines && (
                    <p className='text-gray-700 font-medium'>{data.deadlines}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Posts;
