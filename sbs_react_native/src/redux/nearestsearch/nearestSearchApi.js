import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchNearestSearchData = createAsyncThunk(
  'nearestSearch/fetchNearestSearchData',
  async (val, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `https://sbs.smarttesting.in/api/ma-search?category=${val.category}&location=${val.location}&keyword=${val.key}`,
      );

      return response.data;
    } catch (error) {
      console.log('-->', error);
    }
  },
);
