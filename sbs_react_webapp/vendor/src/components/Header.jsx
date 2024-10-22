/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useScrollPosition from '../utils/useScrollPosition';
import NavMenuCategories from './NavMenuCategories';
import { fetchUserData } from '../redux/actions/userActions';
import { logoutUser } from '../redux/actions/authActions';
import { openAuthPopup, openRegistrationPopup } from '../redux/slices/authPopupSlice';

function Header({ toggleRightSidebar, toggleLeftSidebar }) {
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get auth state and user data from Redux store
    const { token, userData } = useSelector(state => state.auth);
    const isLoggedIn = !!token;

    const scrollPosition = useScrollPosition();
    const isScrolled = scrollPosition > 520;
    const dropdownRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            dispatch(fetchUserData());
        } else {
            console.error('Logout failed');
        }
    };

    const handleLoginClick = () => {
        dispatch(openAuthPopup());
    };

    const handleRegistrationClick = () => {
        dispatch(openRegistrationPopup());
    }

    return (
        <header className={`fixed top-0 border-t-[#ffffff33] border-b-[#ffffff33] border-x-transparent border-[0.5px] left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-black shadow-md' : 'bg-[#4a4a4a3d] text-white'}`}>
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
                                {isScrolled ?
                                    <img src="/logo-black.png" alt="SBS Logo" className="h-12" />
                                    :
                                    <img src="/logo.png" alt="SBS Logo" className="h-12" />
                                }
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <NavMenuCategories />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center space-x-4">
                        {isLoggedIn ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleRegistrationClick}
                                    className="bg-[#fa2964e6] text-white px-4 py-2 rounded hover:bg-pink-600">
                                    <span>Free Listing</span>
                                </button>
                                <button
                                    onClick={handleLoginClick}
                                    className="bg-[#fa2964e6] text-white px-4 py-2 rounded hover:bg-pink-600"
                                >
                                    Login / Register
                                </button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center space-x-2">
                        {isLoggedIn ? (
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
                        ) : (
                            <div className='flex justify-center items-center'>
                                <button
                                    onClick={handleRegistrationClick}
                                    className="bg-[#fa2964e6] p-2 hover:bg-pink-600 rounded text-white mb-2 transition duration-200"
                                >
                                    <span>Free Listing</span>
                                </button>
                                <button
                                    onClick={handleLoginClick}
                                    className="bg-[#fa2964e6] p-2 text-white rounded hover:bg-pink-600 transition duration-200 mb-2 ml-1"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;