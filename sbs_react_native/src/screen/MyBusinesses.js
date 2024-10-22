import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Alert} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {color} from '../constants/color';
import {scaleSize} from '../utils/dimensions';
import AddBusinessesModal from '../components/AddBusinessesModal';
import {deleteItems, myBusinesses, updateStatus} from '../utils/function';
import {API_ENDPOINTS} from '../api/endpoints';
import {Images} from '../constants/assets';
import FlatButton from '../components/FlatButton';
import {commonStyle} from '../constants/commonStyle';

const MyBusinesses = () => {
  const userInfo = useSelector(state => state.userInfo);

  const [business, setBusiness] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editBusiness, setEditBusiness] = useState('');

  const handleModalToggle = () => {
    setIsModalVisible(prev => !prev);
  };

  useEffect(() => {
    businessesData();
  }, []);

  const businessesData = async () => {
    const data = await myBusinesses(userInfo?.token);
    setEditBusiness('');
    setBusiness(data?.data || []);
    // handleModalToggle()
  };

  const handleEdit = val => {
    setEditBusiness(val);
    handleModalToggle();
    console.log(`Edit business`, val);
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Business',
      'Are you sure you want to delete this business?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => deleteBusiness(id)},
      ],
    );
  };

  const deleteBusiness = async id => {
    try {
      // const response1 = await deleteBusinessItem(id, userInfo?.token);
      const response = await deleteItems(
        id,
        API_ENDPOINTS.DELETE_BUSINESS,
        userInfo?.token,
      );
      console.log('response', response);
      if (response?.message) {
        Alert.alert('', response?.message);
        businessesData();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onStatusChange = async id => {
    try {
      const value = id?.status == 0 ? 'Active' : 'Deactivate';
      Alert.alert(
        `${value} Businesses`,
        `Are you sure you want to ${value} this Businesses?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              await updateStatus(
                `${API_ENDPOINTS.UPDATE_BUSINESS_STATUS}/${id.id}`,
                userInfo?.token,
              );
              businessesData();
            },
          },
        ],
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const BusinessCard = ({business, onEdit, onDelete}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={
              business.business_logo
                ? {
                    uri: `${API_ENDPOINTS?.VENDOR_BUSINESS_IMAGE}/${business.business_logo}`,
                  }
                : Images.gallery
            }
            style={styles.logo}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{business.business_name}</Text>
            <Text style={styles.email}>{business.business_email}</Text>
            <Text style={styles.email}>{business.business_contact}</Text>
            <Text style={styles.email}>
              {moment(business.created_at).format('YYYY-MM-DD')}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={{flex: 1}}>
            <FlatButton
              onPress={() => onStatusChange(business)}
              tintColor={color.white}
              text={business?.status == 1 ? 'Active' : 'Inactive'}
              containerStyle={{
                backgroundColor:
                  business?.status == 1 ? color.lightGreen : color.lightRuby,
                alignSelf: 'flex-start',
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 4,
              }}
              textStyle={{color: color.white}}
            />
          </View>
          <FlatButton
            onPress={() => onEdit(business)}
            tintColor={color.lightRuby}
            containerStyle={styles.buttonStyle}
            imageStyle={styles.buttonImage}
            imageSource={Images.edit}
          />
          <FlatButton
            onPress={() => onDelete(business.id)}
            tintColor={color.lightRuby}
            containerStyle={styles.buttonStyle}
            imageStyle={styles.buttonImage}
            imageSource={Images.delete}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="My Businesses"
        subTitle="Add"
        onRightPress={handleModalToggle}
      />
      <FlatList
        data={business}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={commonStyle.noRecordFound}>No record found</Text>
        }
        renderItem={({item}) => (
          <BusinessCard
            business={item}
            onEdit={val => handleEdit(val)}
            onDelete={handleDelete}
            onStatusChange={onStatusChange}
          />
        )}
      />
      <AddBusinessesModal
        handleModalToggle={() => {
          handleModalToggle(), setEditBusiness('');
        }}
        isModalVisible={isModalVisible}
        businessCallBack={businessesData}
        data={editBusiness}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa, // Light Gray Background
  },
  card: {
    backgroundColor: color.white,
    borderRadius: scaleSize(8),
    marginVertical: scaleSize(10),
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
    color: '#495057', // Slightly darker gray for text
    marginVertical: scaleSize(2),
  },

  button: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    borderRadius: scaleSize(5),
    flex: 1,
    marginHorizontal: scaleSize(4),
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: color.bluePrimary, // Primary Blue
  },
  deleteButton: {
    backgroundColor: color.lightRuby, // Danger Red
  },
  buttonText: {
    color: color.white,
    fontWeight: 'bold',
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

export default MyBusinesses;
