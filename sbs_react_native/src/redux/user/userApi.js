import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../api/endpoints';
import apiClient from '../../api/apiClient';

export const fetchUserApiData = createAsyncThunk(
  'location/fetchUserApiData',
  async (val, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${
          val?.isUser
            ? API_ENDPOINTS.GET_USER_PROFILE
            : API_ENDPOINTS.GET_VENDOR_PROFILE
        }/${val?.id}`,
        {
          headers: {
            Authorization: `Bearer ${val?.token}`,
          },
        },
      );
      return {...response.data.vendor, ...response.data.user};
    } catch (error) {
      console.log('fetchUserApiData', error);
      return rejectWithValue(error.response.data);
    }
  },
);
