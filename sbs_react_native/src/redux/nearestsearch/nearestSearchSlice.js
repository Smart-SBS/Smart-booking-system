import { createSlice } from '@reduxjs/toolkit';
import { fetchNearestSearchData } from './nearestSearchApi';

const nearestSearchSlice = createSlice({
  name: 'nearestSearch',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearestSearchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearestSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNearestSearchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default nearestSearchSlice.reducer;
