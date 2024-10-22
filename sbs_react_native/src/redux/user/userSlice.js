 import {createSlice} from '@reduxjs/toolkit';
import {fetchUserApiData} from './userApi';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
    token:null
  },
  reducers: { 
    logout: (state) => {
       state.data = {};
      state.status = 'idle'; // or 'loggedOut' if you want a specific state
      state.error = null;
    },
    userToken:(state,action) =>{
       state.token=action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserApiData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserApiData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserApiData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logout ,userToken} = userSlice.actions;

export default userSlice.reducer;
