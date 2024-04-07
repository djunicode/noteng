import './App.css'
import Home from './Pages/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
<<<<<<< HEAD
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';

=======
>>>>>>> 290f7b5b6760637f9cb9858b2b669fa12e27c5a4
function App() {
  return (
   <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        
            <Route path='/' element={<Home />} />
            <Route path='/NewPost' element={<NewPost/>}/>
            <Route path='/createjob' element={<PostJob />} />
            <Route path='/viewjob' element={<ViewJob />} />        
           <Route path='/UploadNewPosts' element={<UploadNewPosts/>}/>
=======
        <Route path='/' element={<Home/>}/>
        <Route path='/createjob' element={<PostJob/>}/>
        <Route path='/viewjob' element={<ViewJob/>}/>
>>>>>>> 290f7b5b6760637f9cb9858b2b669fa12e27c5a4
      </Routes>
   </BrowserRouter>
  );
}

export default App;
