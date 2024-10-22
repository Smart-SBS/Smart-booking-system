import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  addItemInCatalog,
  catalogDetails,
  catalogDetailsDeleteReviews,
  catalogDetailsEditReviews,
  catalogDetailsImages,
  catalogDetailsReviews,
  catalogDetailsReviewsAdd,
  catalogDetailsReviewsEdit,
  deleteWishListing,
  getData,
  submitEnquiry,
  userReviews,
} from '../utils/function';
import Header from './Header';
import {API_ENDPOINTS} from '../api/endpoints';
import {scaleSize} from '../utils/dimensions';
import {Images} from '../constants/assets';
import {color} from '../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import FlatButton from './FlatButton';
import CataloguesReviews from './CataloguesReviews';
import Auth from './Auth';
import DatePicker from './DatePicker';
import {commonStyle} from '../constants/commonStyle';
import LoadingScreen from './Loading';
import {fetchWishList} from '../redux/wishlist/wishlistapi';

const CataloguesInfo = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.data);
  const token = useSelector(state => state.userInfo.token);
  const wishlist = useSelector(state => state?.wishList?.data);

  const [openHours, setOpenHours] = useState([]);

  const [replayId, setReplayId] = useState('');
  const [newReview, setNewReview] = useState('');
  const [replayText, setReplayText] = useState('');
  const [editReviewText, setEditReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isSignIN, setIsSignIN] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [yourReview, setYourReview] = useState([]);
  const [catalogImages, setCatalogImages] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewRating, setEditReviewRating] = useState(null);
  const [catalogDetailsInfo, setCatalogDetailsInfo] = useState({});
  const [inQuireNowText, setInQuireNowText] = useState('');
  const [dateTimeSelected, setDateTimeSelected] = useState({
    date: new Date(),
    time: new Date(),
  });

  const isVendor = userInfo?.role_id == '3' ? true : false;
