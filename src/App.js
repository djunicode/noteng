import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';
import SignUp from './Pages/SignUp';
import Profile from './Pages/profile';
import NewNotes from './Components/Notes/NewNotes';
import ViewNote from './Components/Notes/ViewNote';
import UploadVideo from './Pages/UploadVideo';
import DiscoverPage from './Pages/DiscoverPage';
import Splash from './Pages/Splash';
import LoginPage from './Pages/LoginPage';
import PostDetails from './Pages/PostDetails';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedLogin, setCheckedLogin] = useState(false);

  useEffect(() => {
    // Check local storage for login state
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setCheckedLogin(true);
  }, []); // Run only once on component mount

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state
  };

  return (
    <Router>
      {checkedLogin && ( // Render the routes only after checking the login status
        <Routes>
          <Route path='/Home' element={isLoggedIn ? <Home /> : <Navigate to="/Splash" />} />
          <Route path='/Splash' element={<Splash />} />
          <Route path='/LoginPage' element={<LoginPage onLoginChange={handleLogin} />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/CreatePost' element={isLoggedIn ? <NewPost /> : <Navigate to="/LoginPage" />} />
          <Route path='/CreateJob' element={isLoggedIn ? <PostJob /> : <Navigate to="/LoginPage" />} />
          <Route path='/ViewJob/:jobId' element={isLoggedIn ? <ViewJob /> : <Navigate to="/LoginPage" />} />
          <Route path='/ViewNote/:noteId' element={isLoggedIn ? <ViewNote /> : <Navigate to="/LoginPage" />} />
          <Route path='/UploadNewPosts' element={isLoggedIn ? <UploadNewPosts /> : <Navigate to="/LoginPage" />} />
          <Route path='/PostDetails/:postId' element={isLoggedIn ? <PostDetails /> : <Navigate to="/LoginPage" />} />
          <Route path='/Profile' element={isLoggedIn ? <Profile /> : <Navigate to="/LoginPage" />} />
          <Route path='/CreateNote' element={isLoggedIn ? <NewNotes /> : <Navigate to="/LoginPage" />} />
          <Route path='/UploadVideo' element={isLoggedIn ? <UploadVideo /> : <Navigate to="/LoginPage" />} />
          <Route path='/DiscoverPage' element={isLoggedIn ? <DiscoverPage /> : <Navigate to="/LoginPage" />} />
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/Splash" />} />
          <Route path='/post/:id' element={isLoggedIn ? <PostDetails /> : <Navigate to="/LoginPage" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
