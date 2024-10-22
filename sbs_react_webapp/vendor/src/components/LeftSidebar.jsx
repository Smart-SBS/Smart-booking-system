/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavMenuCategories from './NavMenuCategories';
import { logoutUser } from '../redux/actions/authActions';

const LeftSidebar = ({ isOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Image URL
    const IMG_URL = import.meta.env.VITE_IMG_URL

    // Get auth state and user data from Redux store
    const { token, userData } = useSelector(state => state.auth);
    const isLoggedIn = !!token;

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
    }, [isOpen]);

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
        <>
            <div
                ref={sidebarRef}
                className={`w-64 bg-gray-900 text-gray-300 min-h-screen p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                transition-transform duration-300 ease-in-out fixed left-0 top-0 z-40 md:relative md:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4 mt-20">
                    <nav className="flex-grow items-center justify-center">
                        <NavMenuCategories />
                    </nav>
                    <div className="mt-auto">
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center space-x-2 w-full px-3 py-2 rounded"
                                    onClick={() => toggleDropdown()}
                                >
                                    <img
                                        src={userData?.profile_pic ? `${IMG_URL}/profile/thumb/${userData.profile_pic}` : `${IMG_URL}/default/list/user.webp`}
                                        alt={userData?.name || "User FullName"}
                                        className="h-11 w-11 rounded-full border-2 border-[#fa2964e6] object-cover"
                                        onError={(e) => { e.target.src = `${IMG_URL}/default/list/user.webp`; }}
                                    />
                                    <span>Hi, {userData?.firstname} {userData?.lastname}!</span>
                                    <span className="ml-1">▼</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-1 z-10">
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
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;