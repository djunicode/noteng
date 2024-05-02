import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    function loginClick() {
        navigate('/');
    }

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 flex flex-col justify-center items-center">
                <h1 className="text-6xl py-4 px-40 font-bold mb-10">NOTENG</h1>
                <img src="/path/to/your/image.jpg" alt="Login" className="w-3/4" />
            </div>
            <div className="w-2/3 bg-white flex justify-center items-center">
                <div className="w-full max-w-xl p-8">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter e-mail" className="w-full py-2 px-4 border bg-gray-100 border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-medium">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter Password" className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-medium">Are you a?</label>
                            <select id="description" name="description" className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md">
                                <option value="">What would describe you the best?</option>
                                <option value="1">Student</option>
                                <option value="2">Teacher</option>
                                <option value="3">Professional</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 py-4 justify-center text-white px-4 rounded-md w-1/2" onClick={loginClick}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;