/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const TwoStep = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const APP_URL = import.meta.env.VITE_API_URL

    const schema = yup.object().shape({
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cnfPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    // useForm initialization
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // State initialization
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [resetToken, setResetToken] = useState('');

    // Watch for changes in password
    const passwordValue = watch('password');

    // Check password strength while password is being typed
    const evaluatePasswordStrength = (password) => {
        if (!password) {
            return '';
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasNonalphas = /[\W_]/.test(password);
        const length = password.length;

        if (length > 7 && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas) {
            return 'Strong';
        } else if (length > 5 && (hasUpperCase || hasLowerCase) && hasNumbers) {
            return 'Moderate';
        } else {
            return 'Weak';
        }
    };

    // Handle show and hide password
    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Set password value as a dependency for useEffect hook, so it updates whenever password changes
    useEffect(() => {
        setPasswordStrength(evaluatePasswordStrength(passwordValue));
    }, [passwordValue]);

    // Set IsFormValid === true when the password strength is strong
    useEffect(() => {
        setIsFormValid(passwordStrength === 'Strong');
    }, [passwordStrength]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('reset_token');
        if (token) {
            setResetToken(token);
        } else {
            toast.error('Reset token is missing. Please use the link from your email.');
        }
    }, [location, navigate]);

    const onSubmit = async (data) => {
        const params = new URLSearchParams();
        params.append('reset_token', resetToken);
        params.append('newpassword', data.password);
        params.append('confirmpassword', data.cnfPassword);
        setIsSubmitting(true)
        try {
            const res = await axios.post(`${APP_URL}/ResetPassword`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const errorMessages = typeof errorMessage === 'object'
                ? Object.values(errorMessage).join(', ')
                : errorMessage || error.message;
            toast.error(`Error resetting password: ${errorMessages}`);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side with image */}
            <div className="hidden lg:block lg:w-3/1">
                <img
                    src='/Reset-password-pana.png'
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
                                        placeholder="New Password"
                                        {...register('password')}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={toggleShowPassword}
                                    >
                                        {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                                    </div>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                {passwordStrength && (
                                    <p className={`text-sm ${passwordStrength === 'Strong' ? 'text-green-500' :
                                        passwordStrength === 'Moderate' ? 'text-yellow-500' :
                                            'text-red-500'
                                        }`}>
                                        Password strength: {passwordStrength}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6 relative">
                                <label htmlFor="cnfPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="cnfPassword"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
                                        placeholder="Confirm New Password"
                                        {...register('cnfPassword')}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={toggleShowPassword}
                                    >
                                        {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                                    </div>
                                </div>
                                {errors.cnfPassword && <p className="text-red-500 text-sm mt-1">{errors.cnfPassword.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#fa2964e6] text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] focus:ring-opacity-50 flex items-center justify-center"
                                disabled={!isFormValid}
                            >
                                <RiLockPasswordLine className="mr-2" />
                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                        <div className="text-sm">
                            <Link to="/send-token" className="font-medium text-[#fa2964e6] hover:text-pink-500">
                                Haven't received it? Resend a new code
                            </Link>
                        </div>
                        <Toaster />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoStep;