
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

function PostCard({ post, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/postdetails/${post.post_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(post.post_id);
  };

  return (
    <div className='border p-4 rounded-lg shadow bg-gray-300 cursor-pointer' onClick={handleCardClick}>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <DeleteIcon className='text-[#394dfd] cursor-pointer hover:text-red-500' onClick={handleDeleteClick} />
        </div>
        <img src={post.image} alt={post.title} className='w-full h-40 object-cover rounded-t-lg' /> {/* Added image display */}
        <h2 className='font-bold mt-2'>{post.title}</h2>
        <p className='text-sm border-b-[1px] pb-3 border-custom-blue'>{post.description.substring(0, 60)}...</p>
        <div className='flex justify-between mt-2'>
          <div className='flex items-center'>
            <FavoriteBorderOutlinedIcon className='text-custom-blue' style={{ width: '20px', height: '20px' }} />
            <p className='text-custom-blue font-bold'>{post.likes} Likes</p>
          </div>
          <div className='flex items-center'>
            <p className='text-custom-blue font-bold'>Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;