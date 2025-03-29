import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../Components/Home/Sidebar'
import JobOpportunity from '../Components/Home/JobOpportunity'
import LatestPosts from '../Components/Home/LatestPosts'
import ShareNotes from '../Components/Home/ShareNotes'
import SharedResources from '../Components/Home/SharedResources'
import SearchBar from '../Components/Home/SearchBar'

function Home() {
  const navigate = useNavigate();
  const [isValidatingAuth, setIsValidatingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check token validity on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    
    // If no token or not logged in, redirect immediately
    if (!isLoggedIn || !token) {
      console.log("No authentication token found, redirecting to landing page");
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/landing');
      return;
    }
    
    // Validate token by making a simple API request
    const validateToken = async () => {
      try {
        // Try to fetch some data using the token
        await axios.get('https://monilmeh.pythonanywhere.com/api/posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // If successful, token is valid
        setIsAuthenticated(true);
        setIsValidatingAuth(false);
      } catch (error) {
        // If error, token is likely invalid - log the user out
        console.log("Authentication error detected, logging out user");
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/landing');
      }
    };
    
    validateToken();
  }, [navigate]);

  // Show loading state while validating authentication
  if (isValidatingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-blue"></div>
      </div>
    );
  }

  // Only render content if authenticated
  if (!isAuthenticated) {
    return null; // This will prevent any child components from rendering before redirecting
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar/>
      <div className='flex flex-col overflow-y-scroll h-[100vh] w-full'>
        <div className='flex justify-center w-full'>
          <SearchBar/>
        </div>
        <div className='w-[95%] mx-auto'>
          <JobOpportunity/>
          <LatestPosts/>
          <ShareNotes/>
          <SharedResources/>
        </div>
      </div>
    </div>
  )
}

export default Home