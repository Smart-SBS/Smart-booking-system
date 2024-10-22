import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import {color} from '../constants/color';
import Header from '../components/Header';
import {Images} from '../constants/assets';
import {dashboardRating, myBusinesses} from '../utils/function';
import {commonStyle} from '../constants/commonStyle';

// Reusable Card Component
const DashboardCard = ({color: cardColor, icon, count, label}) => (
  <TouchableOpacity style={[styles.card, {backgroundColor: cardColor}]}>
    <Image tintColor={color.white} style={styles.icon} source={icon} />
    <View style={styles.cardContent}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Dashboard = () => {
  const userInfo = useSelector(state => state.userInfo);
  const wishlist = useSelector(state => state?.wishList?.data);

  const isUser = userInfo.data.role_id == '4';

  const [rating, setRating] = useState();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    const fetchBusinessList = async () => {
      const data = await myBusinesses(userInfo?.token);
      const rating = await dashboardRating(userInfo?.token);
      setRating(rating?.data);
      setBusinessList(data.data);
    };
    if (isUser) {
    } else {
      fetchBusinessList();
    }
  }, [userInfo?.token]);

  const renderBusinessItem = ({item}) => (
    <View style={styles.businessItem}>
      {isUser ? (
        <Text style={styles.businessName}>{item.item_title}</Text>
      ) : (
        <>
          <Text style={styles.businessName}>{item.business_name}</Text>
          <Text style={styles.businessDetail}>
            Email: {item.business_email}
          </Text>
          <Text style={styles.businessDetail}>
            Contact: {item.business_contact}
          </Text>
          <Text style={styles.businessDetail}>
            Created At: {item.created_at}
          </Text>
          <Text
            style={[
              styles.businessStatus,
              {
                color: item.status != 0 ? color.lightGreen : color.dc3545,
                backgroundColor: item.status != 0 ? '#D4EDDA' : '#F8D7DA',
              },
            ]}>
            {item.status != 0 ? 'Active' : 'Inactive'}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isUser ? 'Manage Dashboard' : 'Dashboard'} />
      <ScrollView style={[styles.container, {paddingHorizontal: 12}]}>
        <View style={styles.cardContainer}>
          {!isUser && (
            <View style={commonStyle.flexDirection}>
              <DashboardCard
                color="green"
                icon={Images.list}
                count={businessList?.filter(res => res.status == 1).length || 0}
                label="Publish Listing"
              />
              <DashboardCard
                color="#f91"
                icon={Images.star}
                count={rating?.review_count || 0}
                label="Total Reviews"
              />
            </View>
          )}
          <View style={commonStyle.flexDirection}>
            {!isUser && (
              <DashboardCard
                color="#6ae" // Accent Color
                icon={Images.chat}
                count="345"
                label="Messages"
              />
            )}
            <DashboardCard
              color={false ? color.lightGreen : '#f91942'} // Status Color
              icon={Images.fill_heart}
              count={wishlist?.length||0}
              label={isUser ? 'Favorite Listings' : 'Times Bookmarked'}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>{`${
            isUser ? 'Favorite' : ''
          } Listings`}</Text>
          <FlatList
            data={isUser ? wishlist : businessList}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <View>
                <Text style={commonStyle.noRecordFound}>No record found</Text>
              </View>
            }
            renderItem={renderBusinessItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Background Color
  },
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    height: 90,
    flex: 1,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: color.black, // Adds shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 4,
  },
  icon: {
    height: 24,
    width: 24,
  },
  cardContent: {
    marginLeft: 8,
  },
  count: {
    fontSize: 22,
    color: color.white,
    fontWeight: '600',
  },
  label: {
    color: color.white,
  },
  listContainer: {
    flex: 1,
    backgroundColor: color.white, // Card Background Color
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529', // Main Text Color
    marginBottom: 10,
  },
  businessItem: {
    backgroundColor: color.white, // Card Background Color
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    borderColor: color?.e0e0e0,
    borderWidth: 1,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529', // Main Text Color
  },
  businessDetail: {
    fontSize: 14,
    color: '#6C757D', // Secondary Text Color
    marginVertical: 2,
  },
  businessStatus: {
    fontSize: 14,
    color: color.dc3545, // Status Color
    marginVertical: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    borderRadius: 4,
  },
});

export default Dashboard;
