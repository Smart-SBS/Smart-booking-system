import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Theme from '../theme/Theme';
import InputBox from '../components/InputBox';
import FlatButton from '../components/FlatButton';
import {color} from '../constants/color';
import {scaleSize} from '../utils/dimensions';

const Login = () => {
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <Theme>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Login</Text>
            <InputBox style={styles.inputBox} placeholder={"Email or Contact number"} />
            <InputBox style={styles.inputBox} placeholder={"Password"} />
            <TouchableOpacity style={{alignSelf:'flex-end',marginTop:4}}>
              <Text style={{color: color.gray}}>Forgot Password?</Text>
            </TouchableOpacity>
            <FlatButton text="Login" containerStyle={styles.loginButton} />
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.signUpText}>
                Don't have an account?
                <Text style={styles.signUpLink}> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Theme>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
    backgroundColor: color.blur_black,
  },
  innerContainer: {
    backgroundColor: color.white,
    padding: 24,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: color.black,
    fontWeight: '600',
    marginBottom: scaleSize(12),
  },
  inputBox: {
    marginVertical: scaleSize(8),
  },
  loginButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(16),
    borderRadius: scaleSize(12),
    marginTop: scaleSize(24),
  },
  signUpText: {
    textAlign: 'center',
    marginTop: scaleSize(16),
    color: color.gray,
  },
  signUpLink: {
    color: color.lightRuby,
    fontWeight: '600',
    fontSize: scaleSize(16),
  },
});

export default Login;
