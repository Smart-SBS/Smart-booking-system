import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';

const MyProfile = () => {
    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const Img_url = import.meta.env.VITE_IMG_URL;

    // User details from token
    const decoded = jwtDecode(token);
    const { user_id } = decoded.data;

    // State initialisation
    const [userData, setUserData] = useState({});
    const [roles, setRoles] = useState([]);
    const [userRole, setRole] = useState("")
    const [updated, setUpdated] = useState(false)
    const fileInputRef = useRef(null);

    // Schema definition
    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        contact_no: yup.string()
            .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
            .required('Contact number is required'),
        role: yup.string().required('User role is required')
    });

    // Use form initialisation
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
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
                const res = await axios.get(`${APP_URL}/api/user-details/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.data.user) {
                    setUserData(res.data.user);
                    setValue('firstname', res.data.user.firstname);
                    setValue('lastname', res.data.user.lastname);
                    setValue('email', res.data.user.email);
                    setValue('contact_no', res.data.user.contact_no);
                    setValue('old_profile_pic', res.data.user.profile_pic)

                    const matchedRole = roles.find(role => role.value === res.data.user.role_id);
                    if (matchedRole) {
                        setRole(matchedRole);
                        setValue('role', matchedRole.value);
                    }
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching user data: ${errorMessages}`);
                } else {
                    toast.error(`Error fetching user data: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        if (roles.length > 0) {
            fetchUser();
        }
    }, [user_id, token, roles, updated, APP_URL]);

    // Handle profile picture click
    const handleProfilePicClick = () => {
        fileInputRef.current.click();
    };

    // Handle profile picture change
    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile_pic', file);

        try {
            const res = await axios.post(`${APP_URL}/api/update-profile-pic/${user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setUpdated(prev => !prev); // Toggle to trigger re-fetch
            }
        } catch (error) {
            toast.error(`Error updating profile picture: ${error.response?.data?.message || error.message}`);
        }
    };

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();

        if (data.firstname) formData.append('firstname', data.firstname);
        if (data.lastname) formData.append('lastname', data.lastname);
        if (data.email) formData.append('email', data.email);
        if (data.contact_no) formData.append('contact_no', data.contact_no);
        if (data.old_profile_pic) formData.append('old_profile_pic', data.old_profile_pic);
        if (data.role) formData.append('role', data.role);

        try {
            const res = await axios.post(`${APP_URL}/api/edit-user/${user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setUpdated(true)
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

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="card border-0">
                <div className="card-header bg-card pb-3">
                    <h6 className="card-title mb-0">My Profile</h6>
                    <div className="d-flex align-items-md-start align-items-center flex-column flex-md-row mt-4 w-100">
                        <div className="position-relative rounded" style={{ border: "0.5px solid #cecece" }}>
                            <img
                                src={userData?.profile_pic ? `${Img_url}/profile/list/${userData.profile_pic}` : `${Img_url}/default/list/user.webp`}
                                alt={userData?.firstname || "User profile"}
                                className="avatar rounded xl"
                                onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                            />
                            <div
                                className="position-absolute bottom-0 end-0 bg-primary rounded px-1" style={{ cursor: "pointer", border: "0.5px solid #5bc43a", color: "white", fontSize:'14px' }}
                                onClick={handleProfilePicClick}
                            >
                                <i className="bi bi-pencil"></i>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleProfilePicChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="media-body ms-md-5 m-0 mt-4 mt-md-0 text-md-start text-center">
                            <h4 className="mb-1">{userData.firstname} {userData.lastname}</h4>
                            <p>{userData.email}</p>
                        </div>
                    </div>
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
                                <button className="me-1 btn btn-primary" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
