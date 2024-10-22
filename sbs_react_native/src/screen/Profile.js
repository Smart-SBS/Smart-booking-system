import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

import Header from '../components/Header';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import InputBox from '../components/InputBox';
import {empty} from '../redux/auth/authSlice';
import {API_ENDPOINTS} from '../api/endpoints';
import {logout} from '../redux/user/userSlice';
import {API_BASE_URL} from '../config/apiConfig';
import FlatButton from '../components/FlatButton';
import {fetchUserApiData} from '../redux/user/userApi';
import dimensions, {scaleSize} from '../utils/dimensions';
import {addProfileImage, updateProfile} from '../utils/function';

// DetailRow Component
const DetailRow = ({icon, detail}) => (
  <View style={styles.detailRow}>
    <Image tintColor={color.lightRuby} source={icon} style={styles.icon} />
    <Text style={styles.detail}>{detail}</Text>
  </View>
);

// Profile Component
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo?.data);

  const token = useSelector(state => state.userInfo.token);
  const [isEdit, setIsEdit] = useState(false);
  const [isImage, setIsImage] = useState();

  const [formData, setFormData] = useState({
    firstname: userInfo?.firstname || '',
    lastname: userInfo?.lastname || '',
    email: userInfo?.email || '',
    contact_no: userInfo?.contact_no || '',
  });
  const vendorTab = ['MyBusinesses', 'MyShops', 'Payment', 'Invoices'];
  const userTab=["Listing"]
  const userType = userInfo?.role_id == '3' ? 'vendor' : 'user';
  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({...prev, firstname: userInfo?.firstname}));
      setFormData(prev => ({...prev, lastname: userInfo?.lastname}));
      setFormData(prev => ({...prev, email: userInfo?.email}));
      setFormData(prev => ({...prev, contact_no: userInfo?.contact_no}));
    }
  }, [userInfo]);

  const toggleEditMode = () => {
    if (isEdit) {
      onUpdateProfile();
    }
    setIsEdit(prev => !prev);
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authentication');
      const data = jsonValue ? JSON.parse(jsonValue) : null;
      if (data) {
         await dispatch(fetchUserApiData(data));
      }
    } catch (error) {
      console.error('Error reading value from AsyncStorage', error);
      setIsLoading(false);
    }
  };
  // Update Profile
  const onUpdateProfile = async () => {
    try {
      const response = await updateProfile(formData, userType, token);

      if (response.message) {
        fetchData();
        Alert.alert('', response.message);
      }
    } catch (error) {
      console.error('Error Message:', error.message);
    }
  };

  // Log out function
  const logOut = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authentication');
              dispatch(logout());
              dispatch(empty());
              navigation.navigate('Home');
            } catch (error) {
               Alert.alert(
                'Logout Failed',
                'Something went wrong while logging out.',
              );
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const listData = [
    {name: 'Dashboard', navigation: 'Dashboard', source: Images.dashboard},
    {
      name: 'My Businesses',
      navigation: 'MyBusinesses',
      source: Images.business,
    },
    {name: 'My Shops', navigation: 'MyShops', source: Images.shop},
    {name: 'My Order', navigation: 'MyOrder', source: Images.order},
    {name: 'Payment', navigation: 'Payment', source: Images.payment},
    {
      name: 'Favorite Listing',
      navigation: 'Listing',
      source: Images.fill_heart,
    },

    {name: 'Invoices', navigation: 'Invoices', source: Images.invoices},
    {
      name: 'Change Password',
      navigation: 'ChangePassword',
      source: Images.password,
    },
    {name: 'Log Out', navigation: 'Dashboard', source: Images.logout},
  ];

  const profileUpdate = async image => {
    try {
      let temp = {
        profile_pic: image,
      };
      const response = await addProfileImage(
        `${API_BASE_URL}/ma-update-${userType}-profile-pic/${userInfo?.id}`,
        temp,
        token,
      );
      if (response.message) {
        fetchData();
        Alert.alert('', response.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      launchImageLibrary(options, response => {
        if (response.assets) {
          setIsImage(response.assets[0]);
          profileUpdate(response.assets[0]);
        } else if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorCode);
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const onLeftPress = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      navigation.navigate("Home");
    }
   };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onLeftPress={() => onLeftPress()}
        title={'Profile Details'}
        subTitle={isEdit ? 'Save' : 'Edit'}
        onRightPress={toggleEditMode}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => openGallery()}
            style={styles.imageContainer}>
            <Image
              source={
                isImage?.uri
                  ? {uri: isImage?.uri}
                  : userInfo?.profile_pic
                  ? {
                      uri: `${API_ENDPOINTS?.PROFILE_PATH}/${userInfo?.profile_pic}`,
                    }
                  : Images.person
              }
              style={styles.profileImage}
            />
             <View style={styles.editIconContainer}>
              <Image source={Images.edit} style={styles.editIcon} />
            </View>
           </TouchableOpacity>
          {!isEdit ? (
            <>
              <Text style={styles.name}>
                {`${userInfo?.firstname} ${userInfo?.lastname}`}
              </Text>
              <View style={styles.detailsContainer}>
                <DetailRow icon={Images.person} detail={userInfo?.role} />
                <DetailRow icon={Images.email} detail={userInfo?.email} />
                <DetailRow icon={Images.call} detail={userInfo?.contact_no} />
              </View>
            </>
          ) : (
            <View style={styles.editContainer}>
              <InputBox
                placeholder={'First Name'}
                value={formData.firstname}
                onChangeText={text =>
                  setFormData(prev => ({...prev, firstname: text}))
                }
              />
              <InputBox
                placeholder={'Last Name'}
                value={formData.lastname}
                onChangeText={text =>
                  setFormData(prev => ({...prev, lastname: text}))
                }
              />
              {/* <InputBox
                placeholder={'Email'}
                value={formData.email}
                onChangeText={text =>
                  setFormData(prev => ({...prev, email: text}))
                }
              /> */}
              <InputBox
                placeholder={'Contact Number'}
                value={formData.contact_no}
                onChangeText={text =>
                  setFormData(prev => ({...prev, contact_no: text}))
                }
              />
            </View>
          )}
        </View>
        {!isEdit && (
          <View style={styles.listContainer}>
            <FlatList
              scrollEnabled={false}
              data={
                userInfo?.role == 'User'
                  ? listData.filter(res => !vendorTab.includes(res.navigation))
                  : listData.filter(res => !userTab.includes(res.navigation))
              }
              renderItem={({item}) => (
                <FlatButton
                  text={item.name}
                  onPress={() => {
                    item.name === 'Log Out'
                      ? logOut()
                      : navigation.navigate(item.navigation);
                  }}
                  textStyle={styles.listItemText}
                  imageSource={item.source}
                  tintColor={color.lightRuby}
                  containerStyle={styles.listItemContainer}
                />
              )}
              keyExtractor={item => item.name}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profileContainer: {
    paddingTop: 16,
    paddingBottom: 12,
    alignItems: 'center',
    // padding: 16,
  },
  imageContainer: {
    padding: 4,
    borderWidth: 5,
    marginBottom: 12,
    borderRadius: 100,
    borderColor: color.lightRuby,
  },
  profileImage: {
    width: dimensions.width * 0.3,
    height: dimensions.width * 0.3,
    borderRadius: dimensions.width * 0.15,
  },
  editIconContainer: {
    right: 0,
    bottom: 10,
    padding: 3,
    borderWidth: 5,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: color.white,
    borderColor: color.lightRuby,
  },
  editIcon: {
    height: 18,
    width: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: color.black,
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailRow: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: 16,
    color: color.dark_charcoal,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 18,
  },
  editContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  updateButtonContainer: {
    marginTop: scaleSize(24),
    borderRadius: scaleSize(12),
    paddingVertical: scaleSize(16),
    backgroundColor: color.lightRuby,
  },
  listContainer: {
    flex: 1,
    // marginTop: 12,
    // backgroundColor:'pink',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    borderTopColor: color.gray,
  },
  listItemText: {
    color: color.black,
    marginLeft: 16,
  },
  listItemContainer: {
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    borderColor: color.lightRuby,
  },
});

export default Profile;
