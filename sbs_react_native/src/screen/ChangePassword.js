import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';

import {color} from '../constants/color';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {scaleSize} from '../utils/dimensions';
import InputBox from '../components/InputBox';
import {resetPassword} from '../utils/function';
import FlatButton from '../components/FlatButton';

const ChangePassword = () => {
  const userInfo = useSelector(state => state?.userInfo);

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePasswords = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required');
      return false;
    }
    if (newPassword.length < 6) {
      Alert.alert(
        'Validation Error',
        'New password must be at least 6 characters long',
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Validation Error',
        'New password and confirm password do not match',
      );
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (validatePasswords()) {
      try {
        const obj = {
          old_password: currentPassword,
          newpassword: newPassword,
          confirmpassword: confirmPassword,
        };
        const result = await resetPassword(obj, userInfo?.token);
        if (result.message) {
          Alert.alert('Success', 'Password updated successfully');
        } else {
          const errorMessage =
            result.error?.messages?.error || 'An unknown error occurred';
          Alert.alert('Error', errorMessage);
        }
      } catch (error) {
        console.error('Error in handleUpdate:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } else {
      Alert.alert('Validation Error', 'Please check the provided passwords.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Change Password'} />
      <View style={styles.contentContainer}>
        <InputBox
          placeholder={'Current Password'}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={false}
        />
        <InputBox
          placeholder={'New Password'}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <InputBox
          placeholder={'Confirm Password'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <FlatButton
          text="Update"
          containerStyle={styles.updateButtonContainer}
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  contentContainer: {
    marginTop: 30,
    marginHorizontal: 12,
  },
  updateButtonContainer: {
    marginTop: scaleSize(24),
    borderRadius: scaleSize(12),
    paddingVertical: scaleSize(16),
    backgroundColor: color.lightRuby,
  },
});

export default ChangePassword;
