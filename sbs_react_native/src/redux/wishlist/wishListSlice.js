import {createSlice} from '@reduxjs/toolkit';
 import { fetchWishList } from './wishlistapi';

const wishListSlice = createSlice({
  name: 'wishListData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWishList.fulfilled, (state,action) => {
         (state.status = 'succeeded'), (state.data = action.payload);
      })
      .addCase(fetchWishList.rejected, (state,action) => {
        (state.status = 'failed'), (state.data = []);
      });
  },
});

export default wishListSlice.reducer;
