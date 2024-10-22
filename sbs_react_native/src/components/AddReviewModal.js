import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView, Alert} from 'react-native';
import {useSelector} from 'react-redux';

import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import InputBox from '../components/InputBox';
import DropdownComponent from './DropdownComponent';
import {
  addCatalogReviews,
  detailCatalogReviews,
  editCataloguesReviews,
} from '../utils/function';

const RATING = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
];

const AddReviewModal = ({isModalVisible, onClose, isEditId, id}) => {
   const userToken = useSelector(state => state.userInfo?.token);
  const [formData, setFormData] = useState({
    rating: '',
    review_text: '',
  });
  useEffect(() => {
    if (isEditId) {
      fetchOfferDetails();
    }
  }, [isEditId]);

   const fetchOfferDetails = async () => {
    try {
      const response = await detailCatalogReviews(isEditId, userToken);
       if (response.success) {
        const offer = response.data;
        setFormData({
          rating: offer.rating,
          review_text: offer.review_text,
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
    try {
      const obj = {
        review_text: formData?.review_text,
        rating: formData?.rating?.value||formData?.rating,
        catalog_id: id,
      };
       const response = isEditId
        ? await editCataloguesReviews(isEditId, obj, userToken)
        : await addCatalogReviews(obj, userToken);
      if (response?.message) {
        Alert.alert('', response?.message);
        handleClose();
      }
    } catch (err) {
      console.log('err', err);
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
              {isEditId ? 'Edit Review' : 'Add Review'}
            </Text>
            <DropdownComponent
              data={RATING}
              setValue={value => handleInputChange('rating', value)}
              value={formData.rating}
              placeholder="Select Rating"
              search={true}
            />
            <InputBox
              placeholder="Enter Review Description"
              multiline
              inputStyle={styles.textArea}
              value={formData.review_text}
              onChangeText={text => handleInputChange('review_text', text)}
            />
             
            <FlatButton
              onPress={handleSubmit}
              text="Save"
              containerStyle={styles.saveButton}
            />
          </View>
        </View>
       </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
 
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

export default AddReviewModal;
