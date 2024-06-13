import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import '../../styles/profile.css';

function DescriptionProfile({ jobCount, postCount, noteCount, videoCount, userData, updateUser }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fname: userData.fname,
    lname: userData.lname,
    email: userData.email,
    phone: userData.phone
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://monilmeh.pythonanywhere.com/auth/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      updateUser(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-3 w-[100vw]'>
        <div className="flex flex-row justify-center">
          <div className="bg-gray-200 p-4 rounded-md max-w-[800px] ml-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative mb-12 px-3 lg:mb-0 text-center">
                <div className="mb-2 flex justify-center">
                  <span className="text-primary">
                    <WorkOutlineOutlinedIcon className="text-black" style={{ width: '40px', height: '40px' }} />
                  </span>
                </div>
                <h5 className="mb-1 font-bold text-primary">{jobCount}</h5>
                <h6 className="mb-0 font-normal dark:text-primary">Jobs Posted</h6>
                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
              </div>
              <div className="relative mb-12 px-3 lg:mb-0 text-center">
                <div className="mb-2 flex justify-center">
                  <span className="text-primary">
                    <PhotoSizeSelectActualOutlinedIcon className="text-black" style={{ width: '40px', height: '40px' }} />
                  </span>
                </div>
                <h5 className="mb-1 font-bold text-primary">{postCount}</h5>
                <h6 className="mb-0 font-normal dark:text-primary">Posts Created</h6>
                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
              </div>
              <div className="relative mb-12 px-3 lg:mb-0 text-center">
                <div className="mb-2 flex justify-center">
                  <span className="text-primary">
                    <DescriptionOutlinedIcon className="h-2 w-2 text-black" style={{ width: '40px', height: '40px' }} />
                  </span>
                </div>
                <h5 className="mb-1 font-bold text-primary">{noteCount}</h5>
                <h6 className="mb-0 font-normal dark:text-primary">Notes Shared</h6>
                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
              </div>
              <div className="relative mb-12 px-3 lg:mb-0 text-center">
                <div className="mb-2 flex justify-center">
                  <span className="text-primary">
                    <VideocamOutlinedIcon className="h-2 w-2 text-black" style={{ width: '40px', height: '40px' }} />
                  </span>
                </div>
                <h5 className="mb-1 font-bold text-primary">{videoCount}</h5>
                <h6 className="mb-0 font-normal dark:text-primary">Videos shared</h6>
              </div>
            </div>
          </div>
          <div className='flex h-full items-center justify-between'>
            <div className='mr-6 ml-6 lg:mr=l-0'>
              <button
                className='w-full bg-custom-blue py-4 px-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-white mb-5 ml-15'
                onClick={() => navigate('/createpost')}
              >
                Add New Post
              </button>
              <button
                className='w-full bg-gray-200 py-4 px-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-primary ml-15'
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEditProfile}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-custom-blue text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DescriptionProfile;
