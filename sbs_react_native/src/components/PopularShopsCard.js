import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {color} from '../constants/color';
import FlatButton from './FlatButton';
import Catalogues from './Catalogues';
import dimensions from '../utils/dimensions';
import {addItemInCatalog, deleteWishListing, timeAgo} from '../utils/function';
import {fetchWishList} from '../redux/wishlist/wishlistapi';
import {Images} from '../constants/assets';
import {API_ENDPOINTS} from '../api/endpoints';

export const PopularShopsCard = React.memo(data => {
  const {data: info, token} = useSelector(state => state.userInfo);
  const wishlist = useSelector(state => state?.wishList?.data);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (info.id && info.role_id != '3') {
      const data = {
        id: info.id,
        token: token,
      };
      dispatch(fetchWishList(data));
    }
  }, [info.id]);

  const onAddWishListing = async (item, isWishList) => {
    try {
      if (!info.id) {
        Alert.alert(
          '',
          'You need to login from your user account to make a wishlist.',
        );
        return;
      }
      const obj = {
        catalog_id: item.id,
        user_id: info?.id,
      };

      if (isWishList) {
        // Find the wishlist item to delete
        const wishlistItem = wishlist?.find(res => res.catalog_id === item.id);

        if (wishlistItem) {
          await deleteWishListing(wishlistItem.id, token);
          console.log('Wishlist item deleted successfully');
        }
      } else {
        const response = await addItemInCatalog(
          API_ENDPOINTS.ADD_WISHLIST,
          obj,
          token,
        );
        // await getWishListing(); // Ensure the wishlist is updated after addition
        console.log('Wishlist item added successfully:', response);
      }
      const data = {
        id: info.id,
        token: token,
      };
      dispatch(fetchWishList(data));
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  const onPress = item => navigation.navigate('ShopInfo', {data: item});

  const DetailRow = ({icon, text}) => (
    <View style={styles.detailRow}>
      <Image
        tintColor={color.lightRuby}
        source={icon}
        style={styles.detailIcon}
      />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.popularListingContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
        }}>
        <View>
          <Text style={styles.popularListingHeading}>
            POPULAR <Text style={styles.highlightedText}>SHOPS</Text>
          </Text>
          <Text style={styles.popularListingSubHeading}>
            What are you interested in?
          </Text>
        </View>
        <FlatButton
          textStyle={{color: color.lightRuby}}
          onPress={() => navigation.navigate('PopularShops')}
          text={'View All'}
        />
      </View>
      <View style={{backgroundColor: '#ECECEC'}}>
        <FlatList
          data={data?.data?.slice(0, 6)}
          showsHorizontalScrollIndicator={false}
          horizontal
          key={item => item.business_id.toString()}
          contentContainerStyle={{marginTop: 12, marginBottom: 24}}
          renderItem={({item}) => {
            console.log("item=>>>",item?.business_name);
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                style={styles.popularListingContent}>
                {/* <View style={{position:'absolute',width:'100%',height:80,zIndex:1,alignItems:"center",top:14}}> */}
                {/* </View> */}
                <ImageBackground
                  resizeMode={item?.primary_shop_image ? 'cover' : 'contain'}
                  source={
                    item?.primary_shop_image
                      ? {
                          uri: `${API_ENDPOINTS.VENDOR_SHOP_IMAGE_THUMB}/${item?.primary_shop_image}`,
                        }
                      : Images.gallery
                  }
                  style={[
                    styles.popularListingImage,
                    !item?.primary_shop_image && {tintColor: color.gray},
                  ]}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      left: 15,
                      width: 60,
                      height: 60,
                      zIndex: 1,
                      backgroundColor: color.border,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      borderWidth: 2,
                      padding: 5,
                      borderColor: color.lightRuby,
                    }}>
                    <Image
v                      source={
                        item?.business_logo
                          ? {
                              uri: `${API_ENDPOINTS.VENDOR_BUSINESS_IMAGE}/${item?.business_logo}`,
                            }
                          : Images.gallery
                      }
                      style={{
                        height: 45,
                        width: 45,
                        zIndex: 1,
                        borderRadius: item?.business_logo?100:0,
                        // borderWidth: 2,
                        padding: 5,
                        borderColor: color.lightRuby,
                      }}
                    />
                  </View>
                </ImageBackground>
                <View style={{marginLeft: 12, marginBottom: 12, paddingTop: 8}}>
                  <Text style={styles.popularListingTitle}>
                    {item?.shop_name}
                  </Text>
                  <DetailRow
                    icon={Images.business}
                    text={`${item?.business_name}`}
                  />
                  <DetailRow
                    icon={Images.location}
                    text={`${item?.area_name}, ${item?.city_name}, ${item?.states_name}`}
                  />
                  <DetailRow
                    icon={Images.date}
                    text={`Posted ${timeAgo(item?.created_at)}`}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  popularListingContainer: {
    backgroundColor: '#ECECEC',
    // marginBottom: 40,
    paddingTop: 24,
  },
  popularListingHeading: {
    color: color.black,
    fontSize: 20,
    fontWeight: '600',
  },
  popularListingSubHeading: {
    marginTop: 4,
    color: color.gray,
    fontSize: 12,
  },
  popularListingContent: {
    elevation: 4,
    shadowRadius: 1,
    paddingBottom: 12,
    shadowOpacity: 0.1,
    marginHorizontal: 8,
    shadowColor: '#d3d3d3', // Changed shadow color to light gray
    backgroundColor: color.white,
    width: dimensions.width / 1.2,
    shadowOffset: {width: 0, height: 1},
    paddingBottom: 0,
    width: dimensions.width - 30,
    marginVertical: 8,
  },
  popularListingImage: {
    height: 220,
    width: '100%',
  },
  popularListingTitle: {
    color: color.black,
    fontSize: 16,
  },

  detailRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  detailIcon: {
    height: 20,
    width: 20,
  },
  detailText: {
    marginLeft: 8,
    color: color.gray,
  },
});
