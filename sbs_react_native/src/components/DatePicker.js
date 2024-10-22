import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {scaleSize} from '../utils/dimensions';
import { color } from '../constants/color';

const DatePicker = ({selectedDate, onDateChange,mode,style,label}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleDateChange = (event, date) => {
    if (date) {
      onDateChange(date);
    }
    setIsDatePickerVisible(false);
  };
  const formattedDate = mode === 'time'
    ? moment(selectedDate).format('hh:mm A')  // Format as time
    : moment(selectedDate).format('MMMM D, YYYY');  // Format as date


  return (
    <View style={[styles.container,style]}>
      {label&&<Text style={{ marginBottom:4,fontSize:16,color:color.gray}}>{label}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsDatePickerVisible(true)}>
        <Text style={styles.text}>{formattedDate}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
        minimumDate={new Date()}
          value={selectedDate}
          mode={mode?mode:"date"}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleSize(10),
  },
  button: {
    padding: scaleSize(10),
    borderColor: color.ddd,
    backgroundColor: color.white,
    borderWidth: 1,
    borderRadius: scaleSize(8),
    justifyContent: 'center',
    height: scaleSize(50),
  },
  text: {
    fontSize: 16,
    color: color.black,
  },
});

export default DatePicker;
