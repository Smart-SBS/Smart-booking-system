import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import FlatButton from './FlatButton';
import DatePicker from './DatePicker';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import InputBox from '../components/InputBox';
import {scaleSize} from '../utils/dimensions';
import DropdownComponent from './DropdownComponent';
import {
  addShopsOffers,
  detailShopsOffers,
  editShopsOffers,
} from '../utils/function';

const OFFER_TYPE_OPTIONS = [
  {value: 'Percent', label: 'Percent'},
  {value: 'Flat', label: 'Flat'},
];

const AddOffersModal = ({isModalVisible, onClose, isEditId, catalogId}) => {
  const userToken = useSelector(state => state.userInfo?.token);
  const [formData, setFormData] = useState({
    offer_title: '',
    offer_description: '',
    offer_amount: '',
    offer_type: '',
    offer_validity_start_date: new Date(),
    offer_validity_end_date: new Date(),
  });
  useEffect(() => {
    if (isEditId) {
       fetchOfferDetails();
    }
  }, [isEditId]);

  const fetchOfferDetails = async () => {
    try {
      const response = await detailShopsOffers(isEditId, userToken);
       if (response.success) {
        const offer = response.data;
        setFormData({
          offer_title: offer.offer_title,
          offer_description: offer.offer_description,
          offer_amount: offer.offer_amount,
          offer_type: offer.offer_type === '%' ? 'Percent' : 'Flat',
          offer_validity_start_date: new Date(offer.offer_validity_start_date),
          offer_validity_end_date: new Date(offer.offer_validity_end_date),
        });
       } else {
        console.error('Failed to fetch offer details');
      }
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSubmit = async () => {
    const {
      offer_title,
      offer_description,
      offer_amount,
      offer_type,
      offer_validity_start_date,
      offer_validity_end_date,
    } = formData;

    if (
      offer_title &&
      offer_description &&
      offer_amount &&
      offer_type &&
      offer_validity_start_date &&
      offer_validity_end_date
    ) {
      const offerData = {
        offer_title,
        offer_description,
        offer_amount,
        offer_type: offer_type?.label === 'Percent' ? '%' : 'Flat',
        offer_validity_start_date: moment(offer_validity_start_date).format(
          'YYYY-MM-DD',
        ),
        offer_validity_end_date: moment(offer_validity_end_date).format(
          'YYYY-MM-DD',
        ),
        catalog_id: catalogId,
      };

      try {
         const response = isEditId
          ? await editShopsOffers(isEditId, offerData, userToken)
          : await addShopsOffers(offerData, userToken);
         if(response?.message){
           Alert.alert("",response?.message);
          }else{
            Alert.alert("","Somethings went wrong");
          }
        handleClose(); // Close the modal and reset form data
      } catch (error) {
         console.error('Error saving offer:', error);
      }
    } else {
      Alert.alert('Please fill all required fields');
    }
  };

  const handleClose = () => {
    // Reset form data when modal is closed
    setFormData({
      offer_title: '',
      offer_description: '',
      offer_amount: '',
      offer_type: '',
      offer_validity_start_date: new Date(),
      offer_validity_end_date: new Date(),
    });
    onClose(); // Close the modal
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}>
      <View style={{flex: 1, backgroundColor: color.blur_black}}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.modalContainer}>
            <FlatButton
              imageStyle={styles.closeButtonImage}
              onPress={handleClose}
              imageSource={Images.cancel}
              tintColor={color.white}
              containerStyle={styles.closeButton}
            />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isEditId ? 'Edit Special Offer' : 'Add Special Offer'}
              </Text>
              <InputBox
                placeholder="Enter Offer Title"
                value={formData.offer_title}
                onChangeText={text => handleInputChange('offer_title', text)}
              />
              <InputBox
                placeholder="Enter Offer Description"
                multiline
                inputStyle={styles.textArea}
                value={formData.offer_description}
                onChangeText={text =>
                  handleInputChange('offer_description', text)
                }
              />
              <InputBox
                placeholder="Enter Offer Amount"
                value={formData.offer_amount}
                onChangeText={text => handleInputChange('offer_amount', text)}
                keyboardType="numeric"
              />
              <DropdownComponent
                data={OFFER_TYPE_OPTIONS}
                setValue={value => handleInputChange('offer_type', value)}
                value={formData.offer_type}
                placeholder="Select Offer Type"
                search={true}
              />
              <DatePicker
                selectedDate={formData.offer_validity_start_date}
                onDateChange={date =>
                  handleInputChange('offer_validity_start_date', date)
                }
              />
              <DatePicker
                selectedDate={formData.offer_validity_end_date}
                onDateChange={date =>
                  handleInputChange('offer_validity_end_date', date)
                }
              />
              <FlatButton
                onPress={handleSubmit}
                text={isEditId?"Update":"Add"}
                containerStyle={styles.saveButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: color.blur_black,
    // height:'100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
  saveButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(8),
    marginTop: scaleSize(12),
  },
});

export default AddOffersModal;
