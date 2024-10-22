import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../api/endpoints';
import apiClient from '../../api/apiClient';

export const fetchWishList = createAsyncThunk(
  'location/fetchWishList',
  async (val, {rejectWithValue}) => {
     try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.WISHLIST}/${val?.id}`,
        {
          headers: {
            Authorization: `Bearer ${val?.token}`,
          },
        },
      );
       return  response.data.Wishlists
    } catch (error) {
      console.log('fetchWishList', error);
      return rejectWithValue(error.response.data);
    }
  },
);


// export const fetchEditDeleteData = createAsyncThunk(
//   'location/fetchWishList',
//   async (val, {rejectWithValue}) => {
//     try {
//       const response = await apiClient.get(
//         `${API_ENDPOINTS.ADD_WISHLIST}/${val?.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${val?.token}`,
//           },
//         },
//       );
//       return {...response.data.vendor, ...response.data.user};
//     } catch (error) {
//       console.log('fetchWishList', error);
//       return rejectWithValue(error.response.data);
//     }
//   },
// );
