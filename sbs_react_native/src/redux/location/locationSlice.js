// src/features/location/locationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {fetchLocationData, fetchPopularLocationData} from './locationApi';

const locationSlice = createSlice({
  name: 'locationData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    popularListing: [],
    popularStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLocationData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLocationData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLocationData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchPopularLocationData.pending, (state, action) => {
        state.popularStatus = 'loading';
      })
      .addCase(fetchPopularLocationData.fulfilled, (state, action) => {
        state.popularStatus = 'succeeded';
        state.popularListing = action.payload;
      })
      .addCase(fetchPopularLocationData.rejected, (state, action) => {
        state.popularStatus = 'failed';
        state.popularListing = action.payload;
      });
  },
});

export default locationSlice.reducer;
