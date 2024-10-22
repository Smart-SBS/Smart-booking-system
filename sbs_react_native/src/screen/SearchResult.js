import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {color} from '../constants/color';
import Header from '../components/Header';
import dimensions from '../utils/dimensions';
import Catalogues from '../components/Catalogues';
import LoadingScreen from '../components/Loading';
import {fetchWishList} from '../redux/wishlist/wishlistapi';
import {addItemInCatalog, deleteWishListing} from '../utils/function';
import {fetchNearestSearchData} from '../redux/nearestsearch/nearestSearchApi';

const SearchResult = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const wishlist = useSelector(state => state?.wishList?.data);
  const {data: info, token} = useSelector(state => state.userInfo);
  const {data, loading, error} = useSelector(state => state.nearestSearch);

  const [isLoading, setIsLoading] = useState(true);

  const {selectedLocation, selectedCategory, selectedSearch} =
    route?.params?.val;

  useEffect(() => {
    dispatch(
      fetchNearestSearchData({
        key: selectedSearch || '',
        location: selectedLocation?.area_name || selectedLocation?.value || '',
        category: selectedCategory?.id || '',
      }),
    );
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [dispatch, selectedSearch, selectedLocation, selectedCategory]);

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
        const wishlistItem = wishlist?.find(res => res.catalog_id === item.id);

        if (wishlistItem) {
          await deleteWishListing(wishlistItem.id, token);
        }
      } else {
        await addItemInCatalog(API_ENDPOINTS.ADD_WISHLIST, obj, token);
      }
      const temp = {
        id: info.id,
        token: token,
      };
      dispatch(fetchWishList(temp));
    } catch (error) {
      console.error('Failed to update wishlist:', error.message);
    }
  };

  const renderItem = ({item}) => {
    const isWishList = wishlist?.some(res => res?.catalog_id == item.id);
    return (
      <Catalogues
        data={item}
        list
        onPress={() => navigation.navigate('CataloguesInfo', {data: item})}
        listingContentStyle={styles.catalogueStyle}
        onWishlistPress={() => onAddWishListing(item, isWishList)}
      />
    );
  };

  const keyExtractor = item => item.id.toString();

  if (isLoading) {
    return <LoadingScreen timer={1000} onFinish={() => setIsLoading(false)} />;
  }
  console.log(
    'selectedLocation',
    selectedLocation || selectedCategory || selectedSearch ? 'true' : 'false',
  );
  return (
    <View style={styles.container}>
      <Header title="Search Result" />
      {data?.length > 0 && (
        <Text style={styles.resultsCount}>
          {`${data.length} Search Results ${
            selectedLocation || selectedCategory || selectedSearch ? 'For' : ''
          } ${selectedSearch || ''}${
            selectedCategory?.value
              ? `${selectedSearch ? ' In ' : ''}${selectedCategory.value}`
              : ''
          }${
            selectedLocation?.area_name || selectedLocation?.value
              ? `${selectedCategory?.value || selectedSearch ? ' In ' : ''}${
                  selectedLocation?.area_name || selectedLocation?.value || ''
                }`
              : ''
          }`}
        </Text>
      )}
      <View style={styles.listContainer}>
        {loading === 'loading' ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : loading === 'failed' ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatListContent}
            data={data}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>{`No results found for (${
                  selectedSearch ||
                  selectedLocation?.area_name ||
                  selectedLocation?.value ||
                  selectedCategory?.value
                })`}</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.ececec,
    flex: 1,
  },
  resultsCount: {
    color: color.black,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
    marginVertical: 12,
    marginLeft: 24,
  },
  listContainer: {
    alignItems: 'center',
  },
  catalogueStyle: {
    paddingBottom: 0,
    width: dimensions.width - 30,
    marginVertical: 8,
  },
  flatListContent: {
    paddingBottom: 110,
  },
  loadingText: {
    color: color.black,
  },
  errorText: {
    color: color.red,
  },
  emptyListContainer: {
    marginTop: '30%',
  },
  emptyListText: {
    color: color.blur_black,
  },
});

export default SearchResult;
