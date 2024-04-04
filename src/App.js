import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostJob from './Pages/PostJob';
import ViewJob from './Pages/ViewJob';

import Register from './LoginPage/Register';
import Login from './LoginPage/Login';
import Layout from './LoginPage/Layout';
import Unauthorized from './LoginPage/Unauthorized';
import LinkPage from './LoginPage/LinkPage';
import RequireAuth from './LoginPage/RequireAuth';

const ROLES = {
  'User': 2001
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='/' element={<Home />} />
            <Route path='/createjob' element={<PostJob />} />
            <Route path='/viewjob' element={<ViewJob />} />        
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
