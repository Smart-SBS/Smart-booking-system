import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {color} from '../constants/color';
import {scaleSize} from '../utils/dimensions';
import FlatButton from './FlatButton';
import {Images} from '../constants/assets';

const Dropdown = ({items, selectedItem, onSelect, placeholder}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const filteredItems = items?.filter(item => {
    return item?.value?.toLowerCase().includes(selectedValue?.toLowerCase());
  });

  const handleSelect = item => {
    setSelectedValue(item?.value);
    onSelect(item);
    setIsOpen(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, selectedItem?.value === item && styles.selectedItem]}
      onPress={() => handleSelect(item)}>
      <Text
        style={[
          styles.itemText,
          selectedItem?.value === item && styles.selectedItemText,
        ]}>
        {item?.value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownButton}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={selectedValue ? color.black : color.gray}
          value={selectedValue}
          multiline={false}
          onFocus={() => setIsOpen(true)}
          onChangeText={text => setSelectedValue(text)}
        />
        {selectedItem?.value && (
          <FlatButton
            onPress={() => {
              setSelectedValue(''), onSelect('');
            }}
            tintColor={color.gray}
            imageSource={Images.cancel}
            imageStyle={{height: 12, with: 12}}
          />
        )}
      </View>
      {isOpen && selectedValue.length > 0 && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.area_id}
            renderItem={renderItem}
            nestedScrollEnabled
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scaleSize(10),
  },
  dropdownButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(50),
    backgroundColor: color.white,
    paddingHorizontal: scaleSize(10),
    borderColor: color.semi_light_gray,
  },
  textInput: {
    flex: 1,
    color: color.black,
    height: scaleSize(50),
    fontSize: scaleSize(16),
  },
  selectedText: {
    left: 0,
    flexGrow: 1,
    color: color.black,
    position: 'absolute',
    fontSize: scaleSize(16),
    paddingHorizontal: scaleSize(13),
  },
  dropdownMenu: {
    zIndex: 1,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    top: scaleSize(60),
    position: 'absolute',
    maxHeight: scaleSize(200),
    backgroundColor: color.white,
    borderColor: color.semi_light_gray,
  },
  item: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(16),
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  itemText: {
    fontSize: scaleSize(16),
    color: color.blur_black,
  },
  selectedItem: {
    backgroundColor: color.blue,
  },
  selectedItemText: {
    color: color.white,
  },
});

export default Dropdown;
