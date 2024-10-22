import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../screen/Home';
import Login from '../screen/Login';
import Listing from '../screen/Listing';
import Profile from '../screen/Profile';
 import Dashboard from '../screen/Dashboard';
import ChangePassword from '../screen/ChangePassword';
import PopularCatalogues from '../screen/PopularCatalogues';
import SearchResult from '../screen/SearchResult';
import CataloguesInfo from '../components/CataloguesInfo';
import LoadingScreen from '../components/Loading';
 import {fetchUserApiData} from '../redux/user/userApi';
import {userToken} from '../redux/user/userSlice';
import MyBusinesses from '../screen/MyBusinesses';
import MyShops from '../screen/MyShops';
import Payment from '../screen/Payment';
import ShopCatalogues from '../components/ShopCatalogues';
import AddCataloguesGallery from '../components/AddCataloguesGallary';
import AddShopGallery from '../components/AddShopGallery';
import ShopOffers from '../components/ShopOffers';
import AddCataloguesReviews from '../components/AddCataloguesRewiev';
import AddCataloguesFaq from '../components/AddCataloguesFaq';
 import HourForShop from '../components/HourForShop';
import CartScreen from '../screen/CartScreen';
import CheckoutScreen from '../screen/CheckoutScreen';
import MyOrder from '../screen/MyOrder';
import PopularShops from '../screen/PopularShops';
import ShopInfo from '../components/ShopInfo';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('authentication');
         const data = jsonValue ? JSON.parse(jsonValue) : null;
        if (data) {
          await dispatch(userToken(data?.token));
          const resultAction = await dispatch(fetchUserApiData(data));

          if (fetchUserApiData.fulfilled.match(resultAction)) {
            // API call successful
            setIsLoading(false);
          } else {
            // API call failed
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Listing" component={Listing} />
 
      <Stack.Screen name="MyShops" component={MyShops} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="MyBusinesses" component={MyBusinesses} />
       <Stack.Screen name="CataloguesInfo" component={CataloguesInfo} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ShopCatalogues" component={ShopCatalogues} />
      <Stack.Screen name="PopularCatalogues" component={PopularCatalogues} />

      <Stack.Screen
        name="AddCataloguesGallery"
        component={AddCataloguesGallery}
      />

      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AddShopGallery" component={AddShopGallery} />
      <Stack.Screen name="ShopOffers" component={ShopOffers} />
      <Stack.Screen
        name="AddCataloguesReviews"
        component={AddCataloguesReviews}
      />
      <Stack.Screen name="AddCataloguesFaq" component={AddCataloguesFaq} />
       <Stack.Screen name="HourForShop" component={HourForShop} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

{/*  */}
<Stack.Screen name="MyOrder" component={MyOrder} />
<Stack.Screen name="PopularShops" component={PopularShops} />
<Stack.Screen name="ShopInfo" component={ShopInfo} />



      
    </Stack.Navigator>
  );
}
