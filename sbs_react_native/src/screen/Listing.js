import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Header from '../components/Header';
import FlatButton from '../components/FlatButton';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {deleteWishListing} from '../utils/function';
import {fetchWishList} from '../redux/wishlist/wishlistapi';

const Listing = () => {
  const dispatch = useDispatch();
  const {data, token} = useSelector(state => state.userInfo);
  const wishlist = useSelector(state => state.wishList.data);

  const handleDelete = async item => {
    try {
      const wishlistItem = wishlist?.find(
        res => res.catalog_id === item.catalog_id,
      );
      if (!wishlistItem) {
        console.log('Item not found in wishlist');
        return;
      }
      await deleteWishListing(wishlistItem.id, token);

      const payload = {
        id: data.id,
        token: token,
      };
      dispatch(fetchWishList(payload));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.item_title}</Text>
        <Text style={styles.date}>
          {moment(item.updated_at).format('MMM D, YYYY')}
        </Text>
        <Text style={styles.price}>
          {item.sale_price ? `₹${item.sale_price}` : 'Price not available'}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}> */}
      <FlatButton
        tintColor={color.white}
        textStyle={styles.buttonText}
        imageSource={Images.delete}
        containerStyle={styles.deleteButton}
        onPress={() => handleDelete(item)}
      />
      {/* </TouchableOpacity> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Listing" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={wishlist}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {/* <LoadingScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: color.black,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    color: color.second_black,
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    color: color.blue,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightRuby,
    borderRadius: 8,
    padding: 8,
  },
  deleteButtonIcon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    color: color.white,
    fontSize: 14,
  },
});

export default Listing;
