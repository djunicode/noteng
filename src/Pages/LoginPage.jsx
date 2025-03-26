import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg1 from '../assets/loginimg-top.svg';
import LoginImg2 from '../assets/loginimg-bottom.svg';

const LoginPage = ({ onLoginChange }) => {
    const navigate = useNavigate();
    // Form states
    const [sapid, setSapid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalScreen, setModalScreen] = useState('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [modalError, setModalError] = useState('');
    const [isModalLoading, setIsModalLoading] = useState(false);
    
    // Form validation
    const [formErrors, setFormErrors] = useState({
        sapid: '',
        password: ''
    });

    const validateForm = () => {
        let valid = true;
        const errors = { sapid: '', password: '' };
        
        if (!sapid.trim()) {
            errors.sapid = 'SAP ID is required';
            valid = false;
        }
        
        if (!password) {
            errors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            valid = false;
        }
        
        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        const loginData = { sapid, password };

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
            setError('An unexpected error occurred. Please check your internet connection.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        setModalError('');
        if (!email.trim()) {
            setModalError('Please enter a valid email address');
            return;
        }
        
        setIsModalLoading(true);
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
                setModalError('Failed to send reset email. Please check your email address and try again.');
            }
        } catch (error) {
            setModalError('An unexpected error occurred. Please try again.');
        } finally {
            setIsModalLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setModalError('');
        if (!otp.trim()) {
            setModalError('Please enter the OTP');
            return;
        }
        if (!new_password || new_password.length < 6) {
            setModalError('Password must be at least 6 characters');
            return;
        }
        
        setIsModalLoading(true);
        try {
            const response = await fetch('https://monilmeh.pythonanywhere.com/auth/verify-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, new_password }),
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEmail('');
                setOtp('');
                setNewPassword('');
                // Show success toast or message
                alert('Password reset successful! Please login with your new password.');
            } else {
                setModalError('Failed to verify OTP or reset password. Please check and try again.');
            }
        } catch (error) {
            setModalError('An unexpected error occurred. Please try again.');
        } finally {
            setIsModalLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-start items-center py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            {/* Header Section */}
            <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
                <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start mb-6 sm:mb-0">
                    <h1 className="text-6xl sm:text-7xl font-bold mb-2 font-poppins text-gray-800">NOTENG</h1>
                    <p className="text-xl text-gray-600 font-poppins">All your notes in one place</p>
                </div>
                <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
                    <img src={LoginImg1} alt="Login" className="w-3/4 sm:w-2/3 max-w-md" />
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-7xl flex flex-col-reverse sm:flex-row justify-between items-center">
                {/* Login Form */}
                <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start mt-8 sm:mt-0">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Login to your account</h2>
                        <form className="mb-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="sapid" className="block font-medium text-gray-700 mb-1">SAP ID</label>
                                <input
                                    type="text"
                                    id="sapid"
                                    name="sapid"
                                    placeholder="Enter SAP ID"
                                    className={`w-full py-3 px-4 border ${formErrors.sapid ? 'border-red-500' : 'border-gray-300'} bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                                    value={sapid}
                                    onChange={(e) => setSapid(e.target.value)}
                                />
                                {formErrors.sapid && <p className="mt-1 text-sm text-red-500">{formErrors.sapid}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className={`w-full py-3 px-4 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
                            </div>
                            
                            {error && (
                                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}
                            
                            <div className="flex justify-end mb-4">
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Forgot your password?
                                </button>
                            </div>
                            
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                        
                        <div className="text-center">
                            <p className="text-sm mb-4">
                                Don't have an account?{' '}
                                <button 
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                    onClick={() => navigate('/SignUp')}
                                >
                                    Sign Up
                                </button>
                            </p>
                            
                            <div className="relative my-6">
                                <hr className="border-gray-300" />
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                                    or
                                </span>
                            </div>
                            
                            <button
                                type="button"
                                onClick={(event) => {
                                    setSapid('00000000000');
                                    setPassword('00000000000');
                                    setTimeout(() => handleSubmit(event), 100);
                                }}
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Sign in as Test User
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Image */}
                <div className="w-full sm:w-1/2 flex justify-center">
                    <img src={LoginImg2} alt="Login illustration" className="w-3/4 sm:w-4/5 max-w-lg" />
                </div>
            </div>
            
            {/* Password Reset Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
                        {modalScreen === 'email' ? (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Reset Password</h2>
                                    <button 
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="mb-4 text-sm text-gray-600">
                                    Enter your email address, and we'll send you a one-time password to reset your password.
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full py-3 px-4 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {modalError && (
                                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-600 text-sm">{modalError}</p>
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <button
                                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${isModalLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        onClick={handleForgotPassword}
                                        disabled={isModalLoading}
                                    >
                                        {isModalLoading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
                                    <button 
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="mb-4 text-sm text-gray-600">
                                    Enter the OTP sent to your email and set a new password.
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="block font-medium text-gray-700 mb-1">OTP</label>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        placeholder="Enter the OTP"
                                        className="w-full py-3 px-4 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="new_password" className="block font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        id="new_password"
                                        name="new_password"
                                        placeholder="Enter new password"
                                        className="w-full py-3 px-4 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        value={new_password}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                {modalError && (
                                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-600 text-sm">{modalError}</p>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => setModalScreen('email')}
                                        disabled={isModalLoading}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${isModalLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        onClick={handleVerifyOtp}
                                        disabled={isModalLoading}
                                    >
                                        {isModalLoading ? 'Verifying...' : 'Reset Password'}
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
