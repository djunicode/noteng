import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
            <Route path='/' element={<Home />} />
            <Route path='/NewPost' element={<NewPost/>}/>
            <Route path='/createjob' element={<PostJob />} />
            <Route path='/viewjob' element={<ViewJob />} />        
           <Route path='/UploadNewPosts' element={<UploadNewPosts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
