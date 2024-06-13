import React from 'react';
import PostCard from './PostCard';

function MyPosts({ posts,onDelete }) {
  const handleDeletePost = (postId) => {
    // Implement delete logic here (similar to MyJobs component)
    console.log(`Deleting post with ID ${postId}`);
  };

  return (
    <div className='flex flex-col'>
      <p className='flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold'>My Created Posts</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <div className='flex flex-col gap-5 ml-10 mr-10 md:flex-row md:ml-1 mt-4 md:justify-evenly'>
        {posts.map((post, i) => (
          <div className='relative flex justify-evenly mr-1 ml-1 md:mr-2 md:ml-2 lg:mr-4 lg:ml-2' key={i}>
            <PostCard post={post} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;