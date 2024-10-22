import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import {getCatalog, getData} from '../utils/function';
import {API_ENDPOINTS} from '../api/endpoints';
import {FlatList} from 'react-native-gesture-handler';
import {commonStyle} from '../constants/commonStyle';
import {color} from '../constants/color';
import dimensions, {scaleSize} from '../utils/dimensions';
import {Images} from '../constants/assets';
import {useNavigation} from '@react-navigation/native';
import Catalogues from './Catalogues';
import moment from 'moment';
import { days } from '../utils/mockData';

const ShopInfo = ({route}) => {
  const [shopInfo, setShopInfo] = useState();
  const [images, setImages] = useState([]);
  const [catalogData, setCatalogData] = useState([]);
  const [openHours, setOpenHours] = useState(days);

  const navigation = useNavigation();

  useEffect(() => {
    const id = route.params.data.id;
    const fetchShopInfo = async () => {
      const [shopData, galleryData] = await Promise.all([
        getData(`${API_ENDPOINTS.MA_SHOP_DETAILS}/${id}`),
        getData(`${API_ENDPOINTS.SHOP_GALLERY}/${id}`),
      ]);
      setShopInfo(shopData.shops);
      setImages(galleryData?.gallery || []);
    };
    fetchCatalogues(id);
    fetchShopInfo();
    fetchOpenHours();
  }, [route.params.data.id]);
  

  const fetchOpenHours = async () => {
    // setIsLoading(true);
    try {
      const response = await getData(
        `${API_ENDPOINTS.OPEN_HOURS}/${route.params.data.id}`
        // token,
      );
      console.log("response",response);
      if (response?.OpenHours) {
        setOpenHours(response.OpenHours);
      }
    } catch (error) {
      console.error('Failed to fetch open hours:', error);
    }
    setIsLoading(false);
  };

  const fetchCatalogues = async id => {
    try {
      const response = await getCatalog(id);
       setCatalogData(response.data);
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
    }
  };

  const renderImageItem = ({item}) => (
    <View style={styles.itemImageStyle}>
      <Image
        source={{
          uri: `${API_ENDPOINTS.VENDOR_SHOP_IMAGE_THUMB}/${item?.image}`,
        }}
        style={commonStyle.fullBoxSize}
        resizeMode="contain"
      />
    </View>
  );
  const renderItem = ({item}) => <OpenHourItem item={item} />;

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
      {/* <View style={styles.buttonContainer}>
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
      </View> */}
    </View>
  );

  const renderSellerInfo = () => (
    <View style={styles.subContainer}>
      <Text style={styles.subContainerHeading}>Business Info</Text>
      <View style={styles.sellerInfoRow}>
        <Image
          style={styles.profileImage}
          source={
            shopInfo?.profile_pic
              ? {uri: `${API_ENDPOINTS.PROFILE_PATH}/${shopInfo.profile_pic}`}
              : Images.person
          }
        />
        <Text style={styles.sellerName}>
          {shopInfo?.firstname} {shopInfo?.lastname}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Image source={Images.email} style={styles.icon} />
        <Text style={styles.detail}>{shopInfo?.email}</Text>
      </View>
    </View>
  );

  const DetailRow = ({icon, text}) => (
    <View style={{flexDirection: 'row', marginTop: 8}}>
      <Image
        tintColor={color.lightRuby}
        source={icon}
        style={styles.detailIcon}
      />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );

  if (!shopInfo) return null; // Handle loading state here

  return (
    <ScrollView style={styles.container}>
      <Header title={shopInfo.shop_name} />
      <View style={styles.imageContainer}>
        <FlatList
          horizontal
          data={images}
          renderItem={renderImageItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.imageList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{color: 'grey', textAlign: 'center', flex: 1}}>
              No data found
            </Text>
          }
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.itemTitle}>{shopInfo.shop_name}</Text>
          <View style={{}}>
            <DetailRow
              icon={Images.location}
              text={`${shopInfo?.area_name}, ${shopInfo?.city_name}, ${shopInfo?.states_name}`}
            />
            <DetailRow
              icon={Images.person}
              text={`${shopInfo?.firstname} ${shopInfo?.lastname}`}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subContainerHeading}>Catalogues</Text>
          <View style={{marginVertical: 8, flex: 1}}>
            <FlatList
              horizontal
              data={catalogData}
              ListEmptyComponent={
                <Text style={{color: 'grey', textAlign: 'center', flex: 1}}>
                  No Catalogues found
                </Text>
              }
              renderItem={({item}) => {
                 return (
                  <Catalogues
                    list={false}
                    data={item}
                    onPress={() =>
                      navigation.navigate('CataloguesInfo', {data: item})
                    }
                    listingContentStyle={{
                      paddingBottom: 0,
                      width: dimensions.width - 30,
                      marginVertical: 8,
                    }}
                    // isWishList={isWishList}
                    // onWishlistPress={() => onAddWishListing(item, isWishList)}
                  />
                  // <TouchableOpacity
                  //   onPress={() =>
                  //     navigation.navigate('CataloguesInfo', {data: item})
                  //   }
                  //   style={{
                  //     // height: scaleSize(150),
                  //     width: scaleSize(150),
                  //     // padding: 10,
                  //     backgroundColor: '#ECECEC',
                  //     backgroundColor: color.white,
                  //     borderRadius: 8,
                  //     shadowColor: color.black,
                  //     shadowOffset: {width: 0, height: 2},
                  //     shadowOpacity: 0.1,
                  //     shadowRadius: 8,
                  //     elevation: 3,
                  //     margin: 12,
                  //   }}>
                  //   <Image
                  //     resizeMode={
                  //       item?.primary_catalog_image ? 'cover' : 'contain'
                  //     }
                  //     style={{
                  //       height: scaleSize(130),
                  //       width: scaleSize(150),
                  //       tintColor: !item?.primary_catalog_image && 'gray',
                  //       borderTopLeftRadius:8,borderTopRightRadius:8,marginBottom:8
                  //     }}
                  //     source={
                  //       item?.primary_catalog_image
                  //         ? {
                  //             uri: `${API_ENDPOINTS.CATALOGUES_PATH_LIST}/${item?.primary_catalog_image}`,
                  //           }
                  //         : Images.gallery
                  //     }
                  //   />
                  //   <View style={{paddingHorizontal: 8, marginBottom: 8}}>
                  //     <Text
                  //       style={{
                  //         color: color.black,
                  //         fontSize: 16,
                  //         fontWeight: '600',flex:1
                  //       }}>
                  //       {item?.item_title}
                  //     </Text>
                  //     <Text style={{color: color.black, marginTop: 4}}>
                  //       ₹{item?.sale_price}
                  //     </Text>
                  //     <Text
                  //       style={{
                  //         color: 'gray',
                  //         textDecorationLine: 'line-through',
                  //         marginTop: 4,
                  //       }}>
                  //       ₹{item?.price}
                  //     </Text>
                  //   </View>
                  // </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subContainerHeading}>Open Hours</Text>
          <FlatList
          data={openHours}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hours available</Text>
          }
        />
        </View>
        {renderSellerInfo()}
        <View style={styles.subContainer}>
          <Text style={styles.subContainerHeading}>Overview</Text>
          <Text style={styles.itemDescription}>{shopInfo.shop_overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  detailsContainer: {
    paddingVertical: 6,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayName: {
    fontWeight: 'bold',
    fontSize: scaleSize(18),
    color: color.black,
    marginBottom: scaleSize(2),
  },
  timeContainer: {
    marginBottom: scaleSize(4),
  },
  itemContainer: {
    backgroundColor: color.white,
    borderRadius: scaleSize(8),
    // marginVertical: scaleSize(8),
    marginHorizontal: scaleSize(12),
    shadowColor: color.black,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    // flexDirection: 'column',
  },
  detailIcon: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageList: {
    paddingHorizontal: 12,
  },
  itemImageStyle: {
    borderWidth: 1,
    borderColor: color.semi_light_gray,
    marginRight: 12,
    height: scaleSize(240),
    width: scaleSize(320),
  },
  contentContainer: {
    padding: 16,
  },
  itemTitle: {
    color: color.black,
    fontSize: 24,
    fontWeight: '600',
  },
  subContainer: {
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: color.ddd,
    backgroundColor: color.white,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  subContainerHeading: {
    color: color.black,
    fontWeight: '600',
    fontSize: 16,
    borderBottomWidth: 1.5,
    alignSelf: 'flex-start',
    borderColor: color.lightRuby,
    marginVertical: 4,
    paddingBottom: 2,
  },
  itemDescription: {
    color: color.blur_black,
  },
  sellerInfoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#697565',
  },
  sellerName: {
    fontSize: 16,
    color: color.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  detail: {
    fontSize: 16,
    color: color.dark_charcoal,
    flex: 1,
  },
  detailRow: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 18,
  },
  detailText: {
    marginLeft: 8,
    color: color.gray,
  },
  timeContainer: {
    marginBottom: scaleSize(4),
  },
  timeText: {
    fontSize: scaleSize(16),
    color: color.second_black,
  },
});
