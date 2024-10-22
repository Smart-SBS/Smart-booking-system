import React, {useEffect} from 'react';
import {View,  StyleSheet, ActivityIndicator} from 'react-native';
import {color} from '../constants/color';

const LoadingScreen = ({onFinish, timer = 3000}) => {
  useEffect(() => {
    const timeout = setTimeout(onFinish, timer); 
    return () => clearTimeout(timeout);
  }, [onFinish, timer]);

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <ActivityIndicator size="large" color={color.lightRuby} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: color.black,
  },
});

export default LoadingScreen;
