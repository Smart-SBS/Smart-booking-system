// src/features/location/locationApi.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import {API_ENDPOINTS} from '../../api/endpoints';

// Define the async thunk
export const fetchLocationData = createAsyncThunk(
  'location/fetchLocationData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_ARIAS);
      const data = await apiClient.get(API_ENDPOINTS.GET_CITIES_FOR_SEARCH);

      return {...response.data, ...data.data};
    } catch (error) {
      console.log('error==>', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPopularLocationData = createAsyncThunk(
  'location/fetchPopularLocationData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.POPULAR_CITIES);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
