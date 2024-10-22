import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import {color} from '../constants/color';
import dimensions from '../utils/dimensions';
import {API_ENDPOINTS} from '../api/endpoints';
import Catalogues from '../components/Catalogues';
import FlatButton from '../components/FlatButton';
import {fetchWishList} from '../redux/wishlist/wishlistapi';
import {fetchAllCataloguesData} from '../redux/catalogues/cataloguesApi';
import {addItemInCatalog, deleteWishListing, timeAgo} from '../utils/function';
import {commonStyle} from '../constants/commonStyle';
import { fetchPopularShop } from '../redux/shop/shopApi';
import { Images } from '../constants/assets';

const PopularShops = () => {
  const {data, token} = useSelector(state => state.userInfo);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {allCataloguesData} = useSelector(state => state.cataloguesData);
  const wishlist = useSelector(state => state?.wishList?.data);
   const shopData = useSelector(state => state?.shop?.data);

 
  useEffect(() => {
    dispatch(fetchAllCataloguesData());
    dispatch(fetchPopularShop())
  }, []);

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

  const onAddWishListing = async (item, isWishList) => {
    try {
      if (!data.id) {
        Alert.alert(
          '',
          'You need to login from your user account to make a wishlist.',
        );
        return;
      }
      const obj = {
        catalog_id: item.id,
        user_id: data?.id,
      };

      if (isWishList) {
        const wishlistItem = wishlist?.find(res => res.catalog_id === item.id);

        if (wishlistItem) {
          await deleteWishListing(wishlistItem.id, token);
         }
      } else {
        const response = await addItemInCatalog(
          API_ENDPOINTS.ADD_WISHLIST,
          obj,
          token,
        );
       }
      const temp = {
        id: data.id,
        token: token,
      };
      dispatch(fetchWishList(temp));
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  return (
    <View style={commonStyle.container}>
      <Header title={'POPULAR SHOPS'} />
      <FlatButton />
      <View style={{alignItems: 'center', marginTop: 8, paddingBottom: 60}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shopData}
          renderItem={({item}) => {
           
            return (
              <TouchableOpacity
              onPress={()=>navigation.navigate("ShopInfo",{data:item})}
              style={styles.popularListingContent}>
              <Image
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
                ]}
              />
              <View style={{marginLeft: 12, marginBottom: 12, paddingTop: 8}}>
                <Text style={styles.popularListingTitle}>
                  {item?.shop_name}
                </Text>
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
              // <Catalogues
              //   data={item}
              //   list={true}
              //   onPress={() =>
              //     navigation.navigate('CataloguesInfo', {data: item})
              //   }
              //   listingContentStyle={{
              //     paddingBottom: 0,
              //     width: dimensions.width - 30,
              //     marginVertical: 8,
              //   }}
              //   onWishlistPress={() => onAddWishListing(item, isWishList)}
              // />
            );
          }}
        />
      </View>
    </View>
  );
};

export default PopularShops;

const styles = StyleSheet.create({
  headingTitle: {
    color: color.black,
    fontWeight: '600',
    fontSize: 18,
    padding: 12,
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
