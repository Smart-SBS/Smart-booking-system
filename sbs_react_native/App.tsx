import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import store from './src/redux/store';
import { API_ENDPOINTS } from './src/api/endpoints';
import { API_BASE_URL } from './src/config/apiConfig';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import NetNotWorkingScreen from './src/screen/NetNotWorkingScreen';

const API_URL = `${API_BASE_URL}/${API_ENDPOINTS.GET_CITIES_FOR_SEARCH}`; // Replace with your API health check endpoint

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        try {
          const response = await axios.get(API_URL);
          setIsApiAvailable(response.status === 200);
        } catch (error) {
          setIsApiAvailable(false);
        }
      } else {
        setIsApiAvailable(false);
      }
    };
    checkStatus();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        checkStatus();
      } else {
        setIsApiAvailable(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);

    if (state.isConnected) {
      try {
        const response = await axios.get(API_URL);
        setIsApiAvailable(response.status === 200);
      } catch (error) {
        setIsApiAvailable(false);
      }
    } else {
      setIsApiAvailable(false);
    }
  };

  return (
    <Provider store={store}>
      {isConnected && isApiAvailable ? (
        <DrawerNavigation />
      ) : (
        <NetNotWorkingScreen 
          onRetry={handleRetry}
          isApiAvailable={isApiAvailable}
        />
      )}
    </Provider>
  );
}
