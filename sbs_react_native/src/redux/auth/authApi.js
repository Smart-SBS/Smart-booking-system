import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient, {apiClientMultipart} from '../../api/apiClient';
import {API_ENDPOINTS} from '../../api/endpoints';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {addItemInCatalog, submitEnquiry} from '../../utils/function';
import {CART_STORAGE_KEY, INQUIRE_ITEMS} from '../../config/key';

const createFormData = data => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  return formData;
};

export const loginVendor = createAsyncThunk(
  'auth/loginVendor',
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = createFormData(credentials);
      const response = await apiClientMultipart.post(API_ENDPOINTS.POST_LOGIN_VENDOR, formData);
      // const storedCartItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
      // const storedInquireItems = await AsyncStorage.getItem(INQUIRE_ITEMS);
      // const userId = jwtDecode(response?.data?.jwt)?.data?.user_id;

      // if (storedCartItems) {
      //   // const cartData = JSON.parse(storedCartItems) || [];
        
      //   // Add items to catalog
      //   // await Promise.all(cartData.map(res => {
      //   //   return addItemInCatalog(API_ENDPOINTS.ADD_CART, { catalog_id: res?.id, user_id: userId }, response?.data?.jwt);
      //   // }));

      //   // Handle inquiries
      //   if (storedInquireItems) {
      //     const inquireData = JSON.parse(storedInquireItems) || [];
      //     await Promise.all(inquireData.map(res => {
      //       return submitEnquiry({
      //         catalog_id: res?.catalog_id,
      //         enquiry_date: res?.enquiry_date,
      //         enquiry_time: res?.enquiry_time,
      //         message: res?.message,
      //       }, response?.data?.jwt);
      //     }));
      //     await AsyncStorage.removeItem(INQUIRE_ITEMS);
      //   }

      //   await AsyncStorage.removeItem(CART_STORAGE_KEY);
      // }
      
      return response?.data;
    } catch (error) {
      console.log( error.response.data);
      // Alert.alert('', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  },
);


// export const loginVendor = createAsyncThunk(
//   'auth/loginVendor',
//   async (credentials, {rejectWithValue}) => {
//     try {
//       const formData = createFormData(credentials);
//        const response = await apiClientMultipart.post(
//         API_ENDPOINTS.POST_LOGIN_VENDOR,
//         formData,
//       );
//       const storedCartItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
//       const storedInquireItems = await AsyncStorage.getItem(INQUIRE_ITEMS);

//       if (storedCartItems) {
//         const data = JSON.parse(storedCartItems) || []; // Fallback to an empty array
//         const userId = jwtDecode(response?.data?.jwt)?.data?.user_id;

//         const promises = data.map(async res => {
//           const obj = {
//             catalog_id: res?.id,
//             user_id: userId,
//           };
//           return addItemInCatalog(
//             API_ENDPOINTS.ADD_CART,
//             obj,
//             response?.data?.jwt,
//           );
//         });
//         console.log('storedInquireItems', storedInquireItems);
//         if (storedInquireItems) {
//           const inquirePromises = storedInquireItems?.map(async res => {
//             const obj = {
//               user_id: userId,
//               enquiry_date: res?.enquiry_date,
//               enquiry_time: res?.enquiry_time,
//               message: res?.message,
//             };
//             return submitEnquiry(obj, response?.data?.jwt);
//           });
//           await Promise.all(inquirePromises);
//           await AsyncStorage.removeItem(INQUIRE_ITEMS);
//         }

//         await Promise.all(promises); // Wait for all promises to resolve
//         await AsyncStorage.removeItem(CART_STORAGE_KEY);
//       }
//       return response?.data;
//     } catch (error) {
//       // console.log(error.response?.data?.message ,  error.message);
//       Alert.alert('', error.response?.data?.message || error.message);
//       return rejectWithValue(error.response?.data || {message: error.message});
//       // return rejectWithValue(error.response.data);
//     }
//   },
// );

export const registerVendor = createAsyncThunk(
  'vendor/registerVendor',
  async (vendorData, {rejectWithValue}) => {
    try {
      const formData = createFormData(vendorData);
      const response = await apiClientMultipart.post(
        vendorData?.isUser
          ? API_ENDPOINTS.POST_REGISTER_USER
          : API_ENDPOINTS.POST_REGISTER_VENDOR,
        formData,
      );
      return response.data;
    } catch (error) {
      // console.log('error response data', error.response?.data);
      // console.log('error response headers', error.response?.headers);
      return rejectWithValue(error.response?.data || {message: error.message});
    }
  },
);
