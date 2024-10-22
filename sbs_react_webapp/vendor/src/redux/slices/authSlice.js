import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    userData: null,
    userType: null,
    userId: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.error = null;
            localStorage.setItem('token', action.payload);
        },
        loginFailure: (state, action) => {
            state.token = null;
            state.error = action.payload;
            localStorage.removeItem('token');
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.userData = null;
            state.userType = null;
            state.userId = null;
            localStorage.removeItem('token');
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUserTypeAndId: (state, action) => {
            state.userType = action.payload.userType;
            state.userId = action.payload.userId;
        },
        setCartNumber: (state, action) => {
            state.cartNumber = action.payload;
        },
    },
});

export const {
    loginSuccess,
    loginFailure,
    logout,
    setUserData,
    setUserTypeAndId,
} = authSlice.actions;

export default authSlice.reducer;
