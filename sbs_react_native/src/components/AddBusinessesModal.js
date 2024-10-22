import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {color} from '../constants/color';
import InputBox from '../components/InputBox';
import DateTimePicker from '@react-native-community/datetimepicker';
import {scaleSize} from '../utils/dimensions';
import FlatButton from './FlatButton';
import {Images} from '../constants/assets';
import {
  activeBusinessesType,
  activeCategoriesType,
  activeSubCategoriesType,
  addBusiness,
  editBusiness,
  vendorDetailsBusiness,
} from '../utils/function';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import DropdownComponent from './DropdownComponent';
import moment from 'moment';
import {API_ENDPOINTS} from '../api/endpoints';

const DatePicker = ({selectedDate, onDateChange}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDatePickerVisible(prev => !prev)}>
        <Text style={styles.dropdownText}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            onDateChange(date || selectedDate);
            setIsDatePickerVisible(false); // Hide date picker after selection
          }}
        />
      )}
    </View>
  );
};

export default function AddBusinessesModal({
  isModalVisible,
  handleModalToggle,
  businessCallBack,
  data,
}) {
  const userInfo = useSelector(state => state.userInfo);

  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessContact, setBusinessContact] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [onboardingDate, setOnboardingDate] = useState(new Date());

  const [dataBusinessType, setDataBusinessType] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [businessOverView, setBusinessOverView] = useState('');
  const [selectSubCategories, setSelectSubCategories] = useState('');

  const [imageUri, setImageUri] = useState('');
  const [selectedImages, setSelectedImages] = useState();
  useEffect(() => {
    getEditBusiness(data?.id);
  }, [data]);

  useEffect(() => {
    // Define an async function inside useEffect and call it
    const fetchData = async () => {
      try {
        const [businessTypeResponse, categoriesResponse] = await Promise.all([
          activeBusinessesType(userInfo?.token),
          activeCategoriesType(userInfo?.token),
        ]);

        // Format data for dropdown
        const formattedBusinessType = businessTypeResponse.data.map(item => ({
          ...item,
          value: item.business_type_name,
          label: item.business_type_name,
        }));
        setDataBusinessType(formattedBusinessType);

        const formattedCategory = categoriesResponse.data.map(item => ({
          ...item,
          value: item.category_name,
          label: item.category_name,
        }));
        setCategory(formattedCategory);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [userInfo?.token]); // Ensure this only runs when userInfo.token changes

  useEffect(() => {
    const fetchSubCategoriesTypeData = async () => {
      try {
        const response = await activeSubCategoriesType(
          userInfo?.token,
          selectedCategory.id,
        );
        const formattedCategory = response.data.map(item => ({
          ...item,
          value: item.subcategory_name,
          label: item.subcategory_name,
        }));
        // Update state with fetched sub-categories
        setSubCategories(formattedCategory); // Assuming response.data contains the sub-categories
      } catch (error) {
        console.log('Error fetching sub-categories:', error);
      }
    };

    if (selectedCategory.id) {
      fetchSubCategoriesTypeData();
    }
  }, [selectedCategory]);

  const getEditBusiness = async id => {
    try {
      const {data} = await vendorDetailsBusiness(id, userInfo?.token);
      const {
        business_contact = '',
        business_email = '',
        business_logo,
        business_name,
        business_overview,
        business_type_name,
        business_type_id,
        category_name,
        category_id,
        subcategory_name,
        subcategory_id,
      } = data || {};

      setBusinessContact(business_contact);
      setBusinessEmail(business_email);
      setImageUri(`${API_ENDPOINTS.VENDOR_BUSINESS_IMAGE}/${business_logo}`);
      setBusinessName(business_name);
      setBusinessOverView(business_overview);

      setBusinessType({value: business_type_name, id: business_type_id});
      setSelectedCategory({value: category_name, id: category_id});
      setSelectSubCategories({value: subcategory_name, id: subcategory_id});
    } catch (error) {
      console.log('Error fetching business details:', error);
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const selectedImage = response.assets[0];

        if (selectedImage.fileSize > 2048 * 1024) {
          // 2MB limit
          Alert.alert('File size exceeds 2MB. Please choose a smaller image.');
          return;
        }

        setSelectedImages({
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
        setImageUri(selectedImage.uri);
      }
    });
  };

  const formatOnboardingDate = date => moment(date).format('YYYY-MM-DD');

  const prepareBusinessObject = ({
    businessName,
    businessEmail,
    businessContact,
    businessTypeId,
    onboardingDate,
    businessOverView,
    businessLogo,
    selectSubCategoriesId,
  }) => ({
    business_name: businessName,
    business_email: businessEmail,
    business_contact: businessContact,
    business_type_id: businessTypeId,
    onboarding_date: formatOnboardingDate(onboardingDate),
    business_overview: businessOverView,
    business_logo: businessLogo,
    subcategory_id: selectSubCategoriesId,
  });

  const handleResponse = response => {
    if (response?.message) {
      Alert.alert(response?.message);
    } else {
      Alert.alert('Something wrong');
    }
    handleModalToggle();
  };

  const onAddBusiness = async () => {
    const obj = prepareBusinessObject({
      businessName,
      businessEmail,
      businessContact,
      businessTypeId: businessType?.id,
      onboardingDate,
      businessOverView,
      businessLogo: selectedImages,
      selectSubCategoriesId: selectSubCategories?.id,
    });
    try {
      const {token} = userInfo || {};
      const response = data?.id
        ? await editBusiness(
            data.id,
            obj,
            token,
            imageUri.split('/').pop() != 'undefined'
              ? imageUri.split('/').pop()
              : '',
          )
        : await addBusiness(obj, token);
      handleResponse(response);
      setSelectedImages('');
      businessCallBack();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent
      onRequestClose={handleModalToggle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <FlatButton
            imageStyle={{height: 20, width: 20}}
            onPress={() => handleModalToggle()}
            imageSource={Images.cancel}
            tintColor={color.white}
            containerStyle={{
              alignSelf: 'flex-end',
              paddingRight: 20,
              paddingBottom: 8,
            }}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{`${data?.id?"Update":"Add New"} Business`}</Text>

            <InputBox
              placeholder="Enter Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />

            <InputBox
              placeholder="Enter Business Email"
              value={businessEmail}
              onChangeText={setBusinessEmail}
              keyboardType="email-address"
            />

            <InputBox
              placeholder="Enter Business Contact Number"
              value={businessContact}
              onChangeText={setBusinessContact}
              keyboardType="phone-pad"
            />
            <DropdownComponent
              label={'Business Type'}
              data={dataBusinessType}
              setValue={val => setBusinessType(val)}
              value={businessType?.value}
              placeholder={'Select Business Type'}
            />

            <DropdownComponent
              label={'Category'}
              data={category}
              setValue={val => setSelectedCategory(val)}
              value={selectedCategory?.value}
              placeholder={'Select Category'}
            />
            <DropdownComponent
              label={'Sub Category'}
              data={subCategories}
              setValue={val => setSelectSubCategories(val)}
              value={selectSubCategories?.value}
              placeholder={'Sub Category'}
            />
            <DatePicker
              selectedDate={onboardingDate}
              onDateChange={setOnboardingDate}
            />

            <InputBox
              placeholder={'Enter Business Overview'}
              multiline={true}
              inputStyle={{height: 100, textAlignVertical: 'top'}}
              value={businessOverView}
              onChangeText={val => setBusinessOverView(val)}
            />

            <TouchableOpacity
              onPress={openGallery}
              style={{
                height: 100,
                width: '100%',
                borderWidth: 1,
                borderStyle: 'dashed',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {imageUri.split('/').pop() != 'undefined' ? (
                <Image
                  style={{height: 95, width: '98%'}}
                  source={{uri: imageUri}}
                />
              ) : (
                <>
                  <Image
                    source={Images.gallery}
                    style={{height: 30, width: 30}}
                  />
                  <View style={{width: '100%', marginHorizontal: 12}}>
                    <Text
                      style={{
                        color: color.black,
                        fontSize: 12,
                        textAlign: 'center',
                        marginVertical: 2,
                      }}>
                      Upload a file{' '}
                      <Text style={{color: color.black, fontSize: 12}}>
                        or drag and drop
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: color.eightEightEight,
                        fontSize: 12,
                        textAlign: 'center',
                        marginVertical: 2,
                      }}>
                      {' '}
                      PNG, JPG, GIF up to 10MB
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
            <View>
              <FlatButton
                onPress={onAddBusiness}
                text={data?.id?"Update":'Add'}
                containerStyle={styles.registerButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.blur_black,
    alignItems: 'center',
    paddingVertical: 24,
  },
  modalContent: {
    backgroundColor: color.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: color.black,
    textAlign: 'center',
  },

  datePickerContainer: {
    marginVertical: scaleSize(10),
  },
  registerButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(8),
    marginTop: scaleSize(12),
  },
  pickerContainer: {
    marginVertical: 10,
    position: 'relative', // Ensure dropdown list positions relative to this container
  },
  dropdownButton: {
    padding: 10,
    borderColor: color.ddd,
    backgroundColor: color.white,
    borderWidth: 1,
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    height: scaleSize(50),
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: color.black,
  },
  dropdownListContainer: {
    position: 'absolute',
    top: scaleSize(85),
    left: 0,
    width: '100%',
    backgroundColor: color.white,
    borderColor: color.ddd,
    borderWidth: 1,
    borderRadius: scaleSize(8),
    zIndex: 1,
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.ddd,
  },
  pickerText: {
    fontSize: 16,
    color: color.black,
  },
});
