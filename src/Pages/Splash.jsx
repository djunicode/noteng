import React from 'react';
import { useNavigate } from 'react-router-dom';
import SplashImg1 from '../assets/splashimg-top.svg';
import SplashImg2 from '../assets/splashimg-bottom.svg';
const Splash = () => {
    const navigate = useNavigate();

    function loginClick() {
        navigate('/');
    }

    function signupClick() {
        navigate('/SignUp');
    }
    return (
        <div className="flex flex-col h-screen bg-custom-white">
            <div className="flex flex-row flex-1">
                <div className="flex justify-center items-center w-1/2">
                    <img src={SplashImg1} alt="Illustration" className="w-1/2" />
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                    <h1 className="text-6xl font-extrabold mb-10">NOTENG</h1>
                </div>
            </div>

            <div className="flex flex-row flex-1">
                <div className="flex flex-col justify-center items-end w-1/2">
                    <button onClick={loginClick} className="bg-custom-blue text-black px-20 py-4 w-1/3 rounded-md mb-4 font-bold">Login</button>
                    <button onClick={signupClick} className="bg-custom-gray text-black px-20 py-4 w-1/3 rounded-md mb-4 font-bold">SignUp</button>
                </div>
                <div className="flex justify-center items-center w-1/2">
                    <img src={SplashImg2} alt="Illustration" className="w-1/2" />
                </div>
            </div>
        </div>
    );
};

export default Splash;
