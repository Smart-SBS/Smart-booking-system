/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import NavMenuCategories from './NavMenuCategories';
import { fetchUserData } from '../redux/actions/userActions';

function DashboardHeader({ toggleRightSidebar, toggleLeftSidebar }) {
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get auth state and user data from Redux store
    const { token, userData } = useSelector(state => state.auth);
    const isLoggedIn = !!token;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserData());
        }
    }, [isLoggedIn]);

    // Handle dropdown click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        if (result === true) {
            // If logout is successful, redirect to home
            navigate('/');
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <header className="sticky top-0 bg-white shadow-md text-black z-50 w-full">
            <nav className="container mx-auto 2xl:container 2xl:mx-auto text-lg my-3">
                <div className="flex justify-between p-3 md:p-4">
                    <div className='flex gap-8'>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleLeftSidebar}
                                className="md:hidden text-gray-500 focus:outline-none focus:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                            <Link to='/'>
                                <img src="/logo-black.png" alt="SBS Logo" className="h-12" />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <NavMenuCategories />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center space-x-2 px-3 py-2 rounded"
                                onClick={toggleDropdown}
                            >
                                <img
                                    src={userData?.profile_pic ? `${IMG_URL}/profile/thumb/${userData.profile_pic}` : `${IMG_URL}/default/list/user.webp`}
                                    alt={userData?.name || "User FullName"}
                                    className="h-11 w-11 rounded-full border-2 border-[#fa2964e6] object-cover"
                                    onError={(e) => { e.target.src = `${IMG_URL}/default/list/user.webp`; }}
                                />
                                <span>Hi, {userData?.firstname}!</span>
                                <span className="ml-1">▼</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                    <Link to="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Change Password</Link>
                                    <Link
                                        to="#"
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="md:hidden"
                        onClick={toggleRightSidebar}
                    >
                        <img
                            src={userData?.profile_pic ? `${IMG_URL}/profile/thumb/${userData.profile_pic}` : `${IMG_URL}/default/list/user.webp`}
                            alt={userData?.name || "User FullName"}
                            className="h-11 w-11 rounded-full border-2 border-[#fa2964] object-cover"
                            onError={(e) => { e.target.src = `${IMG_URL}/default/list/user.webp`; }}
                        />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default DashboardHeader;