import React,{useState} from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
function NewPost() {
  const [formData, setFormData] = useState({
    postTitle: '',
    postCategory: '',
    postDescription: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://monilmeh.pythonanywhere.com//api/posts';
    const form = new FormData();

    form.append('post_title', formData.postTitle);
    form.append('category', formData.postCategory);
    form.append('description', formData.postDescription);
    form.append('document', formData.document);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3OTMyMjc2LCJpYXQiOjE3MTc5MTA2NzYsImp0aSI6IjFkNjI5MWViOGQzYzQwNjc5OTQyN2U4YWFiYjQ2ODIxIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.bK54XJ1-vnJjzGMhLdubn47FpZnxNgG1x4NZwnu1dsE'
        },
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        setFormData({
          postTitle: '',
          postCategory: '',
          postDescription: '',
          document: null,
        });
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileUpload').click();
  };
  return (
    <div className='flex flex-col gap-3 w-[100vw] '>
         <p className=' flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold text-[35px] '>Create New Post</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <p className='text-[25px] ml-6'>Post title</p>
      <input type='text' 
       name='postTitle'
       value={formData.postTitle}
       onChange={handleChange}
      placeholder='Enter Post Title' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
      <p className='text-[25px] ml-6'>Post Category</p>
      <input type='text' 
      name='postCategory'
      value={formData.postCategory}
      onChange={handleChange}
      placeholder='Enter Post Category' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
      <p className='text-[25px] ml-6'>Post Description</p>
      <input type='text' 
       name='postDescription'
       value={formData.postDescription}
      onChange={handleChange}
      placeholder='Enter Post Description' className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'></input>
        <p className='text-[25px] ml-6'>Upload Images</p>
        <div className='flex gap-8 md:flex-row flex-col'>
            
            <div className='flex flex-row gap-2 justify-center md:flex-col ml-6 mb-3 md:p-36 p-20 mr-6 md:mr-0  border-dotted border-x-2 border-y-2 border-gray-400 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                <CloudUploadOutlinedIcon/>
                <button onClick={handleButtonClick}>Upload</button>
                <input
              type='file'
              onChange={handleFileChange}
              className='hidden'
              id='fileUpload'
            />
            </div>
            <div className='flex w-full h-full items-center justify-center '>
          <div className=' w-full mr-6  ml-6 lg:mr=l-0' >
                <button onClick={handleSubmit} className='  w-full  bg-custom-blue py-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-white'>Add New Post</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NewPost