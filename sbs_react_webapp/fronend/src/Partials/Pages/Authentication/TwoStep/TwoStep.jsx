/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const TwoStep = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [resetToken, setResetToken] = useState('');

    useEffect(() => {
        // Extract the reset token from the URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('reset_token');
        if (token) {
            setResetToken(token);
        } else {
            // Handle case where token is not present
            toast.error('Reset token is missing. Please use the link from your email.');
        }
    }, [location, navigate]);

    const schema = yup.object().shape({
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cnfPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    const evaluatePasswordStrength = (password) => {
        if (!password) return '';
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

    const passwordValue = watch('password');

    useEffect(() => {
        setPasswordStrength(evaluatePasswordStrength(passwordValue));
    }, [passwordValue]);

    const onSubmit = async (data) => {
        const params = new URLSearchParams();
        params.append('reset_token', resetToken);
        params.append('newpassword', data.password);
        params.append('confirmpassword', data.cnfPassword);

        try {
            const res = await axios.post(`${APP_URL}/api/ResetPassword`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const errorMessages = typeof errorMessage === 'object'
                ? Object.values(errorMessage).join(', ')
                : errorMessage || error.message;
            toast.error(`Error resetting password: ${errorMessages}`);
        }
    };

    const handleCancel = () => reset();

    return (
        <div className="px-xl-5 px-4 auth-body">
            <ul className="row g-3 list-unstyled li_animate">
                <li className="col-12">
                    <h1 className="h2 title-font">Welcome to SBS</h1>
                    <p>Your Admin Dashboard</p>
                </li>
                <li className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className={`form-floating ${errors.password ? 'is-invalid' : ''}`}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${passwordStrength === 'Strong' ? 'border-success' :
                                            passwordStrength === 'Moderate' ? 'border-warning' :
                                                passwordStrength === 'Weak' ? 'border-danger' : ''
                                            }`}
                                        id="password"
                                        {...register('password')}
                                        placeholder="Password"
                                    />
                                    <label htmlFor="password">Password</label>
                                    <div
                                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleShowPassword}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                    </div>
                                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>
                            </div>
                            <br />
                            <div className="col-md-6">
                                <div className={`form-floating ${errors.cnfPassword ? 'is-invalid' : ''}`}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="cnfPassword"
                                        {...register('cnfPassword')}
                                        placeholder="Confirm Password"
                                    />
                                    <label htmlFor="cnfPassword">Confirm Password</label>
                                    <div
                                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleShowPassword}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                    </div>
                                    {errors.cnfPassword && <div className="invalid-feedback">{errors.cnfPassword.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Reset Password</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                                <br />
                                <br />
                                <Link className="m-" to='/send-token'>
                                    Haven't received it? Resend a new code
                                </Link>
                            </div>
                        </div>
                    </form>
                </li>
            </ul>
            <Toaster />
        </div>
    );
};

export default TwoStep;