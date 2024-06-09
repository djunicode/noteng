import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';

function UploadNotes() {
  const [formData, setFormData] = useState({
    notesTitle: '',
    subject: '',
    department: '',
    notesDescription: '',
    average_rating: 4,
    document: null,
    user: '60004220207' // Assuming user ID is constant
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
      document: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/notes/';
    const form = new FormData();

    form.append('note_title', formData.notesTitle);
    form.append('subject', formData.subject);
    form.append('department', formData.department);
    form.append('note_description', formData.notesDescription);
    form.append('stars',formData.stars);
    form.append('document', formData.document);
    form.append('user', formData.user);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3OTMyMjc2LCJpYXQiOjE3MTc5MTA2NzYsImp0aSI6IjFkNjI5MWViOGQzYzQwNjc5OTQyN2U4YWFiYjQ2ODIxIiwidXNlcl9pZCI6IjYwMDA0MjIwMjA3In0.bK54XJ1-vnJjzGMhLdubn47FpZnxNgG1x4NZwnu1dsE'
        },
      });

      if (response.status === 201) {
        alert('Notes uploaded successfully!');
        setFormData({
          notesTitle: '',
          subject: '',
          department: '',
          notesDescription: '',
          average_rating:4,
          document: null,
          user: '60004220207'
        });
      } else {
        alert('Failed to upload notes');
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
    <div className='flex flex-col gap-3'>
      <p className='flex items-center justify-center md:justify-start md:ml-6'>
        <span className='flex font-bold text-[35px]'>Upload Notes</span>
      </p>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      <p className='text-[25px] ml-6'>Notes title</p>
      <input
        type='text'
        name='notesTitle'
        value={formData.notesTitle}
        onChange={handleChange}
        placeholder='Hint Text'
        className='border ml-6 p-4 rounded-tl-lg rounded-tr-lg mr-6 rounded-bl-lg rounded-br-lg bg-custom-gray'
      />
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col w-[100vw] lg:w-full gap-3'>
          <p className='text-[25px] ml-6'>Subject</p>
          <input
            type='text'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            placeholder='Hint Text'
            className='border ml-6 mr-6 p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'
          />
        </div>
        <div className='flex flex-col w-full gap-3'>
          <p className='text-[25px] ml-6'>Department</p>
          <input
            type='text'
            name='department'
            value={formData.department}
            onChange={handleChange}
            placeholder='Hint Text'
            className='border ml-6 p-4 rounded-tl-lg mr-6 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-custom-gray'
          />
        </div>
      </div>
      <p className='text-[25px] ml-6'>Notes Description</p>
      <input
        type='text'
        name='notesDescription'
        value={formData.notesDescription}
        onChange={handleChange}
        placeholder='Hint Text'
        className='border ml-6 p-4 rounded-tl-lg rounded-tr-lg mr-6 rounded-bl-lg rounded-br-lg bg-custom-gray'
      />
      <p className='text-[25px] ml-6'>Upload Document</p>
      <div className='flex gap-8 md:flex-row flex-col'>
        <div className='flex flex-row gap-2 justify-center md:flex-col ml-6 md:p-36 mb-4 p-20 mr-6 border-dotted border-x-2 border-y-2 border-gray-400 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg'>
          <CloudUploadOutlinedIcon />
          <button onClick={handleButtonClick}>Upload</button>
          <input
            type='file'
            onChange={handleFileChange}
            className='hidden'
            id='fileUpload'
          />
        </div>
        <div className='flex w-full h-full items-center justify-center'>
          <div className='w-full mr-6 ml-6 md:ml-0'>
            <button onClick={handleSubmit} className='w-full bg-custom-blue py-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-white'>Add New Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadNotes;
