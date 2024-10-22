import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setUserData, setUserTypeAndId } from '../slices/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

const getUserTypeAndId = (token) => {
    const { user_id, role } = jwtDecode(token).data;
    const userType = role === '4' ? 'user' : 'vendor';
    return { userType, userId: user_id };
};

const fetchUserDataFromApi = async (userType, userId, token) => {
    const requestUrl = `${API_URL}/ma-${userType}-profile/${userId}`;
    const response = await axios.get(requestUrl, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
};

export const fetchUserData = () => async (dispatch, getState) => {
    const { token } = getState().auth;
    if (!token) return;

    try {
        const { userType, userId } = getUserTypeAndId(token);

        // Dispatch the new action to store userType and userId in Redux
        dispatch(setUserTypeAndId({ userType, userId }));

        const response = await fetchUserDataFromApi(userType, userId, token);

        if (response.data.status === 200) {
            dispatch(setUserData(response.data[userType]));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message;
        const formattedError = typeof errorMessage === 'object'
            ? Object.values(errorMessage).join(', ')
            : errorMessage || error.message;
        console.error(`Error fetching user data: ${formattedError}`);
    }
};