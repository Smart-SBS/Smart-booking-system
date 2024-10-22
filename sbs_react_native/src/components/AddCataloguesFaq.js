import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Header from './Header';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import AddFAQModal from './AddFAQModal';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {deleteFAQ, getData} from '../utils/function';
import {commonStyle} from '../constants/commonStyle';
import {API_ENDPOINTS} from '../api/endpoints';

const AddCataloguesFaq = ({route}) => {
  const token = useSelector(state => state.userInfo?.token);
  const [faqData, setFaqData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditId, setIsEditId] = useState();

  useEffect(() => {
    if (route?.params?.id) {
      fetchFAQ();
    }
  }, [route?.params?.id]);

  const fetchFAQ = async () => {
    try {
      const response = await getData(
        `${API_ENDPOINTS.VENDOR_FAQS}/${route?.params?.id}`,
        token,
      );
      // ${API_ENDPOINTS.VENDOR_FAQS}/${id}
      setFaqData(response?.Faqs || []);
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
    }
  };

  const onDeleteFAQ = async id => {
    try {
      const response = await deleteFAQ(id, token);
      if (response?.message) {
        Alert.alert('', response?.message);
        fetchFAQ();
      } else {
        Alert.alert('', 'Something went wrong');
      }
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
    }
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this FAQ?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            onDeleteFAQ(id);
            // onDeleteImage(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleEditReview = review => {
    setIsEditId(review);
    handleAddReviews();
  };

  const FAQItem = ({item, index}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{`Q ${index + 1}: ${
            item?.question
          }`}</Text>
          <Text style={styles.questionText}>{`Ans: ${item?.answer}`}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <FlatButton
            tintColor={color.lightRuby}
            containerStyle={styles.buttonStyle}
            imageStyle={styles.buttonImage}
            imageSource={Images.edit}
            onPress={() => handleEditReview(item)}
          />
          <FlatButton
            tintColor={color.lightRuby}
            containerStyle={styles.buttonStyle}
            imageStyle={styles.buttonImage}
            imageSource={Images.delete}
            onPress={() => handleDelete(item?.id)}
            // handleAddImage
          />
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => <FAQItem item={item} index={index} />;
  const handleAddReviews = () => setIsModalVisible(res => !res);
  return (
    <View style={styles.container}>
      <Header
        title="My FAQ"
        subTitle={'Add'}
        onRightPress={() => handleAddReviews()}
      />
      <FlatList
        data={faqData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={commonStyle.noRecordFound}>No record found</Text>
        }
      />
      {/* <FlatButton
        tintColor={color.white}
        imageSource={Images.cancel}
        containerStyle={styles?.addButton}
        onPress={handleAddReviews}
        imageStyle={{height: 20, width: 20}}
      /> */}
      <AddFAQModal
        onClose={() => {
          handleAddReviews(), fetchFAQ(), setIsEditId('');
        }}
        isModalVisible={isModalVisible}
        catalog_id={route?.params?.id}
        isEditId={isEditId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa, // Light Gray Background
  },
  itemContainer: {
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 12,
    padding: 12,
  },
  questionContainer: {},
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 4,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    borderColor: color.lightRuby,
    borderWidth: 1,
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
  addButton: {
    position: 'absolute',
    bottom: scaleSize(20),
    right: scaleSize(20),
    padding: scaleSize(15),
    transform: [{rotate: '45deg'}],
    borderRadius: scaleSize(30),
    elevation: 5, // Adds shadow for Android
    shadowColor: color.black, // Shadow color for iOS
    shadowOffset: {width: 0, height: 5}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    backgroundColor: color.lightRuby,
  },
});

export default AddCataloguesFaq;
