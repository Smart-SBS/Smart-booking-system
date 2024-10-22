import {configureStore} from '@reduxjs/toolkit';
import locationSlice from './location/locationSlice';
import categorySlice from './category/categorySlice';
import cataloguesSlice from './catalogues/cataloguesSlice';
import nearestSearchSlice from './nearestsearch/nearestSearchSlice';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice';
import wishListSlice from './wishlist/wishListSlice';
import shopSlice from './shop/shopSlice';

const store = configureStore({
  reducer: {
    locationData: locationSlice,
    categoryData: categorySlice,
    cataloguesData: cataloguesSlice,
    nearestSearch: nearestSearchSlice,
    authData: authSlice,
    userInfo: userSlice,
    wishList:wishListSlice,
    shop:shopSlice,
  },
});

export default store;
