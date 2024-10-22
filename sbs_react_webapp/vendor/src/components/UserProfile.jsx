import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const UserProfile = () => {
    // Access token
    const { token, userType, userId } = useSelector(state => state.auth);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // State initialization
    const [refresh, setRefresh] = useState(false);
    const [userData, setUserData] = useState({});

    // fetch user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestUrl = `${APP_URL}/ma-${userType}-profile/${userId}`
                const response = await axios.get(requestUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.status === 200) {
                    // Use template literal to access the correct array based on userType
                    const user = response.data[userType]
                    setUserData(response.data[userType]);
                    setValue('firstname', user.firstname);
                    setValue('lastname', user.lastname);
                    setValue('email', user.email);
                    setValue('contact_no', user.contact_no);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    console.error(`Error fetching ${userType} data: ${errorMessages}`);
                } else {
                    console.error(`Error fetching ${userType} data: ${error.response?.data?.message || error.message}`);
                }
                setUserData([]);  // Reset the data on error
            }
        };

        if (token) {
            fetchData();
        }
    }, [refresh, userType, userId, token, APP_URL]);

    // Schema initialization
    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        contact_no: yup.string()
            .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
            .max(10, 'Must not be more than 10 digits')
            .required('Contact number is required')
    });

    // useForm hook initialization
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit = async (data) => {
        const formdata = new FormData()
        formdata.append('firstname', data.firstname);
        formdata.append('lastname', data.lastname);
        formdata.append('contact_no', data.contact_no);

        try {
            const response = await axios.post(`${APP_URL}/ma-${userType}-edit-profile`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 200) {
                toast.success(response.data.message);
                setRefresh(prev => !prev);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error updating ${userType} profile: ${errorMessages}`);
            } else {
                console.error(`Error updating ${userType} profile: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    return (
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded p-4 sm:p-6 lg:p-8 w-full max-w-3xl">
                <Toaster />
                <h2 className="text-2xl text-black font-bold mb-6">Profile Details</h2>
                <div className="flex flex-col items-start space-y-2 mb-4">
                    <h3 className="text-xl text-black font-semibold">{userData?.firstname} {userData?.lastname}</h3>
                    <p className="text-gray-600 font-semibold flex gap-2 items-center"><span><FaRegUser size={19} color="#fa2964e6" /></span> {userData?.role}</p>
                    <p className="text-black flex gap-2 items-center"><span><IoIosCall size={19} color="#fa2964e6" /></span> {userData?.contact_no}</p>
                    <p className="text-black flex gap-2 items-center"><span><MdOutlineEmail size={19} color="#fa2964e6" /></span> {userData?.email}</p>
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-2 font-semibold">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                className={`w-full p-2 border rounded ${errors.firstname ? 'border-red-500' : ''}`}
                                {...register('firstname')}
                            />
                            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                className={`w-full p-2 border rounded ${errors.lastname ? 'border-red-500' : ''}`}
                                {...register('lastname')}
                            />
                            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                disabled='true'
                                className={`w-full p-2 bg-slate-100 cursor-not-allowed border rounde ${errors.email ? 'border-red-500' : ''}`}
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Contact Number</label>
                            <input
                                type="text"
                                id="contact_no"
                                className={`w-full p-2 border rounded ${errors.contact_no ? 'border-red-500' : ''}`}
                                {...register('contact_no')}
                            />
                            {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-[#fa2964e6] text-white px-4 py-2 rounded">
                        Update
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UserProfile;
