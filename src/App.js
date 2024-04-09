import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';
import NewPost from './Pages/NewPostPage';
import UploadNewPosts from './Pages/UploadNewPosts';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>Noteng</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link className="nav-link" to={'/sign-in'}>Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to={'/sign-up'}>Sign up</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/Login" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/NewPost' element={<NewPost />} />
        <Route path='/createjob' element={<PostJob />} />
        <Route path='/viewjob' element={<ViewJob />} />
        <Route path='/UploadNewPosts' element={<UploadNewPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
