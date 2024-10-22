/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import useJwtExpiration from './useJwtExpiration';
import { useEffect } from 'react';

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const isTokenExpired = useJwtExpiration();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired) {
            navigate('/', { replace: true });
        }
    }, [isTokenExpired, navigate]);

    return isTokenExpired ? null : children;
};

export default AuthWrapper