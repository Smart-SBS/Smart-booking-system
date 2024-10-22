// src/components/FlatButton.js
import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {scaleSize} from '../utils/dimensions';
import {color} from '../constants/color';

const FlatButton = ({
  onPress,
  text,
  imageSource,
  containerStyle,
  textStyle,
  imageStyle,
  tintColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, containerStyle]}>
      {imageSource && (
        <Image
          resizeMode="contain"
          tintColor={tintColor}
          source={imageSource}
          style={[styles.image, imageStyle]}
        />
      )}
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: color.white,
    fontSize: scaleSize(16),
    fontWeight: 'bold',
  },
  image: {
    width: scaleSize(24),
    height: scaleSize(24),
  },
});

export default FlatButton;
