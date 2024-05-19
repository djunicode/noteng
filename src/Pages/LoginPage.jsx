import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg1 from '../assets/loginimg-top.svg';
import LoginImg2 from '../assets/loginimg-bottom.svg';

const LoginPage = () => {
    const navigate = useNavigate();

    function loginClick() {
        navigate('/');
    }

    return (
        <div className="w-full h-screen bg-white flex-col justify-center items-center overflow-hidden">
            <div className="h-1/4 p-20 flex flex-row justify-between items-center">
                <h1 className="text-6xl font-extrabold mb-6">NOTENG</h1>
                <div className="w-1/3 py-10 flex flex-col justify-between items-center">
                    <img src={LoginImg1} alt="Login" className="w-3/4" />
                </div>
            </div>
            <div className='h-1/3'>
                <form className="w-2/3 mb-6 ml-6">
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter e-mail" className="w-full py-2 px-4 border bg-gray-100 border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md" />
                    </div>
                </form>
            </div>
            <div className='h-1/3 flex flex-row justify-around items-start w-full'>
                <div className="w-1/8 flex flex-col items-center">
                    <button type="submit" className="bg-custom-blue py-4 w-full justify-center text-white px-20 rounded-md" onClick={loginClick}>Login</button>
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
