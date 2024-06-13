import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg1 from '../assets/loginimg-top.svg';
import LoginImg2 from '../assets/loginimg-bottom.svg';

const LoginPage = ({ onLoginChange }) => {
    const navigate = useNavigate();
    const [sapid, setSapid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            sapid,
            password
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
                onLoginChange(true); // Call the onLoginChange callback with true to indicate user is logged in
                localStorage.setItem('isLoggedIn', 'true'); // Persist login state in local storage
                localStorage.setItem('token', data.access); // Persist token in local storage
                localStorage.setItem('sapid', sapid); // Persist SAP ID in local storage
                navigate('/Home'); // Redirect to homepage after successful login
            } else {
                setError('Invalid credentials'); // Set error message for wrong credentials
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            setError('An unexpected error occurred'); // Set error message for uncaught errors
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-white flex-col justify-center items-center overflow-hidden ">
            <div className="h-1/4 p-20 flex flex-row justify-center sm:justify-between items-center">
                <h1 className="text-3xl sm:text-6xl font-extrabold mb-6">NOTENG</h1>
                <div className="w-1/3 py-10 hidden sm:flex sm:flex-col justify-between items-center">
                    <img src={LoginImg1} alt="Login" className="w-3/4" />
                </div>
            </div>
            <div className='h-1/3'>
                <form className="w-full sm:w-2/3 mb-6 ml-6 pr-6 sm:pr-0" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="sapid" className="block font-medium">SAP ID</label>
                        <input
                            type="text"
                            id="sapid"
                            name="sapid"
                            placeholder="Enter SAP ID"
                            className="w-full py-2 px-4 border bg-gray-100 border-gray-300 rounded-md"
                            value={sapid}
                            onChange={(e) => setSapid(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>} {/* Render error message if error state is set */}
                </form>
            </div>
            <div className='h-1/3 flex flex-col sm:flex-row justify-center items-center sm:items-start w-full'>
                <div className="w-full sm:w-1/3 flex flex-col items-center">
                    <span className="text-s cursor-pointer mb-2">Forgot your password?</span>
                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mb-6 ml-6 pr-6 sm:pr-0 rounded"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-between items-center">
                    <img src={LoginImg2} alt="Login" className="w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
