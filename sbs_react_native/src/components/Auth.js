import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputBox from './InputBox';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {userToken} from '../redux/user/userSlice';
import {fetchUserApiData} from '../redux/user/userApi';
import {loginVendor, registerVendor} from '../redux/auth/authApi';
import {
  addItemInCatalog,
  changePassword,
  sendOTP,
  verifyOTP,
} from '../utils/function';
import {API_ENDPOINTS} from '../api/endpoints';
import {CART_STORAGE_KEY} from '../config/key';

const Auth = ({isVisible, onCancel, isUser, onLogin}) => {
  const dispatch = useDispatch();
  const {registerStatus, status, registerError, token, error} = useSelector(
    state => state.authData,
  );

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: 'himeshr123@gmail.com', //'himeshr123@gmail.com',prakharg123@gmail.com
    password: 'Hello@123', //'Hero@123',
    confirmPassword: '',
    contactNumber: '',
  });
  const [otpText, setOtpText] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isOtp, setIsOtp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordEnter, setIsPasswordEnter] = useState(false);

  useEffect(() => {
    setIsSignUp(!isUser);
  }, [isUser]);

  useEffect(() => {
    if (registerError) {
      console.log('registerError', registerError);
      const errorMsg =
        registerError.message?.contact_no ||
        registerError.message?.email ||
        registerError.message?.firstname ||
        registerError.message?.lastname ||
        registerError.message?.firstname ||
        'An error occurred';
      setErrorMessage(errorMsg);
    } else if (registerStatus === 'succeeded') {
      Alert.alert(
        'Registration Successful',
        'You have been successfully registered. Please log in to continue.',
        [{text: 'OK', onPress: onChangeTab}],
      );
    }
  }, [registerError, registerStatus]);

  useEffect(() => {
    if (status === 'succeeded' && token) {
      const userId = jwtDecode(token)?.data?.user_id;
      const userObj = {
        id: userId,
        token,
        isUser: jwtDecode(token)?.data?.role != 3,
      };
      dispatch(userToken(token));
      dispatch(fetchUserApiData(userObj));
      storeData(userObj);
      onCancel();
    }
  }, [status, token]);

  const handleChange = (name, value) =>
    setForm(prev => ({...prev, [name]: value}));
  const validateForm = () => {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      password,
      confirmPassword,
    } = form;

    const setError = message => {
      setErrorMessage(message);
      return false;
    };

    if (isSignUp) {
      if (!firstName) return setError('First name required');
      if (!lastName) return setError('Last name required');
      if (!contactNumber) return setError('Contact number required');
      if (password !== confirmPassword)
        return setError('Passwords do not match.');
    }

    if (!email || !password) {
      return setError('Email and Password are required.');
    }

    setErrorMessage('');
    return true;
  };

  const handleSignIn = () => {
    try {
      if (validateForm()) {
        setIsLoading(true);
        dispatch(
          loginVendor({identifier: form.email, password: form.password}),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };

  const handleSignUp = () => {
    if (validateForm()) {
      setIsLoading(true);
      dispatch(
        registerVendor({
          isUser: isUser,
          firstname: form.firstName,
          lastname: form.lastName,
          email: form.email,
          password: form.password,
          contact_no: form.contactNumber,
        }),
      );
      setIsLoading(false);
    }
  };

  const onChangeTab = () => {
    setErrorMessage('');
    setIsSignUp(prev => !prev);
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('authentication', jsonValue);
    } catch (e) {
      console.error('Error storing data', e);
    }
  };

  const renderForgotPassword = () => (
    <View>
      {!isPasswordEnter && (
        <Text style={styles.infoText}>
          {isOtp ? 'Enter New Password' : 'Enter your email'}
        </Text>
      )}
      {!isPasswordEnter && (
        <InputBox
          value={isOtp ? otpText : forgotEmail}
          placeholder={isOtp ? 'Enter OTP' : 'Enter your email'}
          onChangeText={val => (isOtp ? setOtpText(val) : setForgotEmail(val))}
        />
      )}
      {isPasswordEnter && (
        <>
          <InputBox
            style={styles.inputBox}
            secureTextEntry
            placeholder="New Password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <InputBox
            style={styles.inputBox}
            secureTextEntry
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={text => setConfirmNewPassword(text)}
          />
        </>
      )}
    </View>
  );

  const onSendOTP = async () => {
    try {
      const response = await sendOTP({email: forgotEmail});
      if (response.error) {
        Alert.alert('', response.error, [{text: 'OK'}]);
      } else {
        Alert.alert('Success', 'OTP has been sent to your email.', [
          {text: 'OK'},
        ]);
        setIsOtp(true);
      }
    } catch (error) {
      console.error('Error sending OTP', error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  };

  const onVerifyOTP = async () => {
    try {
      const response = await verifyOTP(otpText);
      if (response?.error) {
        Alert.alert('', response?.error, [{text: 'OK'}]);
      } else {
        Alert.alert('Success', 'Your OTP Verifying', [{text: 'OK'}]);
        setIsOtp(false);
        setIsPasswordEnter(true);
        setIsOtp(false);
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  };

  const onSubmitOTP = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }
    let obj = {
      ma_reset_otp: otpText,
      newpassword: newPassword,
      confirmpassword: confirmNewPassword,
    };

    try {
      const passwordChange = await changePassword(obj);
      if (passwordChange?.error) {
        Alert.alert('', passwordChange?.error, [{text: 'OK'}]);
      } else {
        Alert.alert('Success', 'Your Password Change', [{text: 'OK'}]);
        setIsForgotPassword(false);
        setIsOtp(false);
        setIsPasswordEnter(false);
        setForgotEmail('');
        setOtpText('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const onPressCancel = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: 'himeshr123@gmail.com',
      password: 'Hello@123',
      confirmPassword: 'Hello@123',
      contactNumber: '',
    });

    setIsForgotPassword(false);
    setIsOtp(false);
    setIsPasswordEnter(false);
    setForgotEmail('');
    setOtpText('');
    setNewPassword('');
    setConfirmNewPassword('');
    onCancel();
  };

  const evaluatePasswordStrength = password => {
    if (!password) {
      return '';
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasNonalphas = /[\W_]/.test(password);
    const length = password.length;

    if (
      length > 7 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasNonalphas
    ) {
      return 'Strong';
    } else if (length > 5 && (hasUpperCase || hasLowerCase) && hasNumbers) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  const passwordColors = strength => {
    const colorMap = {
      Weak: 'red',
      Moderate: '#e19200',
      Strong: 'green',
    };

    return colorMap[strength] || '';
  };

  // const storeCardData = async userId => {
  //   try {
  //     const storedCartItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
  //     const data = JSON.parse(storedCartItems) || []; // Fallback to an empty array

  //     console.log('Stored in API');
  //   } catch (error) {
  //     console.error('Error storing cart data:', error);
  //   }
  // };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onPressCancel}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <FlatButton
            tintColor={color.white}
            imageSource={Images.cancel}
            imageStyle={styles.cancelImage}
            onPress={onPressCancel}
            containerStyle={styles.cancelButton}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              {isSignUp
                ? `Register as a ${isUser ? 'User' : 'Vendor'}`
                : isForgotPassword
                ? 'Forgot Password'
                : 'Log in'}
            </Text>

            {isSignUp && (
              <>
                <InputBox
                  style={styles.inputBox}
                  placeholder="First Name"
                  value={form.firstName}
                  onChangeText={text => handleChange('firstName', text)}
                />
                <InputBox
                  style={styles.inputBox}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChangeText={text => handleChange('lastName', text)}
                />
                <InputBox
                  keyboardType="phone-pad"
                  style={styles.inputBox}
                  placeholder="Contact Number"
                  value={form.contactNumber}
                  onChangeText={text => handleChange('contactNumber', text)}
                />
              </>
            )}
            {isForgotPassword ? (
              renderForgotPassword()
            ) : (
              <>
                <InputBox
                  style={styles.inputBox}
                  placeholder={`Email ${!isSignUp ? '/ Mobile Number' : ''}`}
                  value={form.email}
                  onChangeText={text => handleChange('email', text)}
                />
                <InputBox
                  style={styles.inputBox}
                  secureTextEntry
                  placeholder="Password"
                  value={form.password}
                  onChangeText={text => handleChange('password', text)}
                />
                {form.password && isSignUp && (
                  <Text
                    style={{
                      color: passwordColors(
                        evaluatePasswordStrength(form.password),
                      ),
                    }}>{`Password strength:${evaluatePasswordStrength(
                    form.password,
                  )}`}</Text>
                )}
                {isSignUp && (
                  <InputBox
                    style={styles.inputBox}
                    secureTextEntry
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChangeText={text => handleChange('confirmPassword', text)}
                  />
                )}
                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
              </>
            )}
            <FlatButton
              onPress={
                isSignUp
                  ? handleSignUp
                  : isForgotPassword
                  ? isOtp
                    ? onVerifyOTP
                    : isPasswordEnter
                    ? onSubmitOTP
                    : onSendOTP
                  : handleSignIn
              }
              text={
                isSignUp
                  ? 'Register'
                  : isForgotPassword
                  ? isPasswordEnter
                    ? 'Submit New Password'
                    : isOtp
                    ? 'Verified OTP'
                    : 'Send OTP'
                  : 'Log In'
              }
              containerStyle={styles.registerButton}
            />
            {isLoading && (
              <ActivityIndicator size="small" color={color.lightRuby} />
            )}
            {!isSignUp && !isForgotPassword && (
              <FlatButton
                onPress={() => setIsForgotPassword(prev => !prev)}
                textStyle={styles.forgotPasswordText}
                text="Lost your password?"
              />
            )}
            {!isForgotPassword && isUser && (
              <TouchableOpacity onPress={onChangeTab}>
                <Text style={styles.signInText}>
                  {isSignUp ? 'Already have an account? ' : 'Need an account? '}
                  <Text style={styles.signInLink}>
                    {isSignUp ? 'Sign In' : 'Register'}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.blur_black,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: color.white,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: color.lightRuby,
    fontWeight: '600',
    marginBottom: scaleSize(10),
  },
  inputBox: {
    marginVertical: scaleSize(8),
  },
  registerButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(16),
    borderRadius: scaleSize(12),
    marginTop: scaleSize(24),
    marginBottom: scaleSize(16),
  },
  cancelImage: {
    height: 20,
    width: 20,
  },
  cancelButton: {
    alignSelf: 'flex-end',
    margin: 5,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: color.gray,
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 8,
    color: color.lightRuby,
  },
  signInText: {
    textAlign: 'center',
    color: color.gray,
    fontWeight: '400',
    fontSize: 15,
  },
  signInLink: {
    color: color.lightRuby,
    fontWeight: '600',
    fontSize: scaleSize(16),
  },
  errorText: {
    color: 'red',
    fontSize: scaleSize(14),
    // marginBottom: scaleSize(16),
    // textAlign: 'center',
  },
  infoText: {
    color: color.black,
    fontSize: 16,
  },
});

export default Auth;
