import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    function loginClick() {
        navigate('/');
    }

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 py-10 flex flex-col justify-between items-center">
                <h1 className="text-6xl  px-40 justify-center font-extrabold mb-10">NOTENG</h1>
                <img src="/path/to/your/image.jpg" alt="Login" className="w-3/4" />
            </div>
            <div className="w-2/3 bg-white flex justify-center items-center">
                <div className="w-full p-20">
                    <form >
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
                    </form>
                    <button type="submit" className="bg-custom-blue py-4 justify-center text-white px-20 rounded-md w-1/4" onClick={loginClick}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;