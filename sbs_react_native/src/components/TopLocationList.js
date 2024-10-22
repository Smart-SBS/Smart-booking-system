import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {useSelector} from 'react-redux';
import {color} from '../constants/color';
import {API_ENDPOINTS} from '../api/endpoints';
import dimensions, {scaleSize} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';

const TopLocationList = () => {
  const navigation = useNavigation();
  const {popularListing} = useSelector(state => state.locationData);

  const onLocationPress = item => {
     navigation.navigate('SearchResult', {
      val: {
        selectedLocation: {area_name: item?.city_name},
      },
    });
  };
  return (
    <View style={styles.container}>
      <SwiperFlatList
        index={0}
        data={popularListing?.Cities}
        showPagination
        paginationStyleItem={styles.paginationStyleItem}
        paginationActiveColor={color.lightRuby}
        paginationDefaultColor={color.gray}
        style={{borderRadius: 12}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onLocationPress(item)}
              style={styles.item}>
              <View style={{padding: 12, flex: 1, borderRadius: 18}}>
                <ImageBackground
                  source={{
                    uri: API_ENDPOINTS.THUMB_PATH + '/' + item?.city_image,
                  }}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 8}}
                  style={styles.image}>
                  <Text
                    style={{
                      color: color.white,
                      position: 'absolute',
                      bottom: 10,
                      left: 16,
                      fontSize: 20,
                    }}>
                    {item?.city_name}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 30,
  },
  item: {
    width: dimensions.width,
    height: scaleSize(270),
    marginBottom: 10,
    borderRadius: 18,
    overflow: 'hidden', // Ensure child components respect borderRadius
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 18, // Apply borderRadius to the image
  },
  text: {
    color: color.white,
    position: 'absolute',
    bottom: 5,
    left: 8,
    fontSize: 20,
  },
  paginationStyleItem: {
    marginTop: 22,
    marginHorizontal: 4,
    backgroundColor: color.gray,
  },
});

export default TopLocationList;
