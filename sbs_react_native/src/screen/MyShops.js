import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Image, StyleSheet, Text, View, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {color} from '../constants/color';
import Header from '../components/Header';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {API_ENDPOINTS} from '../api/endpoints';
import FlatButton from '../components/FlatButton';
import LoadingScreen from '../components/Loading';
import {commonStyle} from '../constants/commonStyle';
import AddShopModal from '../components/AddShopModal';
import {deleteShops, updateStatus, vendorShops} from '../utils/function';

const ShopCard = ({
  shop,
  onHour,
  onEdit,
  onDelete,
  onCataloguesPress,
  offers,
  gallery,
  onStatusChange,
}) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Image
        source={
          shop.primary_shop_image
            ? {
                uri: `${API_ENDPOINTS.VENDOR_SHOP_IMAGE}/${shop.primary_shop_image}`,
              }
            : Images.gallery
        }
        style={styles.logo}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{shop.shop_name}</Text>
        <Text style={styles.email}>{shop.shop_email}</Text>
        <Text style={styles.email}>{shop.shop_contact}</Text>
        <Text style={styles.email}>
          {moment(shop.created_at).format('YYYY-MM-DD')}
        </Text>
      </View>
    </View>
    <View style={styles.buttonsContainer}>
         <FlatButton
          onPress={onStatusChange}
          tintColor={color.white}
          text={shop?.status == 1 ? 'Active' : 'Inactive'}
          containerStyle={{
            backgroundColor:
              shop?.status == 1 ? color.lightGreen : color.lightRuby,
            alignSelf: 'flex-start',
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 4,
          }}
          textStyle={{color: color.white}}
        />
       <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',justifyContent:"flex-end"}}>
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.time}
          onPress={onHour}
        />
        {/* <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.offers}
          onPress={offers}
        /> */}
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.gallery_s}
          onPress={gallery}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.catalog}
          onPress={onCataloguesPress}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.edit}
          onPress={onEdit}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.delete}
          onPress={onDelete}
        />
        
      </View>
    </View>
  </View>
);

const MyShops = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userInfo = useSelector(state => state.userInfo);
  const [shopsList, setShopsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shopEditId, setShopEditId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchShopList();
  }, [isFocused]);

  const fetchShopList = useCallback(async () => {
    setIsLoading(true);
    if (userInfo?.token) {
      try {
        const response = await vendorShops(userInfo.token);
        setShopsList(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      }
    }
    setIsLoading(false);
  }, [userInfo?.token]);

  const handleEdit = id => {
    setShopEditId(id);
    setIsModalVisible(true);
  };

  const handleDelete = async shopId => {
    Alert.alert(
      'Delete Shop',
      'Are you sure you want to delete this business?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => deleteShop(shopId)},
      ],
    );
  };

  const deleteShop = async id => {
    try {
      const res = await deleteShops(id, userInfo?.token);
      fetchShopList();
      Alert.alert('', res?.message);
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  const handleModalToggle = () => {
    setIsModalVisible(prev => !prev);
    if (!isModalVisible) {
      setShopEditId('');
    }
  };

  const onStatusChange = async id => {
    try {
      let value = id?.status == 0 ? 'Active' : 'Deactivate';
      Alert.alert(
        `${value} Shop`,
        `Are you sure you want to ${value} this Shops?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              await updateStatus(
                `${API_ENDPOINTS.UPDATE_SHOP_STATUS}/${id.shop_id}`,
                userInfo?.token,
              );
              fetchShopList();
            },
          },
        ],
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="My Shops"
        subTitle="Add"
        onRightPress={handleModalToggle}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={shopsList}
          keyExtractor={item => item.shop_id.toString()}
          ListEmptyComponent={
            <Text style={commonStyle.noRecordFound}>No record found</Text>
          }
          renderItem={({item}) => (
            <ShopCard
              shop={item}
              onEdit={() => handleEdit(item.shop_id)}
              onDelete={() => handleDelete(item.shop_id)}
              onCataloguesPress={() =>
                navigation.navigate('ShopCatalogues', {id: item?.shop_id})
              }
              gallery={() =>
                navigation.navigate('AddShopGallery', {id: item?.shop_id})
              }
              offers={() =>
                navigation.navigate('ShopOffers', {id: item?.shop_id})
              }
              onHour={() =>
                navigation.navigate('HourForShop', {id: item?.shop_id})
              }
              onStatusChange={() => onStatusChange(item)}
            />
          )}
        />
      )}
      <AddShopModal
        isModalVisible={isModalVisible}
        onClose={handleModalToggle}
        shopCallBack={fetchShopList}
        isEditId={shopEditId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: scaleSize(8),
    marginVertical: scaleSize(8),
    marginHorizontal: scaleSize(12),
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    paddingHorizontal: scaleSize(15),
    paddingTop: 8,
  },
  logo: {
    width: scaleSize(85),
    height: scaleSize(85),
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(10),
    backgroundColor: color.ddd,
  },
  infoContainer: {
    marginLeft: scaleSize(12),
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.black,
  },
  email: {
    fontSize: 16,
    color: '#495057',
    marginVertical: scaleSize(2),
  },
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2eafc',
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  buttonStyle: {
    borderColor: color.lightRuby,
    borderWidth: 1,
    padding: 4,
    borderRadius: 50,
    height: 30,
    width: 30,
    marginHorizontal: 3,
  },
  buttonImage: {
    height: 20,
    width: 20,
  },
});

export default MyShops;
