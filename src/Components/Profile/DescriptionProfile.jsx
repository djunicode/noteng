import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import '../../styles/profile.css';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';

function DescriptionProfile({ jobCount, postCount, noteCount, videoCount, userData, updateUser, isLoading }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null
  const [hasChanges, setHasChanges] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fname: userData.fname || '',
    lname: userData.lname || '',
    email: userData.email || '',
    phone: userData.phone || ''
  });

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  useEffect(() => {
    // Update form data when userData changes
    setFormData({
      fname: userData.fname || '',
      lname: userData.lname || '',
      email: userData.email || '',
      phone: userData.phone || ''
    });
  }, [userData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fname?.trim()) errors.fname = 'First name is required';
    if (!formData.lname?.trim()) errors.lname = 'Last name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Phone number is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setHasChanges(true);
  };

  const handleCloseModal = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        setIsModalOpen(false);
        setHasChanges(false);
      }
    } else {
      setIsModalOpen(false);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('https://monilmeh.pythonanywhere.com/auth/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const data = await response.json();
      updateUser(data);
      setIsSubmitting(false);
      setFormStatus('success');
      setHasChanges(false);
      
      // Close modal after showing success message
      setTimeout(() => setIsModalOpen(false), 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSubmitting(false);
      setFormStatus('error');
    }
  };

  // Skeleton loader component for stats
  const StatSkeleton = () => (
    <div className="animate-pulse stat-card flex flex-row md:flex-col items-center p-4 rounded-lg bg-gray-100">
      <div className="bg-gray-200 p-3 rounded-full md:mb-3 mr-4 md:mr-0 h-[46px] w-[46px]"></div>
      <div className="flex flex-col md:items-center w-full">
        <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className='flex flex-col gap-3 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-xl w-full md:w-3/4 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {isLoading ? (
                <>
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                </>
              ) : (
                <>
                  {/* Job card with tooltip */}
                  <Tooltip title="Jobs you've posted" arrow placement="top">
                    <div className="stat-card flex flex-row md:flex-col items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-md transition-all hover:translate-y-[-5px]">
                      <div className="bg-blue-100 p-3 rounded-full md:mb-3 mr-4 md:mr-0">
                        <WorkOutlineOutlinedIcon className="text-blue-600" style={{ width: '30px', height: '30px' }} />
                      </div>
                      <div className="flex flex-col md:items-center">
                        <h5 className="text-2xl font-bold text-gray-800">{jobCount}</h5>
                        <h6 className="text-sm font-medium text-gray-600">Jobs Posted</h6>
                      </div>
                    </div>
                  </Tooltip>
                  
                  {/* Post card with tooltip */}
                  <Tooltip title="Your social media posts" arrow placement="top">
                    <div className="stat-card flex flex-row md:flex-col items-center p-4 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 hover:shadow-md transition-all hover:translate-y-[-5px]">
                      <div className="bg-indigo-100 p-3 rounded-full md:mb-3 mr-4 md:mr-0">
                        <PhotoSizeSelectActualOutlinedIcon className="text-indigo-600" style={{ width: '30px', height: '30px' }} />
                      </div>
                      <div className="flex flex-col md:items-center">
                        <h5 className="text-2xl font-bold text-gray-800">{postCount}</h5>
                        <h6 className="text-sm font-medium text-gray-600">Posts Created</h6>
                      </div>
                    </div>
                  </Tooltip>
                  
                  {/* Note card with tooltip */}
                  <Tooltip title="Your shared study notes" arrow placement="top">
                    <div className="stat-card flex flex-row md:flex-col items-center p-4 rounded-lg bg-gradient-to-r from-sky-50 to-sky-100 hover:shadow-md transition-all hover:translate-y-[-5px]">
                      <div className="bg-sky-100 p-3 rounded-full md:mb-3 mr-4 md:mr-0">
                        <DescriptionOutlinedIcon className="text-sky-600" style={{ width: '30px', height: '30px' }} />
                      </div>
                      <div className="flex flex-col md:items-center">
                        <h5 className="text-2xl font-bold text-gray-800">{noteCount}</h5>
                        <h6 className="text-sm font-medium text-gray-600">Notes Shared</h6>
                      </div>
                    </div>
                  </Tooltip>
                  
                  {/* Video card with tooltip */}
                  <Tooltip title="Your uploaded videos" arrow placement="top">
                    <div className="stat-card flex flex-row md:flex-col items-center p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-cyan-100 hover:shadow-md transition-all hover:translate-y-[-5px]">
                      <div className="bg-cyan-100 p-3 rounded-full md:mb-3 mr-4 md:mr-0">
                        <VideocamOutlinedIcon className="text-cyan-600" style={{ width: '30px', height: '30px' }} />
                      </div>
                      <div className="flex flex-col md:items-center">
                        <h5 className="text-2xl font-bold text-gray-800">{videoCount}</h5>
                        <h6 className="text-sm font-medium text-gray-600">Videos Shared</h6>
                      </div>
                    </div>
                  </Tooltip>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col gap-3 w-full md:w-1/4'
          >
            <button
              className='w-full border-2 border-custom-blue bg-transparent hover:bg-blue-50 py-3 px-6 rounded-lg text-custom-blue font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center group'
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
            >
              <span className="relative inline-block">
                Edit Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-blue transition-all group-hover:w-full"></span>
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg relative overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none transition-all hover:bg-gray-100 p-1 rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>
              
              <form onSubmit={handleEditProfile}>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all ${formErrors.fname ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.fname && <p className="text-red-500 text-xs mt-1">{formErrors.fname}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all ${formErrors.lname ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.lname && <p className="text-red-500 text-xs mt-1">{formErrors.lname}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 1234567890"
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
                
                {/* Status message with improved animation */}
                <AnimatePresence>
                  {formStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`px-6 py-3 ${formStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} flex items-center`}
                    >
                      {formStatus === 'success' ? (
                        <>
                          <CheckCircleIcon className="mr-2" fontSize="small" />
                          Profile updated successfully!
                        </>
                      ) : (
                        <>
                          <ErrorIcon className="mr-2" fontSize="small" />
                          Failed to update profile. Please try again.
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 bg-custom-blue text-white rounded-lg transition-all flex items-center justify-center min-w-[100px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : null}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DescriptionProfile;
