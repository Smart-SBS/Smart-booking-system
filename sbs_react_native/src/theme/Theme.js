import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Images} from '../constants/assets';
import Dimensions from '../utils/dimensions';

const Theme = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://code-theme.com/html/listifind/images/bg/bg-2.jpg',
        }}
        style={styles.backgroundImage}
        resizeMode="cover">
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: Dimensions.width,
    height: Dimensions.height,
  },
});

export default Theme;
