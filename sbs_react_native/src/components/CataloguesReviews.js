import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {useSelector} from 'react-redux';
import {API_ENDPOINTS} from '../api/endpoints';
import FlatButton from './FlatButton';
import {scaleSize} from '../utils/dimensions';
import InputBox from './InputBox';
import {commonStyle} from '../constants/commonStyle';

const CustomerFeedback = ({ratingData}) => {
  const reviews = ratingData
    ?.split(',')
    ?.map(rating => ({rating: parseInt(rating, 10)}));

  const ratingCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  reviews?.forEach(review => {
    ratingCounts[review.rating]++;
  });

  return (
    <View style={styles1.ratingDistribution}>
      {[5, 4, 3, 2, 1].map(rating => {
        const percentage = (ratingCounts[rating] / reviews?.length) * 100;
        return (
          <View key={rating} style={styles1.ratingBar}>
            <Text style={styles1.ratingText}>{rating} Stars</Text>
            <View style={styles1.barContainer}>
              <View style={[styles1.barFill, {width: `${percentage}%`}]} />
            </View>
            <Text style={styles1.percentageText}>
              {Math.round(percentage)}%
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles1 = StyleSheet.create({
  ratingInfo: {
    marginRight: 16,
  },
  averageRating: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  ratingDistribution: {
    flexGrow: 1,
    marginTop: 12,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    // backgroundColor:'red'
  },
  ratingText: {
    // width: 40,
    fontSize: 14,
    color: color.black,
    marginRight: 4,
  },
  barContainer: {
    flexGrow: 1,
    backgroundColor: color?.e0e0e0,
    borderRadius: 8,
    height: 12,
    marginHorizontal: 8,
  },
  barFill: {
    backgroundColor: color.gold,
    height: '100%',
    borderRadius: 8,
  },
  percentageText: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    color: '#606060',
  },
});

const CataloguesReviews = ({
  catalogDetailsInfo,
  setReplayText,
  setNewRating,
  newRating,
  editMode,
  handleEditReview,
  handleAddReview,
  yourReview,
  reviewInfo,
  editReviewRating,
  onEditReviewId,
  onDelete,
  editReviewId,
  setEditReviewRating,
  onUpdate,
  replayId,
  setReplayId,
  replayText,
  replayReviews,
  newReview,
  setNewReview,
  setEditReviewText,
  editReviewText,
}) => {
  const userInfo = useSelector(state => state.userInfo.data);
  const token = useSelector(state => state.userInfo.token);

  const [isReply, setIsReply] = useState(false);

  const calculateAverageRating = ratingString => {
    const ratingsArray = ratingString?.split(',').map(Number);
    const average =
      ratingsArray?.reduce((a, b) => a + b, 0) / ratingsArray?.length;
    return parseFloat(average?.toFixed(1)) || 0;
  };

  const convertRatingToPercentage = ratingStr => {
    if (!ratingStr) return '0';
    const ratingsArray = ratingStr.split(',').map(Number);
    const averageRating =
      ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;

    return Math.round(averageRating).toFixed(1);
  };

  const sendButton = () => {
    if (replayText.trim().length > 1) {
      setIsReply(false);

      replayReviews();
    } else {
      setIsReply(true);
    }
  };
  const renderReviewItem = ({item}) => (
    <View style={styles.reviewContainer}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={
            item.profile_picture
              ? {
                  uri: `${API_ENDPOINTS.PROFILE_PATH}/${item.profile_picture}`,
                }
              : Images.person
          }
        />
        <View style={{marginLeft: 8}}>
          <Text style={styles.profileName}>{`${item?.firstname || ''} ${
            item?.lastname || ''
          }`}</Text>
          <Text style={{color: color.second_black, fontSize: 12}}>
            {item?.created_at || ''}
          </Text>
        </View>

        {item.user_id === userInfo?.id && (
          <View style={styles.reviewActions}>
            <FlatButton
              containerStyle={styles.actionButtonContainer}
              imageStyle={styles.actionButtonImage}
              imageSource={Images.edit}
              onPress={() => onEditReviewId(item)}
            />
            <FlatButton
              containerStyle={styles.actionButtonContainer}
              imageStyle={styles.actionButtonImage}
              imageSource={Images.delete}
              onPress={() => onDelete(item?.id)}
            />
          </View>
        )}
      </View>
      {item.id === editReviewId ? (
        <>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(rating => (
              <TouchableOpacity
                key={rating}
                onPress={() => setEditReviewRating(rating)}
                style={styles.ratingButton}>
                <Image
                  source={Images.star}
                  style={styles.star}
                  tintColor={
                    editReviewRating >= rating
                      ? color.gold
                      : color.semi_light_gray
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <InputBox value={editReviewText} onChangeText={setEditReviewText} />
          <View style={styles.buttonContainer}>
            <FlatButton
              onPress={onUpdate}
              containerStyle={styles.cancelButton}
              textStyle={styles.buttonText}
              text="Cancel"
            />
            <FlatButton
              onPress={onUpdate}
              containerStyle={styles.updateButton}
              textStyle={styles.buttonText}
              text="Update"
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.reviewRatingContainer}>
            {[1, 2, 3, 4, 5].map(res => (
              <Image
                key={res}
                tintColor={
                  item.rating >= res ? color.gold : color.semi_light_gray
                }
                source={Images.star}
                style={styles.star}
              />
            ))}
          </View>
          <View style={commonStyle.rowCenter}>
            <Text style={styles.reviewText}>{item?.review_text || ''}</Text>
            {item.id !== replayId &&
              catalogDetailsInfo?.user_id == userInfo?.id && (
                <FlatButton
                  onPress={() => {
                    setReplayText(item?.reply), setReplayId(item.id);
                  }}
                  imageStyle={{height: 20, width: 20}}
                  imageSource={item?.reply ? Images.edit : Images?.reply}
                />
              )}
          </View>
          {item?.reply && (
            <View
              style={{
                flex: 1,
                marginLeft: 24,
                borderLeftColor: color.gray,
                borderLeftWidth: 2,
                paddingLeft: 8,
                marginVertical: 4,
              }}>
              <Text style={{color: color.black, fontWeight: '800'}}>
                Response from the owner
              </Text>
              <Text style={{color: '#222'}}>{item?.reply}</Text>
            </View>
          )}
        </>
      )}

      {item.id === replayId && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={replayText}
            placeholder="Replay.."
            placeholderTextColor={color.blur_black}
            style={{
              borderBottomColor: isReply ? color.red : color.black,
              borderBottomWidth: 1,
              flex: 1,
              color: color.black,
            }}
            onChangeText={val => setReplayText(val)}
          />
          <FlatButton
            onPress={sendButton}
            containerStyle={{}}
            imageSource={Images.send}
          />
        </View>
      )}
    </View>
  );
   return (
    <>
      <View style={styles.subContainer}>
        <Text style={styles.subContainerHeading}>Customer Feedback</Text>
        <View
          style={{flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
          <Text style={styles.averageRating}>
            {`${calculateAverageRating(catalogDetailsInfo?.rating)} `}
          </Text>
          <View style={commonStyle.flexDirection}>
            {[1, 2, 3, 4, 5].map(res => (
              <Image
                key={res}
                tintColor={
                  convertRatingToPercentage(catalogDetailsInfo?.rating) >= res
                    ? color.gold
                    : color.semi_light_gray
                }
                source={Images.star}
                style={styles.star}
              />
            ))}
          </View>
        </View>
        <View>
          <CustomerFeedback ratingData={catalogDetailsInfo?.rating || '0'} />
        </View>
      </View>
      <View style={styles.subContainer}>
        {userInfo.id &&
          userInfo?.id !== catalogDetailsInfo?.user_id &&
          yourReview.length > 0 && (
            <Text style={styles.subContainerHeading}>Your Review</Text>
          )}
        <FlatList
          scrollEnabled={false}
          data={yourReview}
          renderItem={renderReviewItem}
          keyExtractor={item => item.id}
        />
        <Text style={styles.subContainerHeading}>All Reviews</Text>
        <FlatList
        scrollEnabled={false}
          data={reviewInfo}
          renderItem={renderReviewItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={commonStyle.noRecordFound}>
              No reviews are available for this catalogue.
            </Text>
          }
        />
      </View>
      {userInfo.id &&
        userInfo?.id !== catalogDetailsInfo?.user_id &&
        yourReview.length < 1 && (
          <View style={styles.subContainer}>
            <Text style={styles.subContainerHeading}>Add Review</Text>
            <TextInput
              style={styles.reviewInput}
              placeholderTextColor={color.gray}
              placeholder="Write your review here"
              value={newReview}
              onChangeText={setNewReview}
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Rating:</Text>
              {[1, 2, 3, 4, 5].map(rating => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => setNewRating(rating)}
                  style={styles.ratingButton}>
                  <Image
                    source={Images.star}
                    style={styles.star}
                    tintColor={
                      newRating >= rating ? color.gold : color.semi_light_gray
                    }
                  />
                </TouchableOpacity>
              ))}
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}>{`${newRating}/5`}</Text>
            </View>
            <TouchableOpacity
              style={styles.addReviewButton}
              onPress={editMode ? handleEditReview : handleAddReview}>
              <Text style={styles.addReviewText}>
                {editMode ? 'Update Review' : 'Submit Review'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </>
  );
};

export default CataloguesReviews;

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    backgroundColor: color.light_gray,
  },
  itemImageStyle: {
    borderWidth: 1,
    borderColor: color.gray,
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
  },
  imageContainer: {
    paddingTop: 8,
  },
  imageList: {
    paddingHorizontal: 12,
  },
  image: {
    height: scaleSize(240),
    width: scaleSize(280),
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
  sectionTitle: {
    color: color.black,
    fontWeight: '600',
    fontSize: 18,
    marginTop: 16,
  },
  averageRating: {
    color: color.black,
    fontWeight: '800',
    fontSize: 20,
  },

  reviewContainer: {
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    marginVertical: 8,
    paddingBottom: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth:1,borderColor:'#697565'
  },
  profileName: {
    color: color.black,
    fontWeight: '500',
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  reviewText: {
    color: color.black,
    marginVertical: 4,
    flex: 1,
  },
  reviewActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButtonContainer: {
    marginHorizontal: 4,
  },
  actionButtonImage: {
    height: 19,
    width: 19,
  },
  reviewForm: {
    marginTop: 8,
  },
  formTitle: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: '600',
    color: color.black,
  },
  reviewInput: {
    padding: 8,
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    color: color.black,
    marginVertical: 12,
    textAlignVertical: 'top',
    borderColor: color.semi_light_gray,
  },
  ratingButton: {
    // marginHorizontal: 1,
    borderColor: color.semi_light_gray,
    borderRadius: 50,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingLabel: {
    color: color.black,
    fontSize: 16,
    marginRight: 8,
  },
  addReviewButton: {
    backgroundColor: color.lightRuby,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 8,
  },
  addReviewText: {
    color: color.white,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: color.lightRuby,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: color.lightRuby,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: color.light_gray,
  },
});
