import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const UserDropdown = () => {
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem("jwtToken");
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const decoded = jwtDecode(token);
                const { user_id } = decoded.data;
                const res = await axios.get(`${APP_URL}/api/user-details/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.data.status === 200) {
                    setUserData(res.data.user);
                }
            } catch (error) {
                toast.error("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchUser();
        }
    }, [APP_URL, token]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleLogout = async () => {
        try {
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await axios.post(`${APP_URL}/api/logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('jwtToken');
                toast.success(response.data.message);
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 1000);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="dropdown-menu dropdown-menu-end shadow p-2 p-xl-3 rounded-4">
            <div className="bg-body p-2 rounded-3">
                <h4 className="mb-1 title-font text-gradient">{userData.firstname}</h4>
                <p className="small text-muted">{userData.email}</p>
                <p className="mb-0 animation-blink">
                    <span className={isOnline ? "text-primary" : "text-danger"}>●</span>
                    {isOnline ? " Online" : " Offline"}
                </p>
            </div>
            <ul className="list-unstyled mt-3">
                <li><Link className="dropdown-item rounded-pill" aria-label="my profile" to="/admin/user/my-profile">My Profile</Link></li>
                <li className="dropdown-divider"></li>
            </ul>
            <button className="btn py-2 btn-primary w-100 mt-3 rounded-pill" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDropdown;
