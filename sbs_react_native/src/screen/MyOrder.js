import {ScrollView, StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import {color} from '../constants/color';
import {getData, updateStatus} from '../utils/function';
import {API_ENDPOINTS} from '../api/endpoints';
import {commonStyle} from '../constants/commonStyle';
import FlatButton from '../components/FlatButton';

const MyOrder = () => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.userInfo.data);
  const token = useSelector(state => state.userInfo.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await getData(
        `${API_ENDPOINTS.ORDER}/${userInfo?.id}`,
        token,
      );
      setOrders(response?.Orders || []); // Ensure it defaults to an empty array
    } catch (error) {
      console.log('error', error);
    }
  };

  const onStatusChange = async item => {
    try {
      console.log('item', item, token);
      const value = item?.payment_status == 'Paid' ? 'Unpaid' : 'Paid';
      // Are you sure you want to update the payment status of the order Facial?
      Alert.alert(
        ``,
        `Are you sure you want to update the payment status of the order ${item?.item_title}?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              await updateStatus(
                `${API_ENDPOINTS.UPDATE_PAYMENT_STATUS}/${item.payment_id}`,
                token,
              );
              getOrderData();
            },
          },
        ],
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={commonStyle.container}>
      <Header
        onLeftPress={() => navigation.navigate('Profile')}
        title={'My Order'}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.length === 0 ? (
          <Text style={styles.emptyMessage}>No orders found.</Text>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                }}>
                <Image
                  source={{
                    uri: `${API_ENDPOINTS.CATALOGUES_PATH_LIST}/${order.primary_catalog_image}`,
                  }}
                  style={styles.orderImage}
                  resizeMode="contain"
                />
                <View style={styles.orderDetails}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{...styles.itemTitle, flex: 1}}>
                      {order.item_title}
                    </Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{order.final_price}</Text>
                  <Text style={styles.itemUser}>
                    {order.firstname} {order.lastname}
                  </Text>
                  <Text style={styles.itemUser}>
                    {order?.visit_date} at {order?.visit_time}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <FlatButton
                  onPress={() => onStatusChange(order)}
                  tintColor={color.white}
                  text={order?.payment_status}
                  containerStyle={{
                    backgroundColor:
                      order?.payment_status == 'Paid'
                        ? color.lightGreen
                        : color.lightRuby,
                    alignSelf: 'flex-start',
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: 4,
                  }}
                  textStyle={{color: color.white}}
                />
                <Text
                  style={{
                    color: color.black,
                    fontSize: 12,
                    fontWeight: '800',
                  }}>
                  {order?.order_number}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2eafc',
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
    padding: 14,
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCard: {
    width: '100%',
    backgroundColor: color.white,
    borderRadius: 10,
    // padding: 16,
    marginBottom: 16,
    shadowColor: color?.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  orderImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: color.black,
    marginVertical: 4,
    fontWeight: '500',
  },
  itemUser: {
    fontSize: 14,
    color: '#555',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
