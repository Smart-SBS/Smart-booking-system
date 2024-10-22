import React, {useState} from 'react';
import {StyleSheet,  View, TouchableOpacity, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {color} from '../constants/color';
import {scaleSize} from '../utils/dimensions';
import {Images} from '../constants/assets';

const DropdownComponent = ({data, setValue, value, label, placeholder,search}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleClear = () => {
    setValue(null);
  };

  console.lo;
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: color.lightRuby}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemContainerStyle={{
          paddingVertical: 0,
          padding: 0,
          borderBottomColor: '#ccc',
        }}
        iconStyle={styles.iconStyle}
        containerStyle={{borderWidth: 1}}
        itemTextStyle={{color: color.gray, fontSize: 14}}
        data={data}
        search={!search}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            {value && (
              <Image
                tintColor={'#ccc'}
                style={{height: 15, width: 15}}
                source={Images.cancel}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: scaleSize(10),
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: color.gray,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: color.gray,
  },
  clearButton: {
    borderRadius: 8,
    alignItems: 'center',
  },
});
