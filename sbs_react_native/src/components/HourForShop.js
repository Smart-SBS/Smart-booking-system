import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';

import Header from './Header';
import LoadingScreen from './Loading';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {getData} from '../utils/function';
import AddHoursModal from './AddHoursModal';
import {API_ENDPOINTS} from '../api/endpoints';
import {scaleSize} from '../utils/dimensions';

const HourForShop = ({route}) => {
  const token = useSelector(state => state.userInfo.token);
  
  const [openHours, setOpenHours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchOpenHours();
  }, []);

  const fetchOpenHours = async () => {
    setIsLoading(true);
    try {
      const response = await getData(
        `${API_ENDPOINTS.OPEN_HOURS}/${route?.params?.id}`,
        token,
      );
      if (response?.OpenHours) {
        setOpenHours(response.OpenHours);
      }
    } catch (error) {
      console.error('Failed to fetch open hours:', error);
    }
    setIsLoading(false);
  };

  const toggleModalVisibility = () => setIsModalVisible(prev => !prev);

  const renderItem = ({item}) => <OpenHourItem item={item} />;

  return (
    <View style={styles.container}>
      <Header
        title="Open Hours"
        subTitle={openHours.length > 0 ? 'Edit' : 'Add'}
        onRightPress={toggleModalVisibility}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={openHours}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hours available</Text>
          }
        />
      )}
      <AddHoursModal
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          fetchOpenHours();
        }}
        shopId={route?.params?.id}
        isEditData={openHours}
      />
    </View>
  );
};

const OpenHourItem = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.detailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.dayName}>{item.day_name}</Text>
        <Text
          style={[
            styles.statusText,
            item.is_closed === '0' ? styles.closed : styles.open,
          ]}>
          {item.is_closed === '0' ? 'Closed' : 'Open'}
        </Text>
      </View>
       {item.is_closed != '0' && (
        <Text style={styles.timeText}>
          {`${moment(item.start_time, 'HH:mm:ss').format('hh:mm A')} - ${moment(
            item.end_time,
            'HH:mm:ss',
          ).format('hh:mm A')}`}
        </Text>
      )}
     </View>
    <View style={styles.buttonContainer}>
      <FlatButton
        tintColor={color.white}
        text={item?.status == 1 ? 'Active' : 'Inactive'}
        containerStyle={{
          backgroundColor:
            item?.status == 1 ? color.lightGreen : color.lightRuby,
          alignSelf: 'flex-start',
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 4,
        }}
        textStyle={{color: color.white}}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  itemContainer: {
    backgroundColor: color.white,
    borderRadius: scaleSize(8),
    marginVertical: scaleSize(8),
    marginHorizontal: scaleSize(12),
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
  },
  detailsContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayName: {
    fontWeight: 'bold',
    fontSize: scaleSize(18),
    color: color.black,
    marginBottom: scaleSize(4),
  },
  timeContainer: {
    marginBottom: scaleSize(4),
  },
  timeText: {
    fontSize: scaleSize(16),
    color: color.second_black,
  },
  statusText: {
    fontSize: scaleSize(16),
    fontWeight: '500',
  },
  closed: {
    color: color.red,
  },
  open: {
    color: color.blue,
  },
  emptyText: {
    fontSize: scaleSize(16),
    color: color.placeholder,
    textAlign: 'center',
    marginTop: scaleSize(20),
    color: color.blur_black,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2eafc',
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
    padding: 14,
  },
});

export default HourForShop;
