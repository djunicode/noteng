import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';
import LoginPage from './Pages/LoginPage';
import Profile from './Pages/profile';
import NewNotes from './Components/Notes/NewNotes';
import ViewNote from './Components/Notes/ViewNote';
import UploadVideo from './Pages/UploadVideo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/createpost' element={<NewPost />} />
        <Route path='/createjob' element={<PostJob />} />
        <Route path='/viewjob' element={<ViewJob />} />
        <Route path='/viewnote' element={<ViewNote />} />
        <Route path='/UploadNewPosts' element={<UploadNewPosts />} />
        <Route path='/profile' element={< Profile />} />
        <Route path='/createnote' element={< NewNotes />} />
        <Route path='/uploadvideo' element={< UploadVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
