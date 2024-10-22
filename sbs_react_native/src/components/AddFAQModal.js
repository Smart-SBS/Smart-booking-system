import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView, Alert} from 'react-native';
import {useSelector} from 'react-redux';

import InputBox from '../components/InputBox';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {scaleSize} from '../utils/dimensions';
import {Images} from '../constants/assets';
import {addFAQReviews, editFAQReviews} from '../utils/function';

 
const AddFAQModal = ({isModalVisible, onClose, isEditId, catalog_id}) => {
  const userToken = useSelector(state => state.userInfo?.token);
   const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (isEditId) {
      fetchOfferDetails();
    }
  }, [isEditId]);

  const fetchOfferDetails = async () => {
    try {
      setFormData({
        question: isEditId.question,
        answer: isEditId.answer,
      });
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSubmit = async () => {
    const {question, answer} = formData;
    if (question && answer) {
      const offerData = {
        question,
        answer,
        catalog_id: catalog_id,
      };
      try {
         const response = isEditId
          ? await editFAQReviews(isEditId, offerData, userToken)
          : await addFAQReviews(offerData, userToken);
        if (response?.message) {
          Alert.alert('', response?.message);
        } else {
          Alert.alert('', 'Somethings went wrong');
        }
        onClose(); // Close the modal and reset form data
      } catch (error) {
        console.error('Error saving offer:', error);
      }
    } else {
      Alert.alert('Please fill all required fields');
    }
  };

  const handleClose = () => {
     setFormData({
      offer_title: '',
      offer_description: '',
      offer_amount: '',
      offer_type: '',
      offer_validity_start_date: new Date(),
      offer_validity_end_date: new Date(),
    });
    onClose();  
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
              {isEditId ? 'Edit a FAQ' : 'Add a FAQ'}
            </Text>
            <InputBox
              placeholder="Enter question"
              value={formData.question}
              onChangeText={text => handleInputChange('question', text)}
            />
            <InputBox
              placeholder="Enter answer"
              multiline
              inputStyle={styles.textArea}
              value={formData.answer}
              onChangeText={text => handleInputChange('answer', text)}
            />

            <FlatButton
              onPress={handleSubmit}
              text={isEditId ? 'Updated' : 'Add'}
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

export default AddFAQModal;
