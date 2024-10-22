import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FlatButton from '../components/FlatButton';
import {Images} from '../constants/assets';
import {color} from '../constants/color';

const Header = ({title, onRightPress, subTitle, onLeftPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <FlatButton
          imageSource={Images.left}
          containerStyle={styles.buttonContainer}
          imageStyle={styles.imageStyle}
          tintColor={color.white}
          onPress={() => (onLeftPress ? onLeftPress() : navigation.goBack())}
        />
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <FlatButton
          text={subTitle}
          containerStyle={styles.editButtonContainer}
          textStyle={styles.editButtonText}
          onPress={onRightPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: color.lightRuby,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerLeft: {
    width: '20%',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerTitle: {
    color: color.white,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    height: '100%',
    width: '50%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  editButtonContainer: {
    height: '100%',
    padding: 10,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageStyle: {
    height: 24,
    width: 24,
  },
});

export default Header;
