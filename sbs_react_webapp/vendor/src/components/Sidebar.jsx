import { useRef } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import toast from "react-hot-toast";
import { BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserData } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { logoutUser } from '../redux/actions/authActions';

const Sidebar = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, userData, userType, userId } = useSelector(state => state.auth);

    const fileInputRef = useRef(null);

    const handleProfilePicClick = () => {
        fileInputRef.current.click();
    };

    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile_pic', file);

        try {
            const res = await axios.post(`${API_URL}/ma-update-${userType}-profile-pic/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                dispatch(fetchUserData());
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error changing profile picture: ${errorMessage}`);
        }
    };

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        if (result === true) {
            navigate('/');
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <div className="w-64 bg-gray-900 text-gray-300 min-h-screen p-4">
            <div className="mb-8">
                <div className="flex flex-col items-center mt-24 relative">
                    <div className="w-32 h-32 bg-gray-700 rounded-full border-4 border-[#fa2964e6] mb-2 relative">
                        <img
                            src={userData?.profile_pic ? `${IMG_URL}/profile/thumb/${userData.profile_pic}` : `${IMG_URL}/default/list/user.webp`}
                            alt={userData?.name || "User FullName"}
                            className="rounded-full w-full h-full object-cover"
                            onError={(e) => { e.target.src = `${IMG_URL}/default/list/user.webp`; }}
                        />
                        <div
                            className="absolute bottom-[4px] right-0 flex items-center justify-center bg-primary rounded-full w-6 h-6"
                            style={{ cursor: "pointer", border: "1px solid #e91e63", color: "white" }}
                            onClick={handleProfilePicClick}
                        >
                            <BsFillPencilFill className="text-sm bg-[#fa2964e6] rounded-full w-full h-full p-[3px]" />
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfilePicChange}
                        accept="image/*"
                    />
                    <Link className="text-white text-lg mt-2">
                        {userData?.firstname} {userData?.lastname}
                    </Link>
                </div>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    {userType === 'user' ?
                        <>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded cursor-pointer">
                                <FaRegHeart className="w-5 h-5" />
                                <Link to='/favorited-listings'>Favorited Listings</Link>
                            </li>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <BsBag className="w-5 h-5" />
                                <Link to='/my-orders'>My Orders</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                <Link to='/my-listings'>My Businesses</Link>
                            </li>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                <Link to='/my-shops'>My Shops</Link>
                            </li>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <BsBag className="w-5 h-5" />
                                <Link to='/my-orders'>My Orders</Link>
                            </li>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <Link to='/payments'>Payments</Link>
                            </li>
                            <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <Link to='/invoice'>Invoices</Link>
                            </li>
                        </>
                    }
                    <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                        <Link to='/change-password' >Change Password</Link>
                    </li>
                    <li className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-800 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span onClick={handleLogout} className="cursor-pointer">Log Out</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;