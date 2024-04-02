import './App.css'
import Home from './Pages/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createjob' element={<PostJob/>}/>
        <Route path='/viewjob' element={<ViewJob/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
