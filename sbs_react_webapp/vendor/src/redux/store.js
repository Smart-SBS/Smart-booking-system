import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import authPopupReducer from './slices/authPopupSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        authPopup: authPopupReducer,
    },
});

export default store;