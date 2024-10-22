import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
 import {scaleSize} from '../utils/dimensions'; 
import {Images} from '../constants/assets';
import {color} from '../constants/color';

const InputBox = ({
  placeholder,
  title,
  value,
  onChangeText,
  style,
  secureTextEntry,
  inputStyle,
  multiline,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View
        style={{
          ...styles.inputContainer,
          borderColor: isFocused ? color.lightRuby : color.semi_light_gray,
          borderWidth: 1, 
          borderRadius: scaleSize(8),
          paddingHorizontal: scaleSize(10),

        }}>
        <TextInput
        multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={color.gray}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!showPassword}
          style={[
            styles.input,inputStyle,
            {borderColor: isFocused ? color.lightRuby : '#ccc'},
          ]}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeIconContainer}>
            <Image
              source={showPassword ? Images.open_eye : Images.close_eye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scaleSize(10),
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: scaleSize(50), 
    fontSize: scaleSize(16),
    width: '90%',
    color: color.black,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: scaleSize(10),
    height: '100%',
    justifyContent: 'center',
  },
  eyeIcon: {
    height: scaleSize(24),
    width: scaleSize(24),
  },
});

export default InputBox;
