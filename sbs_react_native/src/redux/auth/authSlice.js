import {createSlice} from '@reduxjs/toolkit';
import {loginVendor, registerVendor} from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
    registerStatus: 'idle',
    registerError: null,
  },
  reducers: {
    empty: state => {
      state.token = '';
    },
  },
  extraReducers: builder => {
    // Handle login cases
    builder
      .addCase(loginVendor.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.user = action.payload.user;
        state.token = action.payload.jwt; // Assuming API returns a token
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle register cases
      .addCase(registerVendor.pending, state => {
        state.registerStatus = 'loading';
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        // Optionally, handle successful registration
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerError = action.payload;
      });
  },
});

export const {empty} = authSlice.actions;
export default authSlice.reducer;
