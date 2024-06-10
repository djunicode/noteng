import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import NewNotes from './Components/Notes/NewNotes';
import ViewNote from './Components/Notes/ViewNote';
import UploadVideo from './Pages/UploadVideo';
import DiscoverPage from './Pages/DiscoverPage';
import Splash from './Pages/Splash';
import LoginPage from './Pages/LoginPage';
import PostDetails from './Pages/PostDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Routes>
        <Route path='/Splash' element={<Splash />} />
        <Route path='/LoginPage' element={<LoginPage onLoginChange={handleLoginChange} />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/createpost' element={isLoggedIn ? <NewPost /> : <Navigate to="/LoginPage" />} />
        <Route path='/createjob' element={isLoggedIn ? <PostJob /> : <Navigate to="/LoginPage" />} />
        <Route path='/viewjob/:jobId' element={isLoggedIn ? <ViewJob /> : <Navigate to="/LoginPage" />} />
        <Route path='/viewnote/:noteId' element={isLoggedIn ? <ViewNote /> : <Navigate to="/LoginPage" />} />
        <Route path='/UploadNewPosts' element={isLoggedIn ? <UploadNewPosts /> : <Navigate to="/LoginPage" />} />
        <Route path='/PostDetails' element={isLoggedIn ? <PostDetails /> : <Navigate to="/LoginPage" />} />
        <Route path='/Profile' element={isLoggedIn ? <Profile /> : <Navigate to="/LoginPage" />} />
        <Route path='/createnote' element={isLoggedIn ? <NewNotes /> : <Navigate to="/LoginPage" />} />
        <Route path='/uploadvideo' element={isLoggedIn ? <UploadVideo /> : <Navigate to="/LoginPage" />} />
        <Route path='/DiscoverPage' element={isLoggedIn ? <DiscoverPage /> : <Navigate to="/LoginPage" />} />
        <Route path='/Home' element={isLoggedIn ? <Home /> : <Navigate to="/Splash" />} />
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/Splash" />} />
      </Routes>
    </Router>
  );
}

export default App;
