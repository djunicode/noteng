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
        userType: 'student', // Default to student
        current_year: 'First Year', // Default for student
        branch: '',
        department: '',
        designation: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Create a new object with only the needed fields based on user type
        const submissionData = {
            sapid: formData.sapid,
            password: formData.password,
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            contact_number: formData.contact_number,
            userType: formData.userType,
        };

        // Add fields based on user type
        if (formData.userType === 'student') {
            submissionData.current_year = formData.current_year;
            submissionData.branch = formData.branch;
        } else {
            submissionData.department = formData.department;
            submissionData.designation = formData.designation;
        }

        try {
            const response = await fetch('https://monilmeh.pythonanywhere.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'API-TOKEN',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                navigate('/LoginPage');
            } else {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                setErrorMessage(errorData.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setErrorMessage('An error occurred during sign-up. Please try again.');
        }
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <div className="w-full sm:w-1/3 py-10 flex flex-col justify-between items-center bg-gray-50">
                <h1 className="text-6xl px-10 sm:px-40 text-center font-extrabold mb-10 text-custom-blue">NOTENG</h1>
                <img src={SignUpImg} alt="SignUp" className="w-3/4" />
            </div>
            <div className="w-full sm:w-2/3 bg-white flex justify-center items-center">
                <div className="w-full p-10 sm:p-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Create Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* User Type Selection */}
                            <div className="col-span-2">
                                <label className="block font-medium mb-2">I am a</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 border rounded-lg p-4 cursor-pointer ${formData.userType === 'student' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="student"
                                            checked={formData.userType === 'student'}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Student
                                    </label>
                                    <label className={`flex-1 border rounded-lg p-4 cursor-pointer ${formData.userType === 'professor' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="professor"
                                            checked={formData.userType === 'professor'}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Professor
                                    </label>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div>
                                <label htmlFor="sapid" className="block font-medium mb-2">SAP ID</label>
                                <input
                                    type="text"
                                    id="sapid"
                                    name="sapid"
                                    placeholder="Enter SAP ID"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.sapid}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="fname" className="block font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="Enter first name"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.fname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="Enter last name"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.lname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact_number" className="block font-medium mb-2">Contact Number</label>
                                <input
                                    type="tel"
                                    id="contact_number"
                                    name="contact_number"
                                    placeholder="Enter contact number"
                                    className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Conditional fields for students */}
                            {formData.userType === 'student' && (
                                <>
                                    <div>
                                        <label htmlFor="current_year" className="block font-medium mb-2">Current Year</label>
                                        <select
                                            id="current_year"
                                            name="current_year"
                                            className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.current_year}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="First Year">First Year</option>
                                            <option value="Second Year">Second Year</option>
                                            <option value="Third Year">Third Year</option>
                                            <option value="Fourth Year">Fourth Year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="branch" className="block font-medium mb-2">Branch</label>
                                        <select
                                            id="branch"
                                            name="branch"
                                            className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select your branch</option>
                                            <option value="CS">CS</option>
                                            <option value="IT">IT</option>
                                            <option value="CSE-DS">CSE-DS</option>
                                            <option value="AIML">AIML</option>
                                            <option value="CSE-IOT">CSE-IOT</option>
                                            <option value="AIDS">AIDS</option>
                                            <option value="MECH">MECH</option>
                                            <option value="EXTC">EXTC</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Conditional fields for professors */}
                            {formData.userType === 'professor' && (
                                <>
                                    <div>
                                        <label htmlFor="department" className="block font-medium mb-2">Department</label>
                                        <input
                                            type="text"
                                            id="department"
                                            name="department"
                                            placeholder="Enter department"
                                            className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="designation" className="block font-medium mb-2">Designation</label>
                                        <input
                                            type="text"
                                            id="designation"
                                            name="designation"
                                            placeholder="Enter designation"
                                            className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {errorMessage && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="bg-custom-blue py-3 flex justify-center items-center text-white px-8 rounded-md w-full md:w-1/3 mx-auto hover:bg-blue-600 transition duration-200"
                            >
                                Create Account
                            </button>
                            <div className="text-center mt-4">
                                <span
                                    className="text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => navigate('/LoginPage')}
                                >
                                    Already have an account? Login here!
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
