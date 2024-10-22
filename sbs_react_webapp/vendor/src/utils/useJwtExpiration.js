import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useJwtExpiration = () => {
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const expirationTime = payload.exp * 1000; // Convert to milliseconds
                    if (Date.now() >= expirationTime) {
                        localStorage.removeItem('token');
                        setIsTokenExpired(true);
                        navigate('/');
                    }               
                } catch (error) {
                    console.error('Error parsing JWT:', error);
                    localStorage.removeItem('token');
                    setIsTokenExpired(true);
                    navigate('/');
                }
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [navigate]);

    return isTokenExpired;
};

export default useJwtExpiration;