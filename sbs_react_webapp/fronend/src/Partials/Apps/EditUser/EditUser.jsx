import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditUser = () => {
    // Navigate function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const Img_url = import.meta.env.VITE_IMG_URL;

    // User details from query string
    const { userName, userId } = useParams();

    // State initialisation
    const [roles, setRoles] = useState([]);
    const [userRole, setRole] = useState("")
    const [profileImage, setProfileImage] = useState(null);

    // Schema definition
    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        contact_no: yup.string()
            .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
            .required('Contact number is required'),
        profile_pic: yup.mixed().notRequired(),
        role: yup.string().required('User role is required'),
        old_profile_pic: yup.string()
    });

    // Use form initialisation
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Handle role selection change
    const onRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setValue('role', selectedRole ? selectedRole.value : '');
    };

    //fetch user roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/user-all-roles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.status === 200 && Array.isArray(response.data.roles)) {
                    const roleOptions = response.data.roles.map(role => ({
                        value: role.id,
                        label: role.role_name
                    }));
                    setRoles(roleOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching user roles: ${errorMessages}`);
                    setRoles([]);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching user roles: ${error.response?.data?.message || error.message}`);
                    setRoles([]);
                }
            }
        };
        fetchRoles();
    }, [APP_URL, token]);

    //fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${APP_URL}/api/user-details/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.data.user) {
                    setValue('firstname', res.data.user.firstname);
                    setValue('lastname', res.data.user.lastname);
                    setValue('email', res.data.user.email);
                    setValue('contact_no', res.data.user.contact_no);
                    setValue('old_profile_pic', res.data.user.profile_pic)

                    // Set profile image if available
                    if (res.data.user.profile_pic) {
                        setProfileImage(`${Img_url}/profile/list/${res.data.user.profile_pic}`);
                    }

                    const matchedRole = roles.find(role => role.value === res.data.user.role_id);
                    if (matchedRole) {
                        setRole(matchedRole);
                        setValue('role', matchedRole.value);
                    }
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching user data: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching user data: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        if (roles.length > 0) {
            fetchUser();
        }
    }, [userId, setValue, token, roles, APP_URL, Img_url]);

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();

        if (data.firstname) formData.append('firstname', data.firstname);
        if (data.lastname) formData.append('lastname', data.lastname);
        if (data.email) formData.append('email', data.email);
        if (data.contact_no) formData.append('contact_no', data.contact_no);
        if (data.profile_pic && data.profile_pic[0]) formData.append('profile_pic', data.profile_pic[0]);
        if (data.old_profile_pic) formData.append('old_profile_pic', data.old_profile_pic);
        if (data.role) formData.append('role', data.role);

        try {
            const res = await axios.post(`${APP_URL}/api/edit-user/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
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
                toast.error(`Error updating user: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating user: ${error.response?.data?.message || error.message}`);
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
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit {userName} Details</strong></h6>
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
                            {profileImage ? (
                                <>
                                    <div className="col-md-1">
                                        <img src={profileImage} alt="Profile" className="img-thumbnail" style={{ maxWidth: '100%', height: '60px' }} onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }} />
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-floating">
                                            <input
                                                type="file"
                                                className={`form-control ${errors.profile_pic ? 'is-invalid' : ''}`}
                                                id="profile_pic"
                                                {...register('profile_pic')}
                                                accept="image/*"
                                            />
                                            <input type='hidden' name='old_profile_pic' id='old_profile_pic' {...register('old_profile_pic')} />
                                            <label htmlFor="profile_pic">Profile Picture</label>
                                            {errors.profile_pic && <div className="invalid-feedback">{errors.profile_pic.message}</div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="file"
                                            className={`form-control ${errors.profile_pic ? 'is-invalid' : ''}`}
                                            id="profile_pic"
                                            {...register('profile_pic')}
                                            accept="image/*"
                                        />
                                        <input type='hidden' name='old_profile_pic' id='old_profile_pic' {...register('old_profile_pic')} />
                                        <label htmlFor="profile_pic">Profile Picture</label>
                                        {errors.profile_pic && <div className="invalid-feedback">{errors.profile_pic.message}</div>}
                                    </div>
                                </div>
                            )}
                            <div className="col-md-6">
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
                                            value={userRole}
                                            onChange={(selectedOption) => {
                                                onRoleSelect(selectedOption);
                                                field.onChange(selectedOption ? selectedOption.value : '');
                                            }}
                                            isLoading={roles.length === 0}
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
                                                menu: (baseStyles) => ({
                                                    ...baseStyles,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-12">
                                <button type="submit" className="me-1 btn btn-primary">Update</button>
                                <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
