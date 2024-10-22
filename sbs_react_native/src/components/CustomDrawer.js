import React, {useEffect, useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {tabs} from '../utils/mockData';
import {commonStyle} from '../constants/commonStyle';
import Auth from './Auth';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../redux/user/userSlice';
import {empty} from '../redux/auth/authSlice';
import {CART_STORAGE_KEY} from '../config/key';
import {API_ENDPOINTS} from '../api/endpoints';
import {getData} from '../utils/function';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused=useIsFocused()
  const userInfo = useSelector(state => state.userInfo.data);
  const token = useSelector(state => state.userInfo.token);

  const [isSignIN, setIsSignIN] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [count, setCount] = useState(0);
   useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (userInfo.id) {
          // const response = await getData(
          //   `${API_ENDPOINTS.CART}/${userInfo?.id}`,
          //   token,
          // );
          //  setCount(response?.Carts?.length);
          // setCartItems(response?.Carts)
          // console.log('response', response?.Carts.length);
        } else {
          const storedCartItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
          setCount(JSON.parse(storedCartItems)?.length || 0);
        }
 
 
       } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };
    fetchCartData();
  }, [props]);
  

  const onPress = val => {
    navigation.navigate(val);
    // switch (val) {
    //   case 'Register':
    //     return navigation.navigate('val');

    //   case 'Register':
    //     return navigation.navigate('Register');
    // }
  };

  const renderTabItem = ({item}) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.tabItem}>
      <Text style={styles.tabText}>
        {item === 'CartScreen' ? 'My Cart' : item}
        {item === 'CartScreen' && (
          <Text style={styles.cartCount}>{` (${count || 0})`}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );

  const logOut = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authentication');
              dispatch(logout());
              dispatch(empty());
              navigation.navigate('Home');
            } catch (error) {
              Alert.alert(
                'Logout Failed',
                'Something went wrong while logging out.',
              );
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={commonStyle.flex}>
          <FlatList
            data={tabs}
            scrollEnabled={false}
            renderItem={renderTabItem}
            keyExtractor={item => item}
          />
          {userInfo.id && (
            <FlatButton
              onPress={logOut}
              containerStyle={styles.button}
              text="Logout"
              // imageSource={Images.cancel}
              // imageStyle={{hight:10,width:10,backgroundColor:'pink'}}
            />
          )}
          {!userInfo.id && (
            <FlatButton
              onPress={() => {
                setIsSignIN(true), setIsUser(false);
              }}
              containerStyle={styles.button}
              text="Free Listing"
            />
          )}
          <Auth
            isUser={isUser}
            isVisible={isSignIN}
            onCancel={() => {
              setIsSignIN(false);
            }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Your App. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.second_black,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.blur,
  },
  headerText: {
    fontSize: 18,
    color: color.white,
  },
  tabItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.blur,
  },
  tabText: {
    color: color.white,
  },
  cartCount: {
    color: color.lightRuby,
  },
  button: {
    backgroundColor: color.lightRuby,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 30,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    alignItems: 'center',
    borderTopColor: color.light_gray,
  },
  footerText: {
    fontSize: 12,
    color: color.gray,
  },
});

export default CustomDrawer;
