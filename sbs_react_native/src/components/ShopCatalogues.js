import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image, Alert} from 'react-native';
import Header from './Header';
import {getCatalog, deleteCatalog, updateStatus} from '../utils/function'; // Assume these functions exist
import {useSelector} from 'react-redux';
import {API_ENDPOINTS} from '../api/endpoints';
import {Images} from '../constants/assets';
import {color} from '../constants/color';
import AddCatalogues from './AddCatalogues';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FlatButton from './FlatButton';
import {scaleSize} from '../utils/dimensions';
import {commonStyle} from '../constants/commonStyle';
import LoadingScreen from './Loading';

const ShopCatalogues = ({route}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.userInfo.token);
  const isFocused = useIsFocused();

  const [catalogData, setCatalogData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditId, setIsEditId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (route?.params?.id || isFocused) {
      fetchCatalogues();
    }
  }, [route?.params?.id, isFocused]);

  const fetchCatalogues = async () => {
    setIsLoading(true);
    try {
      const response = await getCatalog(route?.params?.id, token);
      setCatalogData(response.data);
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
    }
    setIsLoading(false);
  };

  const showAlert = (message, onConfirm) => {
    Alert.alert(
      'Confirm',
      message,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: onConfirm, style: 'destructive'},
      ],
      {cancelable: false},
    );
  };

  const handleDelete = id => {
    showAlert('Are you sure you want to delete this catalogue?', async () => {
      try {
        await deleteCatalog(id, token);
        setCatalogData(prevData => prevData.filter(item => item.id !== id));
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    });
  };

  const handleEdit = item => {
    setIsEditId(item?.id);
    toggleModalVisibility();
  };

  const handleAddImage = item => {
    navigation.navigate('AddCataloguesGallery', {id: item?.id});
  };

  const handleAddReviews = item => {
    navigation.navigate('AddCataloguesReviews', {id: item?.id});
  };

  const handleAddFAQ = item => {
    navigation.navigate('AddCataloguesFaq', {id: item?.id});
  };

  const onStatusChange = async item => {
    try {
      const value = item?.status == 0 ? 'Active' : 'Deactivate';
      Alert.alert(
        `${value} Catalogues`,
        `Are you sure you want to ${value} this Catalogues?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              await updateStatus(
                `${API_ENDPOINTS.UPDATE_CATALOG_STATUS}/${item.id}`,
                token,
              );
              fetchCatalogues();
            },
          },
        ],
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleModalVisibility = () => setIsModalVisible(prev => !prev);

  const renderCatalogItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.cardContent}>
        <Image
          source={
            item.primary_catalog_image
              ? {
                  uri: `${API_ENDPOINTS.CATALOGUES_PATH_THUMB}/${item.primary_catalog_image}`,
                }
              : Images.gallery
          }
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.item_title}</Text>
          <Text style={styles.itemDescription}>
            {item.item_description.length > 100
              ? `${item.item_description.substring(0, 35)}...`
              : item.item_description}
          </Text>
          <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
          <Text style={styles.itemSalePrice}>
            Sale Price: ₹{item.sale_price}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{flex: 1}}>
          <FlatButton
            onPress={() => onStatusChange(item)}
            tintColor={color.white}
            text={item?.status == 1 ? 'Active' : 'Inactive'}
            containerStyle={{
              backgroundColor:
                item?.status == 1 ? color.lightGreen : color.lightRuby,
              alignSelf: 'flex-start',
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 4,
            }}
            textStyle={{color: color.white}}
          />
        </View>
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.gallery_s}
          onPress={() => handleAddImage(item)}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.offers}
          onPress={() => navigation.navigate('ShopOffers', {id: item?.id})}
        />
        <FlatButton
          tintColor={color.lightRuby}
          imageSource={Images.star}
          imageStyle={styles.buttonImage}
          containerStyle={styles.buttonStyle}
          onPress={() => handleAddReviews(item)}
        />

        <FlatButton
          tintColor={color.lightRuby}
          imageSource={Images.faq}
          imageStyle={styles.buttonImage}
          containerStyle={styles.buttonStyle}
          onPress={() => handleAddFAQ(item)}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.edit}
          onPress={() => handleEdit(item)}
        />
        <FlatButton
          tintColor={color.lightRuby}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.delete}
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  const onCloseModal = () => {
    fetchCatalogues();
    toggleModalVisibility();
  };

  return (
    <View style={styles.container}>
      <Header
        title="My Catalogues"
        subTitle="Add"
        onRightPress={toggleModalVisibility}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={catalogData}
          renderItem={renderCatalogItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={commonStyle.noRecordFound}>
              No catalogues available
            </Text>
          }
        />
      )}
      <AddCatalogues
        isModalVisible={isModalVisible}
        shopId={route?.params?.id}
        isEditId={isEditId}
        onClose={onCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa, // Light Gray Background
  },
  itemContainer: {
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
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: color.ddd,
  },
  itemDetails: {
    marginLeft: scaleSize(12),
    justifyContent: 'center',
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color: color.black,
  },
  itemDescription: {
    fontSize: 14,
    color: color.sixSixSix,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: color.black,
    textDecorationLine: 'line-through',
  },
  itemSalePrice: {
    fontSize: 16,
    color: color.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2eafc',
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: color.bluePrimary,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: color.dc3545,
  },
  addImageButton: {
    backgroundColor: color.lightGreen,
  },
  buttonStyle: {
    borderColor: color.lightRuby,
    borderWidth: 1,
    borderRadius: 50,
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
  addButton: {
    position: 'absolute',
    bottom: scaleSize(20),
    right: scaleSize(20),
    padding: scaleSize(15),
    transform: [{rotate: '45deg'}],
    borderRadius: scaleSize(30),
    elevation: 5, // Adds shadow for Android
    shadowColor: color.black, // Adds shadow on iOS
    shadowOffset: {width: 0, height: 5}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    backgroundColor: color.lightRuby,
  },
});

export default ShopCatalogues;
