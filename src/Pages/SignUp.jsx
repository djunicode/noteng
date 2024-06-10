import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImg from '../assets/signupimg.svg';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sapid: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
        contact_number: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        try {
            const response = await fetch('https://monilmeh.pythonanywhere.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sapid: formData.sapid,
                    password: formData.password,
                    fname: formData.fname,
                    lname: formData.lname,
                    email: formData.email,
                    contact_number: formData.contact_number
                })
            });

            if (response.ok) {
                navigate('/'); // Navigate to home page after successful sign-up
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Signup failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred during sign-up. Please try again.');
        }
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 py-10 flex flex-col justify-between items-center">
                <h1 className="text-6xl px-40 justify-center font-extrabold mb-10">NOTENG</h1>
                <img src={SignUpImg} alt="SignUp" className="w-3/4" />
            </div>
            <div className="w-2/3 bg-white flex justify-center items-center">
                <div className="w-full p-20">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="sapid" className="block font-medium">SapID</label>
                            <input
                                type="sapid"
                                id="sapid"
                                name="sapid"
                                placeholder="Enter SapID"
                                className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                                value={formData.sapid}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fname" className="block font-medium">First Name</label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                placeholder="Enter First Name"
                                className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                                value={formData.fname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lname" className="block font-medium">Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                placeholder="Enter Last Name"
                                className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                                value={formData.lname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter e-mail"
                                className="w-full py-2 px-4 border bg-gray-100 border-gray-300 rounded-md"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact_number" className="block font-medium">Contact Number</label>
                            <input
                                type="text"
                                id="contact_number"
                                name="contact_number"
                                placeholder="Enter Contact Number"
                                className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                                value={formData.contact_number}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="bg-custom-blue py-4 justify-center text-white px-20 rounded-md w-1/4">Sign Up</button>
                    </form>
                    {errorMessage && (
                        <div className="mt-4 text-red-500">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
