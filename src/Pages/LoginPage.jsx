import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg1 from '../assets/loginimg-top.svg';
import LoginImg2 from '../assets/loginimg-bottom.svg';

const LoginPage = ({ onLoginChange }) => {
  const navigate = useNavigate();
  const [sapid, setSapid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [modalError, setModalError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      sapid,
      password,
    };

    try {
      const response = await fetch('https://monilmeh.pythonanywhere.com/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        onLoginChange(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', data.access);
        localStorage.setItem('sapid', sapid);
        navigate('/Home');
      } else {
        setError('Invalid credentials');
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    setModalError('');
    try {
      const response = await fetch('https://monilmeh.pythonanywhere.com/auth/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setModalScreen('otp');
      } else {
        setModalError('Failed to send reset email. Please try again.');
      }
    } catch (error) {
      setModalError('An unexpected error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setModalError('');
    try {
      const response = await fetch('https://monilmeh.pythonanywhere.com/auth/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, new_password }),
      });

      if (response.ok) {
        alert('Password reset successful!');
        setIsModalOpen(false);
        setEmail('');
        setOtp('');
        setNewPassword('');
      } else {
        setModalError('Failed to verify OTP or reset password. Please try again.');
      }
    } catch (error) {
      setModalError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center overflow-hidden">
      <div className="h-1/4 p-20 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <h1 className="text-3xl sm:text-6xl font-extrabold mb-6">NOTENG</h1>
        <div className="w-1/3 py-10 hidden sm:flex sm:flex-col justify-between items-center">
          <img src={LoginImg1} alt="Login" className="w-3/4" />
        </div>
      </div>
      <div className='h-1/3'>
        <form className="w-full sm:w-2/3 mb-6 ml-6 pr-6 sm:pr-0" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sapid" className="block font-medium ml-10 text-xl">SAP ID</label>
            <input
              type="text"
              id="sapid"
              name="sapid"
              placeholder="Enter SAP ID"
              className="w-[90%] ml-10 py-2 px-4 border bg-gray-100 border-gray-300 rounded-md"
              value={sapid}
              onChange={(e) => setSapid(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-xl ml-10">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-[90%] ml-10 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 ml-10">*Invalid SAPID or Password </p>} {/* Render error message if error state is set */}
          <button
            type="submit"
            className="w-full sm:w-[90%] ml-10 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          >
            Login
          </button>
        </form>
      </div>
      <div className='h-1/3 flex flex-col sm:flex-row justify-center items-center sm:items-start w-full'>
        <div className="w-full sm:w-1/3 flex flex-col items-center">
          <span
            className="text-s cursor-pointer mb-2"
            onClick={() => setIsModalOpen(true)}
          >
            Forgot your password?
          </span>
          <span
            className="text-s cursor-pointer"
            onClick={() => navigate('/SignUp')}
          >
            Don't have an account? Sign Up
          </span>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-between items-center">
          <img src={LoginImg2} alt="Login" className="w-3/4" />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            {modalScreen === 'email' ? (
              <>
                <div className='flex flex-row justify-between'>
                  <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                  <button onClick={() => setIsModalOpen(false)}>X</button>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {modalError && <p className="text-red-500 mb-4">{modalError}</p>}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleForgotPassword}
                  >
                    Send OTP
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-row justify-between'>
                  <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
                  <button onClick={() => setIsModalOpen(false)}>X</button>
                </div>
                <div className="mb-4">
                  <label htmlFor="otp" className="block font-medium">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter the OTP"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new_password" className="block font-medium">New Password</label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    placeholder="Enter new password"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {modalError && <p className="text-red-500 mb-4">{modalError}</p>}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
