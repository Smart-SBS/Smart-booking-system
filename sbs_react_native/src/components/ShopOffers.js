import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Header from './Header';
import FlatButton from './FlatButton';
import LoadingScreen from './Loading';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import AddOffersModal from './AddOffersModal';
import {API_ENDPOINTS} from '../api/endpoints';
import {deleteOffers, getSpecialOffers, updateStatus} from '../utils/function';

// OfferCard Component
const OfferCard = ({item, onEdit, onDelete, onStatusChange}) => (
  <View style={styles.offerCard}>
    <View style={styles.offerContent}>
      <Text style={styles.offerTitle}>{item.offer_title}</Text>
      <Text style={styles.offerDescription}>{item.offer_description}</Text>
      <View style={styles.offerDetails}>
        <Text style={styles.offerAmount}>
          {item.offer_amount} {item.offer_type}
        </Text>
        <Text style={styles.offerValidity}>
          Valid from {item.offer_validity_start_date} to{' '}
          {item.offer_validity_end_date}
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
        imageSource={Images.edit}
        onPress={() => onEdit(item)}
      />
      <FlatButton
        tintColor={color.lightRuby}
        containerStyle={styles.buttonStyle}
        imageStyle={styles.buttonImage}
        imageSource={Images.delete}
        onPress={() => onDelete(item)}
      />
    </View>
  </View>
);

const ShopOffers = ({route, navigation}) => {
  const token = useSelector(state => state.userInfo?.token);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (route?.params?.id) {
      fetchOffers();
    }
  }, [route?.params?.id]);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const response = await getSpecialOffers(route?.params?.id, token);
      if (response?.data) {
        setOffers(response.data);
      } else {
        console.error('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
    setIsLoading(false);
  };

  const handleAddOffer = () => {
    setSelectedOffer(null);
    setIsModalVisible(true);
  };

  const handleEditOffer = offer => {
    setSelectedOffer(offer);
    setIsModalVisible(true);
  };

  const handleDelete = item => {
    Alert.alert(
      'Delete Offer',
      'Are you sure you want to delete this offers?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            onDeleteImage(item?.id);
            console.log(`Delete image with item: ${item}`);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onDeleteImage = async id => {
    try {
      const response = await deleteOffers(id, token);
      if (response?.message) {
        Alert.alert('', response?.message);
        fetchOffers();
        console.log('deleteOffers', response);
      } else {
        console.error('Failed to delete offers');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const onStatusChange = async item => {
    try {
      const value = item?.status == 0 ? 'Active' : 'Deactivate';
      Alert.alert(
        `${value} Offers`,
        `Are you sure you want to ${value} this Offers?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              await updateStatus(
                `${API_ENDPOINTS.UPDATE_SPECIAL_OFFERS_STATUS}/${item.id}`,
                token,
              );
              fetchOffers();
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
        title="Shop Offers"
        subTitle={'Add'}
        onRightPress={() => handleAddOffer()}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={offers}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.noOffers}>No offers available.</Text>
          }
          renderItem={({item}) => (
            <OfferCard
              item={item}
              onEdit={handleEditOffer}
              onDelete={handleDelete}
              onStatusChange={onStatusChange}
            />
          )}
          contentContainerStyle={styles.offerList}
        />
      )}
      <AddOffersModal
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          fetchOffers();
          setSelectedOffer('');
        }}
        isEditId={selectedOffer?.id}
        catalogId={route?.params?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_gray,
  },
  offerList: {
    padding: scaleSize(16),
  },
  offerCard: {
    backgroundColor: color.white,
    borderRadius: scaleSize(12),
    // padding: scaleSize(16),
    marginVertical: scaleSize(8),
    shadowColor: color.black, // Adds shadow on iOS

    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  offerContent: {
    marginBottom: scaleSize(8),
    paddingHorizontal: scaleSize(15),
    paddingTop: 8,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: color.black,
    marginBottom: scaleSize(4),
  },
  offerDescription: {
    fontSize: 16,
    color: color.sixSixSix,
    marginBottom: scaleSize(8),
  },
  offerDetails: {
    borderTopWidth: 1,
    borderTopColor: color?.e0e0e0,
    paddingTop: scaleSize(8),
  },
  offerAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: color.redDark,
    marginBottom: scaleSize(4),
  },
  offerValidity: {
    fontSize: 14,
    color: '#999',
  },
  noOffers: {
    fontSize: 18,
    color: color.sixSixSix,
    textAlign: 'center',
    marginTop: scaleSize(20),
  },
  addButton: {
    position: 'absolute',
    bottom: scaleSize(20),
    right: scaleSize(20),
    backgroundColor: color.lightRuby,
    borderRadius: scaleSize(30),
    elevation: 10,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: scaleSize(15),
    transform: [{rotate: '45deg'}],
  },
  buttonContainer: {
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
    padding: scaleSize(6),
    borderRadius: 50,
    height: scaleSize(30),
    width: scaleSize(30),
    marginHorizontal: scaleSize(4),
  },
  buttonImage: {
    height: scaleSize(20),
    width: scaleSize(20),
  },
});

export default ShopOffers;
