import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import {API_ENDPOINTS} from '../../api/endpoints';

export const fetchCataloguesData = createAsyncThunk(
  'catalogues/fetchCatalogues',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.POPULAR_CATALOG);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllCataloguesData = createAsyncThunk(
  'catalogues/fetchAllCatalogs',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ALL_CATALOG);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
