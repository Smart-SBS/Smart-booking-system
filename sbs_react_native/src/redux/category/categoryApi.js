import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/endpoints";

export const fetchCategoryData=createAsyncThunk(
    'category/fetchCategoryData',
    async (_, {rejectWithValue}) =>{
        try {
            const response= await apiClient.get(API_ENDPOINTS.GET_CATEGORIES)
             return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)