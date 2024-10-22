/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';

// Schema initialization
const schema = yup.object().shape({
    identifier: yup.string().required('Mobile Number / Email Address is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = ({ onClose, onSuccessfulLogin }) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    // State initialization
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    // useForm hook initialization
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Password visibility toggle function
    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Handle form submission 
    const onSubmit = (data) => {
        try {
            const success = dispatch(login(data.identifier, data.password));
            if (success) {
                onSuccessfulLogin();
                onClose(true);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                setServerError(errorMessages);
            } else {
                setServerError(error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block mb-2">Mobile Number / Email Address</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.identifier ? 'border-red-500' : ''}`}
                    placeholder='Mobile Number / Email Address'
                    {...register('identifier')}
                />
                {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier.message}</p>}
            </div>
            <div className="mb-4 relative">
                <label className="block mb-2">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        placeholder='Password'
                        {...register('password')}
                    />
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                    </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button type="submit" className="w-full bg-[#fa2964] text-white px-4 py-2 rounded mb-4">
                Log In
            </button>
            <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                </label>
                <a href="/send-token" className="text-[#fa2964]">Lost Your Password?</a>
            </div>
        </form>
    );
};

export default LoginForm;