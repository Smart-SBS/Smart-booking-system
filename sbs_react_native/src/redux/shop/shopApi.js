import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../api/endpoints";
import apiClient from "../../api/apiClient";

export const fetchPopularShop = createAsyncThunk(
    'vendor/fetchPopularShop',
    async (vendorData, {rejectWithValue}) => {
      try {
        const response= await apiClient.get(API_ENDPOINTS.MA_ALL_SHOPS);
         return response?.data?.shops

      } catch (error) {
        // console.log('error response data', error.response?.data);
        // console.log('error response headers', error.response?.headers);
        return rejectWithValue(error.response?.data || {message: error.message});
      }
    },
  );
  