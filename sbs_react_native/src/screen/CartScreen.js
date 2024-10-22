// CartScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  catalogDetails,
  catalogDetailsImages,
  catalogDetailsReviews,
  deleteCardItems,
  deleteItems,
  getData,
} from '../utils/function';
import {color} from '../constants/color';
import Header from '../components/Header';
import {API_ENDPOINTS} from '../api/endpoints';
import {scaleSize} from '../utils/dimensions';
import {useIsFocused, useNavigation} from '@react-navigation/native'; // For navigation
import FlatButton from '../components/FlatButton';
import {Images} from '../constants/assets';
import Auth from '../components/Auth';
import {useSelector} from 'react-redux';
import {CART_STORAGE_KEY} from '../config/key';
import LoadingScreen from '../components/Loading';

const CartScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const isFocused = useIsFocused();
  const userInfo = useSelector(state => state.userInfo?.data);
  const token = useSelector(state => state.userInfo.token);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSignIN, setIsSignIN] = useState(false);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const [storedCartItems, storedInquireItems] = await Promise.all([
          AsyncStorage.getItem(CART_STORAGE_KEY),
          AsyncStorage.getItem('@inquire_items'),
        ]);

        const inquireData = storedInquireItems
          ? JSON.parse(storedInquireItems)
          : [];

        if (storedCartItems) {
          const cartData = JSON.parse(storedCartItems);
          const fetchedItems = await Promise.all(
            cartData.map(async (item, index) => {
              const details = await fetchCatalogDetails(item.id);
              return {...item, ...details, ...inquireData[index]}; // Combine data
            }),
          );

          setCartItems(fetchedItems);
        }
      } catch (error) {
        setError('Failed to load cart items.');
        console.error('Failed to load cart items from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.id) {
      getCartList();
    } else {
      loadCartItems();
    }
  }, [isFocused]);

  
  const getCartList = async () => {
    try {
      // const cartData = await getData(
      //   `${API_ENDPOINTS.CART}/${userInfo?.id}`,
      //   token,
      // );
      const formatData = await Promise.all(
        cartData?.Carts?.map(async item => {
          const enquiryResponse = await getData(
            `${API_ENDPOINTS.ENQUIRIES}/${item?.catalog_id}`,
            token,
          );
          return {...enquiryResponse?.enquiry[0], ...item};
        }),
      );

      setCartItems(formatData);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error.message);
      setLoading(false);
    }
  };

  const fetchCatalogDetails = async id => {
    try {
      const [infoResponse, imageResponse, reviewsResponse] = await Promise.all([
        catalogDetails(id, ''),
        catalogDetailsImages(id, ''),
        catalogDetailsReviews(id, ''),
      ]);
      return {
        image: imageResponse?.data?.gallery,
        catalog: infoResponse?.data?.Catalog[0],
        review: reviewsResponse?.data?.Review,
      };
    } catch (error) {
      setError('Failed to fetch catalog details.');
      console.error('Failed to fetch catalog details', error);
      return {}; // Return empty object to avoid breaking the code
    }
  };

  const handleRemoveItem = async id => {
    console.log("id",id);
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      if (userInfo?.id) {
        const response = await deleteItems(
          id,
          API_ENDPOINTS.DELETE_CART,
          token,
        );
        const deleteCart = await deleteItems(
          id,
          API_ENDPOINTS.DELETE_ENQUIRIES,
          token,
        );
        // console.log('catalog_id', response, deleteCart);
      } else {
        await AsyncStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(updatedCartItems),
        );
      }
      setCartItems(updatedCartItems);
    } catch (error) {
      setError('Failed to remove item from cart.');
      console.error('Failed to remove item from cart', error);
    }
  };

  const handleProceedToCheckout = () => {
    if (userInfo.id) {
      if (cartItems.length === 0) {
        Alert.alert(
          'Cart Empty',
          'Your cart is empty. Add items to your cart before proceeding to checkout.',
        );
      } else {
        // navigation.navigate('CheckoutScreen', {data: cartItems}); // Navigate to the checkout screen
      }
    } else {
      setIsSignIN(true);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: `${API_ENDPOINTS.CATALOGUES_PATH_LIST}/${
              item?.catalog?.primary_catalog_image ||
              item?.primary_catalog_image
            }`,
          }}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item?.item_title || 'Item Name'}</Text>

          <Text style={styles.itemPrice}>
            ₹{item.catalog?.sale_price || item?.sale_price || '0.00'}
          </Text>
          <Text style={{color: color.gray, fontSize: 13, marginTop: 6}}>
            Enquire Time: {item?.enquiry_time || 'Item Name'}
          </Text>
          <Text style={{color: color.gray, fontSize: 13}}>
            Enquire Date: {item?.enquiry_date || 'Item Name'}
          </Text>
          <Text style={{color: color.gray, fontSize: 13}}>
            Message: {item?.message || '-'}
          </Text>
        </View>
        <FlatButton
          onPress={() => handleRemoveItem(item.id)}
          imageSource={Images.minus}
          containerStyle={{
            borderColor: color.lightRuby,
            marginRight: 16,
            borderWidth: 1,
            borderRadius: 50,
          }}
          textStyle={{fontSize: 30}}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="My Cart" />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <>
            <Text
              style={{color: color.gray, textAlign: 'center', marginTop: 18}}>
              No data found
            </Text>
            <FlatButton
              textStyle={{
                ...styles.checkoutButtonText,
                color: color.lightRuby,
                marginTop: 24,
              }}
              text={'Keep Shopping'}
              onPress={() => navigation.navigate('PopularCatalogues')}
            />
          </>
        }
      />
      {cartItems.length > 0 && (
        <FlatButton
          containerStyle={styles.checkoutButton}
          textStyle={styles.checkoutButtonText}
          onPress={handleProceedToCheckout}
          text={'Proceed to Checkout'}
        />
      )}

      <Auth
        isUser={true}
        isVisible={isSignIN}
        onCancel={() => {
          setIsSignIN(false);
        }}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: color.primaryText,
  },
  itemContainer: {
    backgroundColor: color.white,
    borderRadius: scaleSize(12),
    margin: scaleSize(16),
    marginVertical: scaleSize(8),
    shadowColor: color.black, // Adds shadow on iOS
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  itemImage: {
    height: 100,
    width: 100,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    paddingVertical: 8,
    // justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    color: color.second_black,
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: color.second_black,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: color.lightRuby,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  removeButtonText: {
    color: color.white,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: color.lightRuby,
    padding: 16,
    margin: 16,
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: color.second_black,
  },
  errorText: {
    fontSize: 18,
    color: color.errorText,
  },
});

export default CartScreen;
