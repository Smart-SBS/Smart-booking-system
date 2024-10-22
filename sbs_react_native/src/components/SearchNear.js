import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import InputBox from './InputBox';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import DropdownComponent from './DropdownComponent';

const SearchNear = () => {
  const navigation = useNavigation();
  const [selectedSearch, setSelectedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationFormatData, setLocationFormatData] = useState([]);
  const [categoryFormatData, setCategoryFormatData] = useState([]);
  const [getUserLocation, setGetUserLocation] = useState([]);

  const locationData = useSelector(state => state.locationData.data);
  const categoryData = useSelector(state => state.categoryData.data);
  useEffect(() => {
    getLocation();
    if (locationData && categoryData) {
      formatData();
    }
  }, [locationData, categoryData]);

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            reverseGeocode(
              position?.coords?.latitude,
              position?.coords?.longitude,
            );
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const city =
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village;
      if (city) {
        const format = city.replace(/City\b/g, '').trim();
        setSelectedLocation({value: format, label: format});
        setGetUserLocation([{value: format, label: format}]);
      }
    } catch (error) {
      console.log('error', error.message);
      Alert.alert(
        '',
        'Unable to determine your city. Please enable your location to see results based on your location.',
      );

      setLocationMessageShown(true);
      localStorage.setItem('locationMessageShown', 'true');
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const handleSearch = useCallback(() => {
    navigation.navigate('SearchResult', {
      val: {
        selectedSearch,
        selectedCategory,
        selectedLocation,
      },
    });
  }, [selectedSearch, selectedCategory, selectedLocation, navigation]);

  const formatData = () => {
    const formatLocationData = [
      ...(locationData?.cities || []).map(item => ({
        value: `${item?.city_name}`,

        label: `${item?.city_name}`,
        ...item,
      })),
      ...(locationData?.areas || []).map(item => ({
        value: `${item?.area_name}, ${item?.city_name}, ${item?.states_name}`,
        label: `${item?.area_name}, ${item?.city_name}, ${item?.states_name}`,
        ...item,
      })),
    ];

    const formatCategoryData = (categoryData?.active_category || []).map(
      ({category_name}) => ({
        value: category_name,
        label: category_name,
      }),
    );

    setLocationFormatData(formatLocationData);
    setCategoryFormatData(formatCategoryData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputBox
          placeholder="What are you looking for?"
          value={selectedSearch}
          onChangeText={setSelectedSearch}
        />
        <DropdownComponent
          data={[...locationFormatData, ...getUserLocation]}
          setValue={setSelectedLocation}
          value={selectedLocation?.value || ''}
          placeholder="Select Location"
        />
        <DropdownComponent
          data={categoryFormatData}
          setValue={setSelectedCategory}
          value={selectedCategory?.value || ''}
          placeholder="Select Category"
        />
        <FlatButton
          containerStyle={styles.searchButton}
          text="Search Now"
          onPress={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,  
    paddingHorizontal: 12,
  },
  inputContainer: {
    backgroundColor: color.white,
    width: '100%',
    borderWidth: 1,  
    borderColor: color.border,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 12,
  },
  searchButton: {
    backgroundColor: color.lightRuby,
    paddingHorizontal: 30,
    paddingVertical: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
});

export default SearchNear;
