import { createSlice } from '@reduxjs/toolkit';
import { fetchNearestSearchData } from './nearestSearchApi';
import { fetchPopularShop } from './shopApi';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularShop.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopularShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default shopSlice.reducer;
