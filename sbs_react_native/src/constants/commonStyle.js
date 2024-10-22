import {StyleSheet} from 'react-native';
import {color} from './color';
export const commonStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container:{
    backgroundColor: '#ECECEC',
    flex: 1,
  },
  imageStyle: {
    height: 30,
    width: 30,
  },
  flexDirection: {flexDirection: 'row'},
  noRecordFound: {
    color: color.blur_black,
    textAlign: 'center',
    marginVertical: 10,
  },
  fullBoxSize: {height: '100%', width: '100%'},
  rowCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
