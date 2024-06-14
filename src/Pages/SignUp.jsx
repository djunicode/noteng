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

        try {
            const response = await fetch('https://monilmeh.pythonanywhere.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'API-TOKEN',
                },
                body: JSON.stringify(formData),
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
            <div className="w-full sm:w-1/3 py-10 flex flex-col justify-between items-center">
                <h1 className="text-6xl px-10 sm:px-40 text-center font-extrabold mb-10">NOTENG</h1>
                <img src={SignUpImg} alt="SignUp" className="w-3/4" />
            </div>
            <div className="w-full sm:w-2/3 bg-white flex justify-center items-center">
                <div className="w-full p-10 sm:p-20">
                    <form onSubmit={handleSubmit}>
                        {['sapid', 'password', 'fname', 'lname', 'email', 'contact_number'].map((field) => (
                            <div className="mb-4" key={field}>
                                <label htmlFor={field} className="block font-medium capitalize">
                                    {field.replace('_', ' ')}
                                </label>
                                <input
                                    type={field === 'password' ? 'password' : 'text'}
                                    id={field}
                                    name={field}
                                    placeholder={`Enter ${field.replace('_', ' ')}`}
                                    className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-custom-blue py-4 flex justify-center items-center text-white px-20 rounded-md w-full sm:w-1/4 mx-auto sm:mx-0">
                            Sign Up
                        </button>
                        <span
                        className="text-s cursor-pointer"
                        onClick={() => navigate('/LoginPage')}
                    >Already Have an Account? Login Here!
                    </span>
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
