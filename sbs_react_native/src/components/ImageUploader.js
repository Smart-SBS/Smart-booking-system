import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Images } from '../constants/assets';
import { color } from '../constants/color';

const ImageUploader = ({ imageUri, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      {imageUri ? (
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
        />
      ) : (
        <View style={styles.placeholder}>
          <Image
            source={Images.gallery}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.uploadText}>
              Upload a file{' '}
              <Text style={styles.orText}>or drag and drop</Text>
            </Text>
            <Text style={styles.infoText}>
              PNG, JPG, GIF up to 10MB
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 95,
    width: '98%',
  },
  placeholder: {
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
  textContainer: {
    marginHorizontal: 12,
  },
  uploadText: {
    color: color.black,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
  orText: {
    color: color.black,
    fontSize: 12,
  },
  infoText: {
    color: color.eightEightEight,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default ImageUploader;
