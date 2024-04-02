import './App.css'
import Home from './Pages/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import PostJob from './Pages/PostJob/PostJob';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createjob' element={<PostJob/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
