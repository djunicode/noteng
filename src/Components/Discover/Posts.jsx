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
  }));

  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 gap-5 m-10 md:grid-cols-2 md:gap-10'>
        {postItems.length === 0 ? (
          <h1 className='flex justify-center items-center self-center font-semibold text-xl md:text-2xl lg:text-3xl col-span-2'>
            No posts found that match your criteria.
          </h1>
        ) : (
          postItems.map((data, i) => (
            <div
              className='flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2 cursor-pointer'
              key={i}
              onClick={() => handleCardClick(data.id)}
            >
              <div className='border p-4 rounded-lg bg-gray-300 w-full shadow hover:shadow-lg transition-shadow'>
                <div className='flex justify-between items-center mb-3'>
                  <p className='font-bold text-lg'>{data.heading1}</p>
                  {isAdmin && (
                    <DeleteIcon 
                      className='text-[#394dfd] cursor-pointer hover:text-red-500' 
                      onClick={(e) => handleDelete(e, data.id)} 
                    />
                  )}
                </div>
                
                <div className='flex flex-col items-center mb-4'>
                  <img src={data.image} alt={data.heading1} className='w-full h-80 object-cover rounded-lg mb-3' />
                </div>
                
                <div className='mb-4'>
                  <p className='text-sm md:text-base border-b-[1px] pb-3 border-custom-blue'>{data.body}</p>
                </div>
                
                {data.url && (
                  <p className='font-medium text-base mb-3 text-custom-blue overflow-hidden text-ellipsis'>{data.url}</p>
                )}
                
                <div className='flex justify-between mt-3'>
                  <div className='flex items-center'>
                    {data.icon}
                    <p className='text-custom-blue font-medium ml-1'>{data.timelimit}</p>
                  </div>
                  <p className='text-custom-blue font-medium'>{data.category}</p>
                  {data.deadlines && (
                    <p className='text-custom-blue font-medium'>{data.deadlines}</p>
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
