import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { color } from '../constants/color';
import { Images } from '../constants/assets';

const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.outerCircle, { borderColor: color.lightRuby }]}>
        <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}>
          {selected && <Image source={Images.check} style={styles.checkIcon} />}
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginRight: 18,
  },
  outerCircle: {
    borderWidth: 2,
    marginRight: 8,
  },
  innerCircle: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInnerCircle: {
    backgroundColor: color.lightRuby,
  },
  checkIcon: {
    width: 15,
    height: 15,
  },
  label: {
    fontSize: 16,
    color: color.second_black,
  },
});

export default RadioButton;
