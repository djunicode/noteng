import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Choose one of the conflicting import statements

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Splash' element={<Splash />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/createpost' element={<NewPost />} />
        <Route path='/createjob' element={<PostJob />} />
        <Route path='/viewjob/:jobId' element={<ViewJob/>} />
        <Route path='/viewnote/:noteId' element={<ViewNote />} />
        <Route path='/UploadNewPosts' element={<UploadNewPosts />} />
        <Route path='/PostDetails' element={<PostDetails />} />
        <Route path='/profile' element={< Profile />} />
        <Route path='/createnote' element={< NewNotes />} />
        <Route path='/uploadvideo' element={< UploadVideo />} />
        <Route path='/DiscoverPage' element={<DiscoverPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
