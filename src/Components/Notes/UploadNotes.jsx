import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadNotes() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    notesTitle: '',
    subject: '',
    department: '',
    notesDescription: '',
    rating: 4,
    document: null,
    type: '',
    user: '60004220207' // Assuming user ID is constant
  });
  const [fileName, setFileName] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document: file
    });
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/notes/';
    const form = new FormData();

    form.append('note_title', formData.notesTitle);
    form.append('subject', formData.subject);
    form.append('department', formData.department);
    form.append('note_description', formData.notesDescription);
    form.append('type', formData.type);
    form.append('document', formData.document);
    form.append('user', formData.user);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        alert('Notes uploaded successfully!');
        navigate('/');
        setFormData({
          notesTitle: '',
          subject: '',
          department: '',
          notesDescription: '',
          rating: 4,
          type: '',
          document: null,
          user: '60004220207'
        });
        setFileName('');
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
        placeholder='Enter Notes title'
        className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col w-[100vw] lg:w-full gap-3'>
          <p className='text-[25px] ml-6'>Subject</p>
          <input
            type='text'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            placeholder='Enter Subject'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='flex flex-col w-full gap-3'>
          <p className='text-[25px] ml-6'>Department</p>
          <input
            type='text'
            name='department'
            value={formData.department}
            onChange={handleChange}
            placeholder='Enter Department'
            className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
      </div>
      <p className='text-[25px] ml-6'>Notes Description</p>
      <input
        type='text'
        name='notesDescription'
        value={formData.notesDescription}
        onChange={handleChange}
        placeholder='Enter Notes Description'
        className='border ml-6 mr-6 inputarea bg-white border-gray-100 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      <p className='text-[25px] ml-6'>Upload Document</p>
      <div className='flex gap-8 md:flex-row flex-col'>
        <div className='flex flex-row gap-2 justify-center md:flex-col ml-6 md:p-36 mb-4 p-20 mr-6 border-dotted border-x-2 border-y-2 border-gray-400 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg' onClick={handleButtonClick}>
          <div className='flex flex-col items-center'>
          <CloudUploadOutlinedIcon />
          <button>Upload</button>
          <input
            type='file'
            onChange={handleFileChange}
            className='hidden'
            id='fileUpload'
          />
          </div>
        
           {fileName && (
          <p className='ml-6 text-green-500'>File Uploaded: {fileName}</p>
        )}
           
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
