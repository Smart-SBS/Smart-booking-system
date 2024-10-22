// src/utils/dimensions.js
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Utility function to scale values based on screen width
export const scaleSize = size => (width / 375) * size;

export default {
  width,
  height,
  scaleSize,
};
