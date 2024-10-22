import {createSlice} from '@reduxjs/toolkit';
import {fetchAllCataloguesData, fetchCataloguesData} from './cataloguesApi';

 const cataloguesSlice = createSlice({
  name: 'cataloguesData',
  initialState: {
    data: [],
    error: null,
    status: 'ide',
    allCataloguesData:[],
    allCataloguesError:null,
    allCataloguesStatus:'ide',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCataloguesData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCataloguesData.fulfilled, (state, action) => {
        (state.status = 'succeeded'), (state.data = action.payload);
      })
      .addCase(fetchCataloguesData.rejected, (state, action) => {
        (state.status = 'failed'), (state.data = action.payload);
      })
      .addCase(fetchAllCataloguesData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllCataloguesData.fulfilled, (state, action) => {
        (state.status = 'succeeded'), (state.allCataloguesData = action.payload);
      })
      .addCase(fetchAllCataloguesData.rejected, (state, action) => {
        (state.status = 'failed'), (state.allCataloguesData = action.payload);
      })
  },
});
export default cataloguesSlice.reducer;
