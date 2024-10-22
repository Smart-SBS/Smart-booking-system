import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const { token, userType } = useSelector(state => state.auth);
    const APP_URL = import.meta.env.VITE_API_URL;

    const schema = yup.object().shape({
        old_password: yup.string().required('Current password is required'),
        newpassword: yup.string()
            .min(8, 'New password must be at least 8 characters')
            .required('New password is required'),
        confirmpassword: yup.string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);

    const passwordValue = watch('newpassword');

    const evaluatePasswordStrength = (password) => {
        const errors = [];
        if (!password) return { isStrong: false, errors: ['Password is required'] };

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

        return { isStrong: errors.length === 0, errors };
    };

    useEffect(() => {
        const { errors } = evaluatePasswordStrength(passwordValue);
        setPasswordErrors(errors);
    }, [passwordValue]);

    const onSubmit = async (data) => {
        const { isStrong, errors } = evaluatePasswordStrength(data.newpassword);
        if (!isStrong) {
            setPasswordErrors(errors);
            setShowPasswordErrors(true);
            return;
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('old_password', data.old_password);
            formData.append('newpassword', data.newpassword);
            formData.append('confirmpassword', data.confirmpassword);

            const response = await axios.post(`${APP_URL}/ma-change-${userType}-password`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === 200) {
                toast.success(response.data.message);
                reset();
                setShowPasswordErrors(false);
            }
        } catch (error) {
            if (error.response?.data?.messages?.error) {
                // Handle the specific error structure you showed
                toast.error(error.response.data.messages.error);
            } else if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // Handle case where message is an object of errors
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(errorMessages);
            } else {
                // Handle any other error cases
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-24">
            <Toaster />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Password Field */}
                <div className="space-y-1">
                    <label htmlFor="old_password" className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword.old ? 'text' : 'password'}
                            {...register('old_password')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                            placeholder="Enter current password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('old')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword.old ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                    {errors.old_password && (
                        <p className="text-red-500 text-sm mt-1">{errors.old_password.message}</p>
                    )}
                </div>

                {/* New Password Field */}
                <div className="space-y-1">
                    <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword.new ? 'text' : 'password'}
                            {...register('newpassword')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('new')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword.new ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                    {errors.newpassword && (
                        <p className="text-red-500 text-sm">{errors.newpassword.message}</p>
                    )}
                    {showPasswordErrors && passwordErrors.length > 0 && (
                        <ul className="text-red-500 text-sm mt-2 space-y-1">
                            {passwordErrors.map((error, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="mr-2">•</span>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword.confirm ? 'text' : 'password'}
                            {...register('confirmpassword')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                            placeholder="Confirm new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirm')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword.confirm ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                    {errors.confirmpassword && (
                        <p className="text-red-500 text-sm">{errors.confirmpassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#fa2964e6] hover:bg-[#fa2964] text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RiLockPasswordLine className="text-xl" />
                    {isSubmitting ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;