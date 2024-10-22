import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddUser = () => {
    // Navigate function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL

    // State initialization
    const [roles, setRoles] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);

    // Schema definition
    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        contact_no: yup.string()
            .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
            .max(10, 'Must not be more than 10 digits')
            .required('Contact number is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cnfPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        profile_pic: yup.mixed().notRequired(),
        role: yup.string().required('User role is required')
    });

    // Use form initialization
    const { register, handleSubmit, reset, formState: { errors }, control, watch } = useForm({
        resolver: yupResolver(schema)
    });

    // Watch for password changes and update password errors
    const passwordValue = watch('password');

    // Password strength checker
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

    // Handle toggle password
    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Set password errors
    useEffect(() => {
        const { errors } = evaluatePasswordStrength(passwordValue);
        setPasswordErrors(errors);
    }, [passwordValue]);

    // Fetch user roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/user-all-roles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.roles) {
                    const roleOptions = response.data.roles.map(role => ({
                        value: role.id,
                        label: role.role_name
                    }));
                    setRoles(roleOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                toast.error('Failed to fetch roles');
            }
        };

        fetchRoles();
    }, [APP_URL, token]);

    // Handle submit
    const onSubmit = async (data) => {
        const { isStrong, errors } = evaluatePasswordStrength(data.password);
        if (!isStrong) {
            setPasswordErrors(errors);
            setShowPasswordErrors(true);
            return; // Prevent form submission if password is not strong
        }

        try {
            const formData = new FormData();

            for (const key in data) {
                if (key === 'profile_pic') {
                    if (data[key] && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            const res = await axios.post(`${APP_URL}/api/add-user`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/users');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error adding user: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error adding user: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/users');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h4 className="title-font mt-2 mb-0"><strong>Add User</strong></h4>
                    <Link className='btn btn-info text-white' to='/admin/users'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                        id="firstname"
                                        {...register('firstname')}
                                        placeholder="First Name"
                                    />
                                    <label htmlFor="firstname">First Name</label>
                                    {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                        id="lastname"
                                        {...register('lastname')}
                                        placeholder="Last Name"
                                    />
                                    <label htmlFor="lastname">Last Name</label>
                                    {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        {...register('email')}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.contact_no ? 'is-invalid' : ''}`}
                                        id="contact_no"
                                        {...register('contact_no')}
                                        placeholder="Contact"
                                    />
                                    <label htmlFor="contact_no">Contact</label>
                                    {errors.contact_no && <div className="invalid-feedback">{errors.contact_no.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`form-floating ${errors.password || (showPasswordErrors && passwordErrors.length > 0) ? 'is-invalid' : ''}`}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${errors.password || (showPasswordErrors && passwordErrors.length > 0) ? 'is-invalid' : ''}`}
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
                                        <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                                    </div>
                                </div>
                                {showPasswordErrors && passwordErrors.length > 0 && (
                                    <div className="invalid-feedback d-block">
                                        <ul className="list-unstyled mb-0">
                                            {passwordErrors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${errors.cnfPassword ? 'is-invalid' : ''}`}
                                        id="cnfPassword"
                                        {...register('cnfPassword')}
                                        placeholder="Confirm Password"
                                    />
                                    <div
                                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleShowPassword}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                                    </div>
                                    <label htmlFor="cnfPassword">Confirm Password</label>
                                    {errors.cnfPassword && <div className="invalid-feedback">{errors.cnfPassword.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className={`form-control ${errors.profile_pic ? 'is-invalid' : ''}`}
                                        id="profile_pic"
                                        {...register('profile_pic')}
                                        accept="image/*"
                                    />
                                    <label htmlFor="profile_pic">Profile Picture (Optional)</label>
                                    {errors.profile_pic && <div className="invalid-feedback">{errors.profile_pic.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={roles}
                                                className={`basic-single ${errors.role ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select user role"
                                                value={roles.find(role => role.value === field.value) || null}
                                                onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : '')}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        height: 'calc(3.5rem + 2px)',
                                                        borderRadius: '0.375rem',
                                                        border: '1px solid #ced4da',
                                                    }),
                                                    valueContainer: (baseStyles) => ({
                                                        ...baseStyles,
                                                        height: '100%',
                                                        padding: '0.7rem 0.6rem',
                                                    }),
                                                    placeholder: (baseStyles) => ({
                                                        ...baseStyles,
                                                        color: '#6c757d',
                                                    }),
                                                    input: (baseStyles) => ({
                                                        ...baseStyles,
                                                        margin: 0,
                                                        padding: 0,
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Add User</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
