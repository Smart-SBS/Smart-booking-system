import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text, ScrollView, Alert} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import DatePicker from './DatePicker';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import ImageUploader from './ImageUploader';
import {scaleSize} from '../utils/dimensions';
import InputBox from '../components/InputBox';
import DropdownComponent from './DropdownComponent';
import {
  activeAreas,
  activeCity,
  activeStates,
  addNewShops,
  businessList,
  editShops,
  vendorDetailsShops,
} from '../utils/function';
import {Images} from '../constants/assets';

const AddShopModal = ({isModalVisible, onClose, shopCallBack, isEditId}) => {
  const userToken = useSelector(state => state.userInfo?.token);

  const [formData, setFormData] = useState({
    shopName: '',
    contactPerson: '',
    contactPersonEmail: '',
    contactPhone: '',
    shopOverview: '',
    onboardingDate: new Date(),
    imageUri: '',
    selectedState: '',
    selectedCity: '',
    selectArea: '',
    selectedBusinessList: '',
    focusKeyphrase: '',
    seoTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    seoSchema: '',
    socialTitle: '',
    socialDescription: '',
  });

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [businessListData, setBusinessListData] = useState([]);

  useEffect(() => {
    if (userToken) {
      // if (isEditId) {
      fetchShopInfo();
      // }
      fetchStates();
      fetchBusinessList();
    }
  }, [userToken, isEditId]);

  useEffect(() => {
    if (formData.selectedState?.id) {
      fetchCities();
    }
  }, [formData.selectedState]);

  useEffect(() => {
    if (formData.selectedCity?.id) {
      fetchAreas();
    }
  }, [formData.selectedCity]);

  const fetchShopInfo = async () => {
    try {
      const {data} = await vendorDetailsShops(isEditId, userToken);
      console.log('data', data?.created_at);
      setFormData(prevData => ({
        ...prevData,
        shopName: data?.shop_name,
        contactPerson: data?.shop_contact_person,
        contactPersonEmail: data?.shop_email,
        contactPhone: data?.shop_contact,
        shopOverview: data?.shop_overview,
        onboardingDate: new Date(data?.created_at || new Date()),
        imageUri: '',
        selectedState: {id: data?.state_id, value: data?.states_name},
        selectedCity: {id: data?.city_id, value: data?.city_name},
        selectArea: {id: data?.area_id, value: data?.area_name},
        selectedBusinessList: {
          id: data?.business_id,
          value: data?.business_name,
        },
        focusKeyphrase: data?.focus_keyphrase,
        seoTitle: data?.seo_title,
        metaDescription: data?.meta_description,
        canonicalUrl: data?.canonical_url,
        seoSchema: data?.seo_schema,
        socialTitle: data?.social_title,
        socialDescription: data?.social_description,
      }));
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchStates = async () => {
    try {
      const state = await activeStates(userToken);
      const formattedStates = formatData(state.data);
      setStateData(formattedStates);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const city = await activeCity(userToken, formData.selectedState?.id);
      const formattedCities = formatData(city.data);
      setCityData(formattedCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchAreas = async () => {
    try {
      const areas = await activeAreas(userToken, formData.selectedCity?.id);
      const formattedAreas = formatData(areas.data);
      setAreaData(formattedAreas);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  const fetchBusinessList = async () => {
    try {
      const business = await businessList(userToken);
      const formattedBusinesses = formatData(business.data);
      setBusinessListData(formattedBusinesses);
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  };

  const formatData = data =>
    data.map(item => ({
      ...item,
      value:
        item.name ||
        item.business_name ||
        item.states_name ||
        item.city_name ||
        item.area_name,
      label:
        item.name ||
        item.business_name ||
        item.states_name ||
        item.city_name ||
        item.area_name,
    }));

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setFormData(prevData => ({
          ...prevData,
          imageUri: response.assets[0],
        }));
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorCode);
      }
    });
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const addShops = async () => {

    const {
      shopName,
      contactPerson,
      contactPhone,
      contactPersonEmail,
      onboardingDate,
      shopOverview,
      selectArea,
      selectedBusinessList,
      focusKeyphrase,
      seoTitle,
      metaDescription,
      canonicalUrl,
      seoSchema,
      socialTitle,
      socialDescription,
      imageUri,
    } = formData;
    if (
      shopName &&
      contactPerson &&
      contactPhone &&
      contactPersonEmail &&
      onboardingDate &&
      selectArea?.id &&
      selectedBusinessList?.id
    ) {
      const shopData = {
        shop_name: shopName || '',
        shop_contact_person: contactPerson || '',
        shop_contact: contactPhone || '',
        shop_email: contactPersonEmail || '',
        shop_onboarding_date: moment(onboardingDate).format('YYYY-MM-DD'),
        shop_overview: shopOverview || '',
        area_id: selectArea?.id || '',
        business_id: selectedBusinessList?.id || '',
        focus_keyphrase: focusKeyphrase || '',
        seo_title: seoTitle || '',
        meta_description: metaDescription || '',
        canonical_url: canonicalUrl || '' || '',
        seo_schema: seoSchema || '',
        social_title: socialTitle || '',
        social_description: socialDescription || '',
        social_image: imageUri,
      };

      try {
        const response = isEditId
          ? await editShops(isEditId, shopData, userToken)
          : await addNewShops(shopData, userToken);
        console.log('response.message', response.message);
        Alert.alert(response.message);
        onClose();
        shopCallBack();
      } catch (error) {
        console.error('Error adding shop:', error);
      }
    } else {
      Alert.alert('Selected A required fields');
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <FlatButton
            imageStyle={styles.closeButtonImage}
            onPress={onClose}
            imageSource={Images.cancel}
            tintColor={color.white}
            containerStyle={styles.closeButton}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Shop</Text>

            <InputBox
              placeholder="Enter Shop Name"
              value={formData.shopName}
              onChangeText={text => handleInputChange('shopName', text)}
            />
            <InputBox
              placeholder="Enter Contact Person"
              value={formData.contactPerson}
              onChangeText={text => handleInputChange('contactPerson', text)}
            />
            <InputBox
              placeholder="Enter Contact Person Email"
              value={formData.contactPersonEmail}
              onChangeText={text =>
                handleInputChange('contactPersonEmail', text)
              }
              keyboardType="email-address"
            />
            <InputBox
              placeholder="Enter Contact Phone"
              value={formData.contactPhone}
              onChangeText={text => handleInputChange('contactPhone', text)}
              keyboardType="phone-pad"
            />

            <DatePicker
              selectedDate={formData.onboardingDate}
              onDateChange={date => handleInputChange('onboardingDate', date)}
            />
            <InputBox
              placeholder="Enter Shop Overview"
              multiline
              inputStyle={styles.textArea}
              value={formData.shopOverview}
              onChangeText={text => handleInputChange('shopOverview', text)}
            />
            <DropdownComponent
              data={stateData}
              setValue={val => handleInputChange('selectedState', val)}
              value={formData.selectedState?.value || ''}
              placeholder="Select State"
            />
            <DropdownComponent
              data={cityData}
              setValue={val => handleInputChange('selectedCity', val)}
              value={formData.selectedCity?.value || ''}
              placeholder="Select City"
            />
            <DropdownComponent
              data={areaData}
              setValue={val => handleInputChange('selectArea', val)}
              value={formData.selectArea?.value || ''}
              placeholder="Select Area"
            />
            <DropdownComponent
              data={businessListData}
              setValue={val => handleInputChange('selectedBusinessList', val)}
              value={formData.selectedBusinessList?.value || ''}
              placeholder="Select Business"
            />
            <Text style={styles.seoTitle}>SEO Fields (Optional)</Text>
            <InputBox
              placeholder="Enter Focus Keyphrase"
              multiline
              value={formData.focusKeyphrase}
              onChangeText={text => handleInputChange('focusKeyphrase', text)}
            />
            <InputBox
              placeholder="Enter SEO Title"
              multiline
              value={formData.seoTitle}
              onChangeText={text => handleInputChange('seoTitle', text)}
            />
            <InputBox
              placeholder="Enter Meta Description"
              multiline
              value={formData.metaDescription}
              onChangeText={text => handleInputChange('metaDescription', text)}
            />
            <InputBox
              placeholder="Enter Canonical URL"
              multiline
              value={formData.canonicalUrl}
              onChangeText={text => handleInputChange('canonicalUrl', text)}
            />
            <InputBox
              placeholder="Enter SEO Schema"
              multiline
              value={formData.seoSchema}
              onChangeText={text => handleInputChange('seoSchema', text)}
            />
            <InputBox
              placeholder="Enter Social Title"
              multiline
              value={formData.socialTitle}
              onChangeText={text => handleInputChange('socialTitle', text)}
            />
            <InputBox
              placeholder="Enter Social Description"
              multiline
              value={formData.socialDescription}
              onChangeText={text =>
                handleInputChange('socialDescription', text)
              }
            />
            <ImageUploader
              imageUri={formData.imageUri?.uri}
              onPress={openGallery}
            />
            <FlatButton
              onPress={addShops}
              text="Add"
              containerStyle={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

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
  closeButton: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingBottom: 8,
  },
  closeButtonImage: {
    height: 20,
    width: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  seoTitle: {
    color: color.black,
    fontSize: 18,
    fontWeight: '600',
    marginTop: scaleSize(8),
  },
  saveButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(8),
    marginTop: scaleSize(12),
  },
});

export default AddShopModal;
