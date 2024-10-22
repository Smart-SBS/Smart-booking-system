import {createSlice} from '@reduxjs/toolkit';
import {fetchCategoryData} from './categoryApi';

const categorySlice = createSlice({
  name: 'categoryData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryData.fulfilled, (state,action) => {
        (state.status = 'succeeded'), (state.data = action.payload);
      })
      .addCase(fetchCategoryData.rejected, (state,action) => {
        (state.status = 'failed'), (state.data = action.payload);
      });
  },
});

export default categorySlice.reducer;
