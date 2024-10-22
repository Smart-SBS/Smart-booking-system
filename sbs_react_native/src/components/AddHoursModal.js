import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, Alert} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';

import DatePicker from './DatePicker';
import FlatButton from './FlatButton';
import RadioButton from './RadioButton';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {addOpenHour, deleteItems, editOpenHour} from '../utils/function';
import { API_ENDPOINTS } from '../api/endpoints';

const AddHoursModal = ({isModalVisible, onClose, shopId, isEditData}) => {
  const token = useSelector(state => state.userInfo.token);
  let date = new Date(new Date().setHours(0, 0, 0, 0));
  const [businessHours, setBusinessHours] = useState({
    Monday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Tuesday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Wednesday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Thursday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Friday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Saturday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
    Sunday: {closed: false, ranges: [{start: new Date(), end: new Date()}]},
  });

  useEffect(() => {
    if (isEditData && isEditData.length > 0) {
      const parseApiResponse = response => {
        const defaultHours = {
          Monday: {closed: true, ranges: []},
          Tuesday: {closed: true, ranges: []},
          Wednesday: {closed: true, ranges: []},
          Thursday: {closed: true, ranges: []},
          Friday: {closed: true, ranges: []},
          Saturday: {closed: true, ranges: []},
          Sunday: {closed: true, ranges: []},
        };

        response.forEach(item => {
          const dayName = item.day_name;
          const dayData = defaultHours[dayName];
          dayData.closed = item.is_closed === '1' ? false : true;
          dayData.ranges.push({
            start: new Date(`1970-01-01T${item.start_time}`),
            end: new Date(`1970-01-01T${item.end_time}`),
            id: item.id,
          });
        });

        return defaultHours;
      };

      const parsedData = parseApiResponse(isEditData);
      setBusinessHours(parsedData);
    }
  }, [isEditData]);

  const handleChange = (day, index, type, value) => {
    const updatedRanges = businessHours[day].ranges.map((range, i) =>
      i === index ? {...range, [type]: value} : range,
    );
    setBusinessHours(prevState => ({
      ...prevState,
      [day]: {...prevState[day], ranges: updatedRanges},
    }));
  };

  const addTimeRange = day => {
    setBusinessHours(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        ranges: [
          ...prevState[day].ranges,
          {start: new Date(), end: new Date()},
        ],
      },
    }));
  };

  const removeTimeRange = async (day, index, id) => {
    try {
      if (id) {
        // const response = await deleteOpensHours(id, token);
        await deleteItems(id,API_ENDPOINTS.DELETE_OPEN_HOURS,token)
      }
      setBusinessHours(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          ranges: prevState[day].ranges.filter((_, i) => i !== index),
        },
      }));
    } catch (error) {}
  };

  const handleToggleClosed = day => {
    if (businessHours[day]?.ranges?.length <= 1) {
      setBusinessHours(prevState => ({
        ...prevState,
        [day]: {...prevState[day], closed: !prevState[day].closed},
      }));
    } else {
      Alert.alert(
        '',
        "This day can only be closed when there's a single record.",
      );
    }
  };

  const handleSubmit = async () => {
    const formattedData = Object.keys(businessHours).flatMap(day => {
      const dayData = businessHours[day];

      return dayData.ranges.map(range => ({
        id: range?.id,
        shop_id: shopId,
        day_id: Object.keys(businessHours).indexOf(day) + 1,
        start_time: dayData.closed
          ? '00:00'
          : moment(range.start).format('HH:mm'),
        end_time: dayData.closed ? '00:00' : moment(range.end).format('HH:mm'),
        is_closed: dayData.closed ? 0 : 1,
      }));
    });

    try {
      const response =
        isEditData.length > 0
          ? await editOpenHour({data: formattedData}, token)
          : await addOpenHour(shopId, {data: formattedData}, token);

      if (response?.message) {
        onClose();
      }
    } catch (error) {
      console.error('Error submitting open hours:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent onRequestClose={onClose}>
        <View style={styles.modalContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <FlatButton
              imageStyle={styles.closeButtonImage}
              onPress={onClose}
              imageSource={Images.cancel}
              tintColor={color.white}
              containerStyle={styles.closeButton}
            />
            {Object.keys(businessHours).map(day => (
              <View key={day} style={styles.inputGroup}>
                <View style={styles.header}>
                  <Text style={styles.label}>{day}</Text>
                  <RadioButton
                    selected={businessHours[day].closed}
                    onPress={() => handleToggleClosed(day)}
                    label="Closed"
                  />
                </View>
                {!businessHours[day].closed && (
                  <View style={styles.timeRanges}>
                    {businessHours[day].ranges.map((range, index) => (
                      <View key={index} style={styles.timeRangeBox}>
                        <DatePicker
                          style={styles.datePicker}
                          mode="time"
                          label="Opens at"
                          selectedDate={
                            range.start ? new Date(range.start) : new Date()
                          }
                          onDateChange={date =>
                            handleChange(day, index, 'start', date)
                          }
                        />
                        <DatePicker
                          style={styles.datePicker}
                          mode="time"
                          label="Closes at"
                          selectedDate={
                            range.end ? new Date(range.end) : new Date()
                          }
                          onDateChange={date =>
                            handleChange(day, index, 'end', date)
                          }
                        />
                        <FlatButton
                          imageSource={
                            index === 0 ? Images.plus : Images.delete
                          }
                          imageStyle={{height: 20, width: 20}}
                          containerStyle={[styles.actionButton]}
                          onPress={() =>
                            index === 0
                              ? addTimeRange(day)
                              : removeTimeRange(day, index, range.id)
                          }
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            <FlatButton
              onPress={handleSubmit}
              text={'Save Hours'}
               containerStyle={{
                backgroundColor: color.lightRuby,
                paddingVertical: scaleSize(12),
                borderRadius: scaleSize(8),
               }}
            />
           </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButtonImage: {
    height: 20,
    width: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.dark_charcoal,
  },
  timeRanges: {
    marginBottom: 15,
  },
  timeRangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
    elevation: 1,
  },
  datePicker: {
    flex: 1,
    marginRight: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 18,
  },
 
  
});

export default AddHoursModal;
