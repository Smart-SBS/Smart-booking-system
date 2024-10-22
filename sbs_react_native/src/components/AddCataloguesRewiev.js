import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Header from './Header';
import {color} from '../constants/color';
import {Images} from '../constants/assets'; 
import AddReviewModal from './AddReviewModal';
import {scaleSize} from '../utils/dimensions';
import {API_ENDPOINTS} from '../api/endpoints';
import { commonStyle } from '../constants/commonStyle';
import {getReviewsCatalog, deleteReview} from '../utils/function';

 
const AddCataloguesReviews = ({route, navigation}) => {
  const userInfo = useSelector(state => state.userInfo);
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditId, setIsEditId] = useState();
 
  useEffect(() => {
    if (route?.params?.id) {
      getReviews();
    }
  }, [route?.params?.id]);

  const getReviews = async () => {
    try {
      const response = await getReviewsCatalog(
        route?.params?.id,
        userInfo?.token,
      );
      if (response?.success) {
        setReviews(response.data);
      } 
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleAddReview = async () => {
    setIsModalVisible(pre => !pre);
    getReviews();
    // const response=await addCatalogReviews()
     // navigation.navigate('AddReview', {catalogId: route?.params?.id});
  };

  const handleEditReview = review => {
    setIsEditId(review);
    handleAddReview();
    // navigation.navigate('EditReview', {review, catalogId: route?.params?.id});
  };

  const handleDeleteReview = async reviewId => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await deleteReview(reviewId, userInfo?.token);
               if (response?.message) {
                Alert.alert('Success', 'Review deleted successfully');
                getReviews(); // Refresh the reviews list
              } else {
                Alert.alert('Error', 'Failed to delete review');
              }
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
        },
      ],
    );
  };

  const calculateAverageRating = () => {
    const ratings = reviews.map(review => parseFloat(review.rating));
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return ratings.length > 0 ? (total / ratings.length).toFixed(1) : 'N/A';
  };

  const renderReview = ({item}) => (
    <View style={styles.reviewCard}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{height: 50, width: 50, borderRadius: 100}}
          source={{
            uri: `${API_ENDPOINTS?.PROFILE_PATH}/${userInfo?.data?.profile_pic}`,
          }}
        />
        <Text style={styles.reviewAuthor}>
          {item.firstname} {item.lastname}
        </Text>
        <View
          style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
          {[1, 2, 3, 4, 5].map((res, index) => {
            return (
              <Image
                key={index.toString()}
                tintColor={
                  item?.rating >= res
                    ? color.gold
                    : color.semi_light_gray
                }
                source={Images.star}
                style={{height: 20, width: 20}}
              />
            );
          })}
        </View>
      </View>
      {/* <Text style={styles.reviewTitle}>{item.item_title}</Text> */}
      <View style={styles.ratingContainer}></View>
      <Text style={styles.reviewText}>{item.review_text}</Text>
      <View style={styles.reviewActions}>
        {/* <FlatButton
          tintColor={color.white}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.edit}
          onPress={() => handleEditReview(item.id)}
        />
        <FlatButton
          tintColor={color.white}
          containerStyle={styles.buttonStyle}
          imageStyle={styles.buttonImage}
          imageSource={Images.delete}
          onPress={() => handleDeleteReview(item.id)}
        /> */}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header title="Catalogues Reviews" />
      <View style={styles.statsContainer}>
        <View>
          <Text style={styles.statsText}>Total Reviews: {reviews.length}</Text>
          <Text style={styles.statsText}>
            Average Rating: {calculateAverageRating()}
          </Text>
        </View>
        {/* <FlatButton
          onPress={handleAddReview}
          containerStyle={styles.addButton}
          textStyle={styles.addButtonText}
          text={'Add Review'}
        /> */}
      </View>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.reviewList}
        ListEmptyComponent={ <Text style={commonStyle.noRecordFound}>No catalog reviews</Text>}
        />
      <AddReviewModal
        isModalVisible={isModalVisible}
        onClose={() => {
          handleAddReview(), setIsEditId();
        }}
        id={route?.params?.id}
        shopId={route?.params?.id}
        isEditId={isEditId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.dddd,
  },
  statsText: {
    fontSize: 16,
    color: '#333',
  },
  reviewList: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: color.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor:color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: color.black,
  },
  reviewAuthor: {
    color:color.black,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 2,
    tintColor: color.gold, // Gold color for star
  },
  fullStar: {
    tintColor: color.gold, // Gold color for full stars
  },
  reviewText: {
    color: color.sixSixSix,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scaleSize(8),
  },
  actionButton: {
    marginLeft: 8,
  },
  actionText: {
    color: color.bluePrimary,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: color.lightRuby,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  addButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: color.lightRuby,
    padding: scaleSize(6),
    borderRadius: 50,
    height: scaleSize(30),
    width: scaleSize(30),
    marginHorizontal: scaleSize(4),
  },
  buttonImage: {
    height: scaleSize(20),
    width: scaleSize(20),
  },
});

export default AddCataloguesReviews;
