import React, { useState } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {color} from '../constants/color';
import {timeAgo} from '../utils/function';
import {Images} from '../constants/assets';
import dimensions from '../utils/dimensions';
import {API_ENDPOINTS} from '../api/endpoints';
import FlatButton from './FlatButton';
import {useSelector} from 'react-redux';
import Auth from './Auth';

const Catalogues = ({key, data, list, listingContentStyle, onPress,onWishlistPress}) => {
  const userInfo = useSelector(state => state.userInfo?.data);
  const wishlist = useSelector(state => state?.wishList?.data);
  const [isSignIN, setIsSignIN] = useState(false)

    const convertRatingToPercentage = ratingStr => {
    if (!ratingStr) return '0';

    const ratingsArray = ratingStr.split(',').map(Number);
    const averageRating =
      ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;

    return Math.round(averageRating).toFixed(1);
  };

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
    <TouchableOpacity
      key={key}
      onPress={onPress}
      style={[styles.popularListingContent, listingContentStyle]}>
      <Image
        resizeMode={data?.primary_catalog_image ? 'cover' : 'contain'}
        source={
          data?.primary_catalog_image
            ? {
                uri: `${
                  list
                    ? API_ENDPOINTS.CATALOGUES_PATH_LIST
                    : API_ENDPOINTS.CATALOGUES_PATH_THUMB
                }/${data?.primary_catalog_image}`,
              }
            : Images.gallery
        }
        style={[
          styles.popularListingImage,
          !data?.primary_catalog_image && {tintColor: color.gray},
        ]}
      />
      {userInfo?.role_id != '3' && (
        <FlatButton
          onPress={()=>userInfo?.role_id?onWishlistPress():setIsSignIN(true)}
          imageStyle={{height: 34, width: 34}}
          containerStyle={{
            height: 0,
            width: 0,
            backgroundColor: '#000',
            right: 28,
            top: 28,
            position: 'absolute',
          }}
          imageSource={wishlist?.some(
            res => res?.catalog_id == data.id,
          ) ? Images.fill_heart : Images.heart}
        />
      )}

      <View style={styles.popularListingDetails}>
        <View style={{marginLeft: 12}}>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            {[1, 2, 3, 4, 5].map((res, index) => {
              return (
                <Image
                  key={index.toString()}
                  tintColor={
                    convertRatingToPercentage(data?.rating) >= res
                      ? color.gold
                      : color.semi_light_gray
                  }
                  source={Images.star}
                  style={{height: 20, width: 20}}
                />
              );
            })}
            <Text style={{color: color.gray}}>{` (${
              data?.rating ? data?.rating?.split(',').length : 0
            } Reviews)`}</Text>
          </View>
          <Text style={styles.popularListingTitle}>{data?.item_title}</Text>
          <DetailRow
            icon={Images.location}
            text={`${data?.area_name}, ${data?.city_name}, ${data?.states_name}`}
          />
          {/* {data?.contact_no && (
            <DetailRow
              icon={Images.call}
              text={`Call Us ${data?.contact_no}`}
            />
          )} */}
          <DetailRow
            icon={Images.date}
            text={`Posted ${timeAgo(data?.created_at)}`}
          />
        </View>
        {data?.category_name && (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: '#d0d0d0',
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
              paddingTop: 4,
              paddingBottom: 6,
            }}>
            <DetailRow icon={Images.category} text={data?.category_name} />
          </View>
        )}
      </View>

       <Auth
          isUser={true}
          isVisible={isSignIN}
          onCancel={() => {
            setIsSignIN(false);
          }}
        />
      
    </TouchableOpacity>
  );
};

export default Catalogues;

const styles = StyleSheet.create({
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
  },
  popularListingImage: {
    height: 220,
    width: '100%',
  },
  popularListingContainer: {
    backgroundColor: color.light_gray,
    marginBottom: 40,
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
  popularListingDetails: {
    marginBottom: 8,
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
  categoryName: {
    borderRadius: 8,
    color: color.lightRuby,
    paddingHorizontal: 10,
  },
});
