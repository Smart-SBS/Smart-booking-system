import {FlatList, StyleSheet, Text, View} from 'react-native';
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
import {addItemInCatalog, deleteWishListing} from '../utils/function';
import {commonStyle} from '../constants/commonStyle';
import { fetchPopularShop } from '../redux/shop/shopApi';

const PopularCatalogues = () => {
  const {data, token} = useSelector(state => state.userInfo);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {allCataloguesData} = useSelector(state => state.cataloguesData);
  const wishlist = useSelector(state => state?.wishList?.data);
  const shopData = useSelector(state => state?.shop);
 
  useEffect(() => {
    dispatch(fetchAllCataloguesData());
    dispatch(fetchPopularShop())
  }, []);

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
      <Header title={'POPULAR CATALOGUES'} />
      {/* <FlatButton /> */}
      <View style={{alignItems: 'center', marginTop: 8, paddingBottom: 60}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allCataloguesData?.Catalog}
          renderItem={({item}) => {
            const isWishList = wishlist?.some(
              res => res?.catalog_id == item.id,
            );
            return (
              <Catalogues
                data={item}
                list={true}
                onPress={() =>
                  navigation.navigate('CataloguesInfo', {data: item})
                }
                listingContentStyle={{
                  paddingBottom: 0,
                  width: dimensions.width - 30,
                  marginVertical: 8,
                }}
                onWishlistPress={() => onAddWishListing(item, isWishList)}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default PopularCatalogues;

const styles = StyleSheet.create({
  headingTitle: {
    color: color.black,
    fontWeight: '600',
    fontSize: 18,
    padding: 12,
  },
});
