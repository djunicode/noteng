import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg1 from '../assets/loginimg-top.svg';
import LoginImg2 from '../assets/loginimg-bottom.svg';

const LoginPage = ({ onLoginChange }) => {
    const navigate = useNavigate();
    const [sapid, setSapid] = useState('');
    const [password, setPassword] = useState('');

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
                navigate('/Home'); // Redirect to homepage after successful login
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-white flex-col justify-center items-center overflow-hidden">
            <div className="h-1/4 p-20 flex flex-row justify-between items-center">
                <h1 className="text-6xl font-extrabold mb-6">NOTENG</h1>
                <div className="w-1/3 py-10 flex flex-col justify-between items-center">
                    <img src={LoginImg1} alt="Login" className="w-3/4" />
                </div>
            </div>
            <div className='h-1/3'>
                <form className="w-2/3 mb-6 ml-6" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="bg-custom-blue py-4 w-full justify-center text-white px-20 rounded-md"
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className='h-1/3 flex flex-row justify-around items-start w-full'>
                <div className="w-1/8 flex flex-col items-center">
                    <span className="text-xs">Forgot your password?</span>
                </div>
                <div className="w-1/2 flex flex-col justify-between items-center">
                    <img src={LoginImg2} alt="Login" className="w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
