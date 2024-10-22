import { createSlice } from '@reduxjs/toolkit';

const authPopupSlice = createSlice({
    name: 'authPopup',
    initialState: {
        isAuthOpen: false,
        isRegistrationOpen: false
    },
    reducers: {
        openAuthPopup: (state) => {
            state.isAuthOpen = true;
            state.isRegistrationOpen = false; // Close registration if open
        },
        closeAuthPopup: (state) => {
            state.isAuthOpen = false;
        },
        openRegistrationPopup: (state) => {
            state.isRegistrationOpen = true;
            state.isAuthOpen = false; // Close auth if open
        },
        closeRegistrationPopup: (state) => {
            state.isRegistrationOpen = false;
        }
    },
});

export const {
    openAuthPopup,
    closeAuthPopup,
    openRegistrationPopup,
    closeRegistrationPopup
} = authPopupSlice.actions;

export default authPopupSlice.reducer;