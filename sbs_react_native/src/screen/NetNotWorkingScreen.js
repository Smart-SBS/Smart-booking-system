import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {API_ENDPOINTS} from '../api/endpoints';
import {API_BASE_URL} from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/${API_ENDPOINTS.GET_CITIES_FOR_SEARCH}`;

const NetNotWorkingScreen = ({onRetry, isApiAvailable}) => {
  const [isConnected, setIsConnected] = useState(true);
  const scale = useSharedValue(1);

  const startAnimation = () => {
    scale.value = withSpring(1.2, {damping: 2, stiffness: 150}, () => {
      scale.value = withSpring(1);
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  // Function to check network status
  const checkNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  // Function to handle retry button press
  const handleRetry = useCallback(async () => {
    startAnimation(); // Restart animation

    // Check network status
    const connected = await checkNetworkStatus();
    setIsConnected(connected);

    if (connected) {
      // Check API availability if connected
      try {
        const response = await axios.get(API_URL);
        if (response.status === 200) {
          if (typeof onRetry === 'function') {
            onRetry(); // Call the retry function passed as a prop
          }
        } else {
          Alert.alert(
            'API Error',
            'The server is not responding. Please try again later.',
          );
        }
      } catch (error) {
        Alert.alert(
          'API Error',
          'The server is not responding. Please try again later.',
        );
      }
    } else {
      Alert.alert(
        'Network Error',
        'Unable to connect. Please check your internet connection.',
      );
    }
  }, [onRetry]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          useAnimatedStyle(() => ({transform: [{scale: scale.value}]})),
        ]}>
        <Image
          tintColor={color.lightRuby} // Pink tint color for the image
          source={Images.network} // Ensure this path is correct
          style={styles.icon}
        />
      </Animated.View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>
        {isApiAvailable
          ? "It looks like there's an issue with your network connection."
          : "It looks like there's an issue with the server. Please try again later."}
      </Text>
      <Text style={styles.retry}>
        Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE4EC',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.lightRuby,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: color.lightRuby,
    textAlign: 'center',
    marginBottom: 20,
  },
  retry: {
    fontSize: 16,
    color: color.lightRuby,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: color.lightRuby,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NetNotWorkingScreen;
