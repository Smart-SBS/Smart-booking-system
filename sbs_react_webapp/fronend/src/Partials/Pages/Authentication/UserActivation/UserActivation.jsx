import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserActivation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const [activateToken, setActivateToken] = useState('');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(5);
    const [userRole, setUserRole] = useState('');

    // Extract token from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('activate_token');
        if (token) {
            setActivateToken(token);
        } else {
            toast.error('Activation token is missing. Please use the link from your email.');
        }
    }, [location]);

    // Handle activation when token is set
    useEffect(() => {
        if (activateToken) {
            activateUser();
        }
    }, [activateToken]);

    useEffect(() => {
        let timer;
        if (countdown > 0 && message && (userRole === '1' || userRole === '2')) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0 && (userRole === '1' || userRole === '2')) {
            navigate('/signin');
        }
        return () => clearTimeout(timer);
    }, [countdown, message, navigate, userRole]);

    // Function to handle user activation
    const activateUser = async () => {
        const params = new URLSearchParams();
        params.append('activate_token', activateToken);
        try {
            const response = await axios.post(`${APP_URL}/api/ActivateUser`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.status === 200) {
                const userRole = response.data.user.role;
                setUserRole(userRole);
                if (userRole === '1' || userRole === '2') {
                    setMessage('User activation successful! Redirecting to sign in page...');
                    setCountdown(5);
                } else if (userRole === '3' || userRole === '4') {
                    setMessage(
                        <>
                            Your account is activated, Please <Link to='https://smart-booking-system.vercel.app'>Click Here</Link> to login or you can login from your mobile app.
                        </>
                    );
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const errorMessages = typeof errorMessage === 'object'
                ? Object.values(errorMessage).join(', ')
                : errorMessage || error.message;
            toast.error(`Error activating user: ${errorMessages}`);
        }
    };

    return (
        <div className="px-xl-5 px-4 auth-body">
            <Toaster />
            <div className="text-center">
                <h2 className="mb-4 text-primary">{message || 'Activating user...'}</h2>
                {message && (userRole === '1' || userRole === '2') && (
                    <div className="mt-4">
                        {countdown > 0 && (
                            <>
                                <p className="text-lg">Redirecting you to sign in page in</p>
                                <p className="text-4xl font-bold text-primary">{countdown}</p>
                                <p>seconds</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActivation;