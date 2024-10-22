/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { RiEyeLine, RiEyeOffLine, RiInformationLine } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserRegistrationForm = ({ onClose }) => {
    // Navigation function
    const navigate = useNavigate();

    // API URL
    const API_URL = import.meta.env.VITE_API_URL

    // State initialization
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [errorMessages, setErrorMessages] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);

    // Schema initialization
    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        contact_no: yup.string()
            .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
            .required('Contact number is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cnfPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });


    // useForm hook initalization
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    // watch password field for changes in password
    const passwordValue = watch('password');

    // Password strength checker function
    const evaluatePasswordStrength = (password) => {
        const errors = [];
        if (!password) {
            return { isStrong: false, errors: ['Password is required'] };
        }
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[\W_]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        return {
            isStrong: errors.length === 0,
            errors: errors
        };
    };

    // Separate toggle functions for each password field
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    useEffect(() => {
        const { errors } = evaluatePasswordStrength(passwordValue);
        setPasswordErrors(errors);
    }, [passwordValue]);

    // Form submission handler function
    const onSubmit = async (data) => {
        const { isStrong, errors } = evaluatePasswordStrength(data.password);
        if (!isStrong) {
            setPasswordErrors(errors);
            setShowPasswordErrors(true);
            return; // Prevent form submission if password is not strong
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('firstname', data.firstname);
            formData.append('lastname', data.lastname);
            formData.append('email', data.email);
            formData.append('contact_no', data.contact_no);
            formData.append('password', data.password);

            const response = await axios.post(`${API_URL}/ma-register-vendor`, formData);
            if (response.data.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    onClose(true);
                    navigate('/');
                }, 5000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                setErrorMessages(errorMessages)
                console.error(`Error registering vendor: ${errorMessages}`);
            } else {
                console.error(`Error registering vendor: ${error.response?.data?.message || error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Toaster toastOptions={{
                duration: 5000,
            }} />
            <label className="block mb-2 font-semibold text-lg">Vendor Registration</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label className="block mb-2">First Name</label>
                    <input
                        type="text"
                        className={`w-full p-2 border rounded ${errors.firstname ? 'border-red-500' : ''}`}
                        placeholder='First Name'
                        {...register('firstname')}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                </div>
                <div>
                    <label className="block mb-2">Last Name</label>
                    <input
                        type="text"
                        className={`w-full p-2 border rounded ${errors.lastname ? 'border-red-500' : ''}`}
                        placeholder='Last Name'
                        {...register('lastname')}
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                </div>
                <div>
                    <label className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        placeholder='Email Address'
                        {...register('email')}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block mb-2">Contact Number</label>
                    <input
                        type="number"
                        inputMode='numeric'
                        onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                        className={`w-full p-2 border rounded ${errors.contact_no ? 'border-red-500' : ''}`}
                        placeholder='Contact Number'
                        {...register('contact_no')}
                    />
                    {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no.message}</p>}
                </div>
                <div>
                    <div className='flex items-center mb-2 relative'>
                        <label className="block">Password</label>
                        <div
                            className="relative"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <RiInformationLine className="mx-2 flex-shrink-0 cursor-help" />
                            {showTooltip && (
                                <div className="absolute z-10 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 -left-20 top-6">
                                    <div className="absolute -top-2 left-[85px] w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                                    <h3 className="font-semibold mb-2 text-gray-800">Password Requirements:</h3>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li className="flex items-center">
                                            <span className="mr-2">•</span> At least 8 characters long
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">•</span> One uppercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">•</span> One lowercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">•</span> One number
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">•</span> One special character
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                            placeholder='Password'
                            {...register('password')}
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                        </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {showPasswordErrors && passwordErrors.length > 0 && (
                        <div className="text-red-500 mt-2">
                            <ul className="list-none p-0 m-0">
                                {passwordErrors.map((error, index) => (
                                    <li key={index} className="mb-1">{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <label className="block mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`w-full p-2 border rounded ${errors.cnfPassword ? 'border-red-500' : ''}`}
                            placeholder='Confirm Password'
                            {...register('cnfPassword')}
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={toggleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                        </div>
                    </div>
                    {errors.cnfPassword && <p className="text-red-500 text-sm">{errors.cnfPassword.message}</p>}
                </div>
            </div>
            {errorMessages && <p className='text-red-500 font-semibold'>{errorMessages}</p>}
            <button
                type="submit"
                className={`w-full bg-[#fa2964] text-white px-4 py-2 rounded mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}

export default UserRegistrationForm;