console.log("route?.params?.data?.shop_id",route?.params?.data?.shop_id);
  useEffect(() => {
    if (route?.params?.data?.id) {
      fetchCatalogDetails(route.params.data.id);
      fetchOpenHours();
    }
  }, [route?.params?.data?.id]);

  const fetchOpenHours = async () => {
    setIsLoading(true);
    try {
      const response = await getData(
        `${API_ENDPOINTS.OPEN_HOURS}/${route?.params?.data?.shop_id}`,
        '',
      );
      if (response?.OpenHours) {
        // console.log("fetchOpenHours",response?.OpenHours);
        setOpenHours(response?.OpenHours);
        // setOpenHours(response.OpenHours);
      }
    } catch (error) {
      console.error('Failed to fetch open hours:', error);
    }
    setIsLoading(false);
  };

  const fetchCatalogDetails = async id => {
    setIsLoading(true);
    try {
      const [infoResponse, imageResponse, reviewsResponse] = await Promise.all([
        catalogDetails(id, token),
        catalogDetailsImages(id, token),
        catalogDetailsReviews(id, token),
      ]);
      console.log('infoResponse', infoResponse?.data?.Catalog);
      setCatalogImages(imageResponse?.data?.gallery || []);
      setCatalogDetailsInfo(infoResponse?.data?.Catalog || {});
      formatReviews(reviewsResponse?.data?.Review || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch catalog details', error);
    }
  };

  const formatReviews = data => {
    if (!userInfo) return;
    const yourReviews = [];
    const otherReviews = [];
    data.forEach(review => {
      if (review.user_id === userInfo?.id) {
        yourReviews.push(review);
      } else {
        otherReviews.push(review);
      }
    });
    setYourReview(yourReviews);
    setReviewInfo(otherReviews);
  };

  const convertRatingToPercentage = ratingStr => {
    if (!ratingStr) return '0';

    const ratingsArray = ratingStr.split(',').map(Number);
    const averageRating =
      ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;

    return Math.round(averageRating).toFixed(1);
  };

  const calculateAverageRating = ratingString => {
    const ratingsArray = ratingString?.split(',').map(Number);
    const average =
      ratingsArray?.reduce((a, b) => a + b, 0) / ratingsArray?.length;
    return parseFloat(average?.toFixed(1)) || 0;
  };

  const handleAddReview = async () => {
    if (newReview.trim() && newRating > 0) {
      try {
        const reviewInfo = {
          rating: newRating,
          catalog_id: route?.params?.data?.id,
          review_text: newReview,
        };
        await catalogDetailsReviewsAdd(reviewInfo, token);
        setNewReview('');
        setNewRating(0);
        fetchCatalogDetails(route?.params?.data?.id); // Refresh reviews
      } catch (error) {
        console.error('Failed to add review', error);
      }
    } else {
      Alert.alert('', 'Ensure all fields are completed');
    }
  };

  const handleEditReview = async () => {
    if (editReviewId > 0 && newReview.trim()) {
      try {
        const review = {
          id: editReviewId,
          rating: newRating,
          review_text: newReview,
        };
        await catalogDetailsReviewsEdit(review);
        setEditMode(false);
        setEditReviewId(null);
        setNewReview('');
        setNewRating(0);
        fetchCatalogDetails(route?.params?.data?.id); // Refresh reviews
      } catch (error) {
        console.error('Failed to edit review', error);
      }
    }
  };

  const onEditReviewId = id => {
    setEditReviewId(id?.id);
    setEditReviewText(id?.review_text);
    setEditReviewRating(id?.rating);
    setEditMode(true);
  };

  const onUpdate = async () => {
    if (editReviewId) {
      try {
        const reviewData = {
          rating: editReviewRating,
          catalog_id: route?.params?.data?.id,
          review_text: editReviewText,
        };

        if (!token) {
          console.error('Authentication token is missing');
          return;
        }
        await catalogDetailsEditReviews(editReviewId, reviewData, token);
        fetchCatalogDetails(route?.params?.data?.id); // Refresh reviews
        setEditReviewId(null);
        setEditReviewText('');
        setEditReviewRating(null);
        setEditMode(false);
      } catch (error) {
        console.error('Failed to update review', error);
      }
    }
  };

  const onDelete = async id => {
    try {
      const reviewData = {
        catalog_id: route?.params?.data?.id,
      };
      if (!token) {
        console.error('Authentication token is missing');
        return;
      }

      await catalogDetailsDeleteReviews(id, reviewData, token);
      fetchCatalogDetails(route?.params?.data?.id);
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const renderImageItem = ({item}) => (
    <View style={styles.itemImageStyle}>
      <Image
        source={{uri: `${API_ENDPOINTS.CATALOGUES_PATH_THUMB}/${item?.image}`}}
        style={commonStyle.fullBoxSize}
        resizeMode="contain"
      />
    </View>
  );

  const replayReviews = async () => {
    try {
      let obj = {
        reply: replayText,
      };
      const response = await userReviews(obj, replayId, token);

      if (response?.message) {
        fetchCatalogDetails(route.params.data.id);
        setReplayId('');
        setReplayText('');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onPurchaseNow = async () => {
    try {
      const selectedTime = moment(dateTimeSelected?.time);
      const mergedDateTime = moment(dateTimeSelected?.date).set({
        hour: selectedTime?.hour(),
        minute: selectedTime?.minute(),
        second: selectedTime?.second(),
        millisecond: selectedTime?.millisecond(),
      });
      const availableDays = [];
      const timeDays = [];
      const selectedDay = moment(dateTimeSelected?.date).format('dddd');
      // if (mergedDateTime <= moment().add(1, 'minute')) {
      //   Alert.alert('Please select a valid day and time.');
      //   return false;
      // }
      const isAvailable = openHours.some(res => {
        if (res?.is_closed == '1') {
          let availableStartTime = moment(res?.start_time, 'HH:mm:ss');
          let availableEndTime = moment(res?.end_time, 'HH:mm:ss');

          if (selectedDay === res?.day_name) {
            if (
              selectedTime.isBetween(
                availableStartTime,
                availableEndTime,
                null,
                '[]',
              )
            ) {
              return true;
            } else {
              timeDays.push(`${res?.start_time} to ${res?.end_time}`);
              return false;
            }
          } else {
            availableDays.push(res?.day_name);
            return false;
          }
        }
      });

      // Log the available days
      if (!isAvailable && openHours.length > 0) {
        if (availableDays.length > 0 && timeDays.length == 0) {
          Alert.alert('Available days for booking:', availableDays.join(', '));
        } else {
          Alert.alert(
            `Available slots on ${selectedDay}: `,
            timeDays.join(', '),
          );
        }
      } else {
        if (mergedDateTime <= moment()) {
          Alert.alert('', 'Please choose a future date and time');
          return false;
        }

        if (userInfo?.id) {
          navigation.navigate('CheckoutScreen', {
            catalogImages: catalogImages,
            catalogDetailsInfo: catalogDetailsInfo,
            inQuire: {
              catalog_id: route?.params?.data?.id,
              enquiry_date: moment(dateTimeSelected.date).format('YYYY-MM-DD'),
              enquiry_time: moment(dateTimeSelected.time).format('HH:mm'),
              message: inQuireNowText,
            },
          });
        } else {
          setIsSignIN(pre => !pre);
        }

        // if (existingItem) {
        //   navigation.navigate('CartScreen');
        // } else {
        //   const updatedItems = [...cartItems, {...obj, quantity: 1}];
        //   const inquireNowList = Array.isArray(inquire)
        //     ? [...inquire, {...inQuireNow}]
        //     : [{...inQuireNow}];
        //   setCartItems(updatedItems);
        //   saveCartItems(updatedItems, inquireNowList);
        // }
      }
    } catch (error) {
      console.error('Error during Enquiry:', error);
    }
  };

  // const onPurchaseNow = async () => {
  //   if (userInfo?.id) {
  //     navigation.navigate('CheckoutScreen', {
  //       catalogImages: catalogImages,
  //       catalogDetailsInfo: catalogDetailsInfo,
  //       inQuire: {
  //         catalog_id: route?.params?.data?.id,
  //         enquiry_date: moment(dateTimeSelected.date).format('YYYY-MM-DD'),
  //         enquiry_time: moment(dateTimeSelected.time).format('HH:mm'),
  //         message: inQuireNowText,
  //       },
  //     });
  //   } else {
  //     setIsSignIN(pre => !pre);
  //   }
  // };
  const onAddWishListing = async () => {
    const isWishList = wishlist?.some(
      res => res?.catalog_id == catalogDetailsInfo.id,
    );
    console.log(isWishList);
    try {
      const obj = {
        catalog_id: catalogDetailsInfo.id,
        user_id: userInfo?.id,
      };

      if (isWishList) {
        // Find the wishlist catalogDetailsInfo to delete
        const wishlistItem = wishlist?.find(
          res => res.catalog_id === catalogDetailsInfo.id,
        );

        if (wishlistItem) {
          await deleteWishListing(wishlistItem.id, token);
          console.log('Wishlist catalogDetailsInfo deleted successfully');
        }
      } else {
        const response = await addItemInCatalog(
          API_ENDPOINTS.ADD_WISHLIST,
          obj,
          token,
        );
        // await getWishListing(); // Ensure the wishlist is updated after addition
        console.log(
          'Wishlist catalogDetailsInfo added successfully:',
          response,
        );
      }
      const data = {
        id: userInfo.id,
        token: token,
      };
      dispatch(fetchWishList(data));
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={catalogDetailsInfo?.item_title} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.imageContainer}>
            <FlatList
              horizontal
              data={catalogImages}
              renderItem={renderImageItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.imageList}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.content}>
            <View>
              <View>
                <Text style={styles.itemTitle}>
                  {catalogDetailsInfo?.item_title}
                </Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(res => (
                    <Image
                      key={res}
                      tintColor={
                        convertRatingToPercentage(catalogDetailsInfo?.rating) >=
                        res
                          ? color.gold
                          : color.semi_light_gray
                      }
                      source={Images.star}
                      style={styles.star}
                    />
                  ))}
                  <Text style={styles.ratingText}>
                    {' '}
                    {calculateAverageRating(catalogDetailsInfo?.rating)} (
                    {catalogDetailsInfo?.rating?.split(',').length || 0}{' '}
                    Reviews)
                  </Text>
                </View>
              </View>
              {userInfo?.role_id != '3' && (
                <FlatButton
                  onPress={() =>
                    userInfo?.role_id ? onAddWishListing() : setIsSignIN(true)
                  }
                  imageStyle={{height: 34, width: 34}}
                  containerStyle={{
                    height: 0,
                    width: 0,
                    backgroundColor: '#000',
                    right: 28,
                    top: 28,
                    position: 'absolute',
                  }}
                  // imageSource={Images.heart}
                  imageSource={
                    wishlist?.some(
                      res => res?.catalog_id == catalogDetailsInfo.id,
                    )
                      ? Images.fill_heart
                      : Images.heart
                  }
                />
              )}
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subContainerHeading}>Overview</Text>
              <Text style={styles.itemDescription}>
                {catalogDetailsInfo?.item_description}
              </Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subContainerHeading}>Pricing</Text>
              <View style={{marginTop: 8}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 2,
                  }}>
                  <Text style={{color: color.lightRuby}}>{'Price'}</Text>
                  <Text style={{color: color.black}}>
                    ₹
                    {catalogDetailsInfo.platform_fee_type == '%'
                      ? (
                          parseFloat(catalogDetailsInfo?.sale_price) * 1.1
                        ).toFixed(2)
                      : +catalogDetailsInfo?.sale_price + 10}
                  </Text>
                  {/* <Text style={{color: color.lightRuby}}>{'Sales Price'}</Text> */}
                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 2,
                  }}>
                  <Text
                    style={{
                      color: color.black,
                      textDecorationLine: 'line-through',
                    }}>
                    ₹{catalogDetailsInfo?.price}
                  </Text>
                  <Text style={{color: color.black}}>
                    ₹
                    {catalogDetailsInfo.platform_fee_type == '%'
                      ? (
                          parseFloat(catalogDetailsInfo?.sale_price) * 1.1
                        ).toFixed(2)
                      : +catalogDetailsInfo?.sale_price + 10}
                  </Text>
                </View> */}
              </View>
            </View>
            <CataloguesReviews
              catalogDetailsInfo={catalogDetailsInfo}
              editMode={editMode}
              handleAddReview={handleAddReview}
              handleEditReview={handleEditReview}
              newRating={newRating}
              setNewRating={setNewRating}
              reviewInfo={reviewInfo}
              yourReview={yourReview}
              onEditReviewId={onEditReviewId}
              onDelete={onDelete}
              editReviewId={editReviewId}
              setEditReviewRating={setEditReviewRating}
              onUpdate={onUpdate}
              replayId={replayId}
              setReplayId={setReplayId}
              replayText={replayText}
              replayReviews={replayReviews}
              newReview={newReview}
              setNewReview={setNewReview}
              setReplayText={setReplayText}
              setEditReviewText={setEditReviewText}
              editReviewRating={editReviewRating}
              editReviewText={editReviewText}
            />

            {/* {!isVendor && ( */}
            <View style={styles.subContainer}>
              <Text style={styles.subContainerHeading}>Booking Form</Text>
              {/* {userInfo?.id && ( */}
              <>
                <View style={{flexDirection: 'row'}}>
                  <DatePicker
                    selectedDate={dateTimeSelected.date}
                    onDateChange={val =>
                      setDateTimeSelected(pre => ({...pre, date: val}))
                    }
                  />
                  <View style={{flex: 1, marginLeft: 10}}>
                    <DatePicker
                      style={{width: '100%'}}
                      mode={'time'}
                      selectedDate={dateTimeSelected.time}
                      onDateChange={val =>
                        setDateTimeSelected(pre => ({...pre, time: val}))
                      }
                    />
                  </View>
                </View>
                <TextInput
                  value={inQuireNowText}
                  onChangeText={setInQuireNowText}
                  style={styles.reviewInput}
                  placeholder="Write your description"
                  placeholderTextColor={color.blur_black}
                />
              </>
              {/* )} */}
              <FlatButton
                // disabled={userInfo?.id && true}
                // onPress={inQuireNow}
                onPress={onPurchaseNow}
                // onPress={() => setIsSignIN(pre => !pre)}
                containerStyle={styles.addReviewButton}
                text={'Book Now'}
              />
            </View>
            {/* )} */}
            <View style={styles.subContainer}>
              <Text style={styles.subContainerHeading}>Seller Info</Text>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.profileImage}
                  source={
                    catalogDetailsInfo?.profile_pic
                      ? {
                          uri: `${API_ENDPOINTS?.PROFILE_PATH}/${catalogDetailsInfo?.profile_pic}`,
                        }
                      : Images.person
                  }
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: color.black,
                    fontWeight: '600',
                    marginLeft: 8,
                  }}>
                  {catalogDetailsInfo?.firstname} {catalogDetailsInfo?.lastname}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Image source={Images.email} style={styles.icon} />
                <Text style={styles.detail}>{catalogDetailsInfo?.email}</Text>
              </View>
            </View>
            <Auth
              isUser={true}
              isVisible={isSignIN}
              onCancel={() => {
                setIsSignIN(false);
              }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 18,
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
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#697565',
  },
  itemImageStyle: {
    borderWidth: 1,
    borderColor: color.semi_light_gray,
    marginRight: 12,
    height: scaleSize(240),
    width: scaleSize(320),
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
  imageContainer: {
    paddingTop: 8,
    // backgroundColor:'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageList: {
    paddingHorizontal: 12,
    // backgroundColor:'red'
  },

  content: {
    padding: 16,
  },
  itemTitle: {
    color: color.black,
    fontSize: 24,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
  },
  star: {
    height: 20,
    width: 20,
  },
  ratingText: {
    color: color.gray,
  },
  itemDescription: {
    color: color.blur_black,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: color.semi_light_gray,
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    height: 100,
    textAlignVertical: 'top',
    color: color.black,
  },
  addReviewButton: {
    backgroundColor: color.lightRuby,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 8,
    marginTop: 12,
  },
});

export default CataloguesInfo;
