import axios from 'axios';
import { loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { fetchUserData } from './userActions';

const API_URL = import.meta.env.VITE_API_URL;

export const login = (identifier, password) => async (dispatch) => {
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);

    try {
        const response = await axios.post(`${API_URL}/ma-login`, formData);
        if (response.data.status === 200) {
            const { jwt } = response.data;
            localStorage.setItem('token', jwt);
            dispatch(loginSuccess(jwt));
            dispatch(fetchUserData());
            return true;
        }
    } catch (error) {
        let errorMessage = '';
        if (error.response?.data?.message && typeof error.response.data.message === 'object') {
            errorMessage = Object.values(error.response.data.message).join(', ');
        } else {
            errorMessage = error.response?.data?.message || error.message;
        }
        dispatch(loginFailure(errorMessage));
        return false;
    }
};

export const logoutUser = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
        const response = await axios.post(`${API_URL}/ma-logout`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            localStorage.removeItem('token');
            dispatch(logout());
            return true;
        }
    } catch (error) {
        let errorMessage = '';
        if (error.response?.data?.message && typeof error.response.data.message === 'object') {
            errorMessage = Object.values(error.response.data.message).join(', ');
        } else {
            errorMessage = error.response?.data?.message || error.message;
        }
        console.error(`Error logging out: ${errorMessage}`);
        return false;
    }
};