import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {scaleSize} from '../utils/dimensions';
import InputBox from '../components/InputBox';
import {API_ENDPOINTS} from '../api/endpoints';
import Header from '../components/Header';
import {color} from '../constants/color';
import moment from 'moment';
import {Images} from '../constants/assets';
import axios from 'axios';
import {API_BASE_URL} from '../config/apiConfig';
import SuccessModal from '../components/SuccessModal';
import RadioButton from '../components/RadioButton';

const CheckoutScreen = ({route}) => {
  const userInfo = useSelector(state => state.userInfo.data);
  const token = useSelector(state => state.userInfo.token);
  const [cartItems, setCartItems] = useState({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Pay On Visit');

  const navigation = useNavigation();
  const price =
    (cartItems.platform_fee_type == '%'
      ? (parseFloat(cartItems?.sale_price) * 1.1).toFixed(2)
      : +cartItems?.sale_price + 10) || '00';

  console.log('---', cartItems);

  useEffect(() => {
    if (route?.params?.catalogDetailsInfo) {
      console.log('route?.params', route?.params?.inQuire);
      setCartItems({
        ...route?.params?.catalogDetailsInfo,
        ...route?.params?.inQuire,
      });
    }
    setLoading(false);
  }, [route?.params?.catalogDetailsInfo]);

  const addOder = async obj => {
    try {
      const formData = new FormData();
      formData.append('catalog_id', cartItems?.catalog_id);
      formData.append('vendor_id', cartItems?.user_id);
      formData.append('visit_date', cartItems?.enquiry_date);
      formData.append('visit_time', cartItems?.enquiry_time);
      formData.append('message', cartItems?.message);
      formData.append('sale_price', cartItems?.sale_price);
      formData.append('final_price', price);
      formData.append('payment_method', 'cod');
      const response = await axios.post(
        `${API_BASE_URL}/ma-place-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      if (response.status === 200) {
        setModalVisible(true);
      } else {
        console.error('Failed to add business:', response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!name || !address) {
      // Alert.alert('Missing Information', 'Please fill in all fields.');
      // return;
    }
    await addOder();

    // const options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.png',
    //   currency: 'INR',
    //   key: 'rzp_test_1234567890abcdefghijklmnopqrstuvwxyz',
    //   amount: '1100000', // Amount in paise (1100000 paise = ₹11000)
    //   name: 'Your App Name',
    //   prefill: {
    //     email: userInfo.email || 'void@razorpay.com',
    //     contact: userInfo.contact_no || '9191919191',
    //     name: name,
    //   },
    //   theme: {color: '#F37254'},
    // };

    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     Alert.alert(`Success: ${data.razorpay_payment_id}`);
    //     navigation.navigate('HomeScreen');
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //     Alert.alert(`Error: ${error.code} | ${error.description}`);
    //   });
  };

  const closeModal = () => {
    navigation.navigate('MyOrder');
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
    <View style={styles.container}>
      <Header title="Checkout" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: color.ddd,
              paddingBottom: 4,
              paddingHorizontal: scaleSize(12),
            }}>
            <Image
              resizeMode="contain"
              style={styles.itemImage}
              source={{
                uri: `${API_ENDPOINTS.CATALOGUES_PATH_LIST}/${cartItems?.primary_catalog_image}`,
              }}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                {cartItems?.item_title || 'Item Name'}
              </Text>
              {/* <Text style={styles.shopName}>
                Shop Name: {cartItems?.shop_name}
              </Text> */}
              <Text style={styles.itemPrice}>₹{price}</Text>
              {/* <Text style={styles.shopName}>
                {cartItems?.area_name}, {cartItems?.city_name},{' '}
                {cartItems?.states_name}
              </Text> */}
            </View>
          </View>
          <View style={{paddingVertical: 12, paddingHorizontal: scaleSize(12)}}>
            <Text style={{...styles.itemName, marginBottom: 8}}>
              Shop Details
            </Text>
            <DetailRow icon={Images.shop} text={cartItems?.shop_name} />
            <DetailRow icon={Images.person} text={`${cartItems?.firstname} ${cartItems?.lastname}`} />

            {/* <DetailRow icon={Images.date} text={`${cartItems?.enquiry_date}`} /> */}
            {/* <DetailRow
              icon={Images.time}
              text={`${moment(cartItems?.enquiry_time, 'HH:mm').format(
                'hh:mm A',
              )}`}
            /> */}
            <DetailRow
              icon={Images.location}
              text={`${cartItems?.area_name}, ${cartItems?.city_name}, ${cartItems?.states_name}`}
            />
          </View>
          <View style={{marginBottom: 8, paddingHorizontal: scaleSize(12),marginTop:4}}>
            <Text style={{...styles.itemName, marginBottom: 8}}>
              Visit Details
            </Text>
            {/* <DetailRow icon={Images.shop} text={cartItems?.shop_name} /> */}
            <DetailRow icon={Images.date} text={`${cartItems?.enquiry_date}`} />
            <DetailRow
              icon={Images.time}
              text={`${moment(cartItems?.enquiry_time, 'HH:mm').format(
                'hh:mm A',
              )}`}
            />
            {/* <DetailRow
              icon={Images.location}
              text={`${cartItems?.area_name}, ${cartItems?.city_name}, ${cartItems?.states_name}`}
            /> */}
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            {['Pay On Visit', 'Online'].map(res => {
              return (
                <RadioButton
                  style={{borderRadius: 50}}
                  selected={res == selectedPayment}
                  onPress={() =>
                    res != selectedPayment ? Alert.alert('Coming Soon') : null
                  }
                  label={res}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal visible={modalVisible} onClose={closeModal} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    flexGrow: 1,
    padding: scaleSize(16),
    justifyContent: 'space-between',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(12),
    marginVertical: scaleSize(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  itemImage: {
    height: 100,
    width: 100,
    marginRight: scaleSize(12),
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderBottomColor: color.lightRuby,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: color.lightRuby,
    marginTop: 4,
  },
  shopName: {
    fontSize: 14,
    color: '#555',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: scaleSize(4),
  },
  formContainer: {
    marginTop: scaleSize(16),
  },
  placeOrderButton: {
    backgroundColor: color.lightRuby,
    padding: scaleSize(16),
    borderRadius: scaleSize(12),
    alignItems: 'center',
    marginTop: scaleSize(16),
  },
  placeOrderButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
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

export default CheckoutScreen;
