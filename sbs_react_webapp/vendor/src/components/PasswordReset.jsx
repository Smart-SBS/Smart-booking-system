import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const APP_URL = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        const formdata = new FormData();
        formdata.append('email', email);
        try {
            const response = await axios.post(`${APP_URL}/MaSendToken`, formdata);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side with image */}
            <div className="hidden lg:block lg:w-3/1">
                <img
                    src='/Computer-login-amico.png'
                    alt="Background"
                    className="object-contain w-full h-full"
                />
            </div>
            {/* Right side with logo, welcome message, and form */}
            <div className="w-full lg:w-1/2 bg-gray-100 flex flex-col">
                <div className="p-8">
                    <img src="/logo-black.png" alt="SBS Logo" className="h-12 w-auto" />
                </div>
                <div className="flex-grow flex items-center justify-start px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Welcome to Smart Booking System</h2>
                            <p className="mt-2 text-sm text-gray-600">Your Dashboard</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa2964e6] focus:border-[#fa2964e6]"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    An email will be sent to the above address with a link to set your new password.
                                </p>
                            </div>
                            {message && (
                                <div className={`p-4 rounded-md ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {message}
                                </div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#fa2964e6] hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa2964e6]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                            <div className="text-center">
                                <Link to="/" className="text-sm text-[#fa2964e6] hover:text-pink-600">
                                    Back to Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;