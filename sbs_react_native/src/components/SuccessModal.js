import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../constants/color';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Order Placed Successfully!</Text>
          <Text style={styles.modalMessage}>
            Thank you for your order. You will receive a confirmation email shortly.
          </Text>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff', // White background for modal
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.lightRuby, // Title color
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333', // Message text color
  },
  closeButton: {
    padding: 10,
    backgroundColor: color.lightRuby, // Button background color
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#ffffff', // Button text color
    fontWeight: 'bold',
  },
});

export default SuccessModal;
