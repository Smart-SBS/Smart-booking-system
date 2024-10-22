import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Theme from '../theme/Theme';
import Auth from '../components/Auth';
import {color} from '../constants/color';
import {string} from '../constants/string';
import {Images} from '../constants/assets';
import FlatButton from '../components/FlatButton';
import SearchNear from '../components/SearchNear';
import {commonStyle} from '../constants/commonStyle';
import TopLocationList from '../components/TopLocationList';
import {
  fetchLocationData,
  fetchPopularLocationData,
} from '../redux/location/locationApi';
import {API_ENDPOINTS} from '../api/endpoints';
import Catalogues from '../components/Catalogues';
import {fetchCategoryData} from '../redux/category/categoryApi';
import {fetchCataloguesData} from '../redux/catalogues/cataloguesApi';
import dimensions from '../utils/dimensions';
import {addItemInCatalog, deleteWishListing, getData} from '../utils/function';
import {fetchWishList} from '../redux/wishlist/wishlistapi';
import {fetchPopularShop} from '../redux/shop/shopApi';
import {PopularShopsCard} from '../components/PopularShopsCard';

const TopLocation = React.memo(() => (
  <View style={styles.topListingContainer}>
    <Text style={styles.topListingHeading}>
      TOP <Text style={styles.highlightedText}>LOCATIONS</Text>
    </Text>
    <Text style={styles.topListingSubHeading}>Explore Your Dream Places</Text>
    <TopLocationList />
  </View>
));

const PopularListing = React.memo(data => {
  const {data: info, token} = useSelector(state => state.userInfo);
  const wishlist = useSelector(state => state?.wishList?.data);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (info.id && info.role_id != '3') {
      const data = {
        id: info.id,
        token: token,
      };
      dispatch(fetchWishList(data));
    }
  }, [info.id]);

  const onAddWishListing = async (item, isWishList) => {
    try {
      if (!info.id) {
        Alert.alert(
          '',
          'You need to login from your user account to make a wishlist.',
        );
        return;
      }
      const obj = {
        catalog_id: item.id,
        user_id: info?.id,
      };

      if (isWishList) {
        // Find the wishlist item to delete
        const wishlistItem = wishlist?.find(res => res.catalog_id === item.id);

        if (wishlistItem) {
          await deleteWishListing(wishlistItem.id, token);
          console.log('Wishlist item deleted successfully');
        }
      } else {
        const response = await addItemInCatalog(
          API_ENDPOINTS.ADD_WISHLIST,
          obj,
          token,
        );
        // await getWishListing(); // Ensure the wishlist is updated after addition
        console.log('Wishlist item added successfully:', response);
      }
      const data = {
        id: info.id,
        token: token,
      };
      dispatch(fetchWishList(data));
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  return (
    <View style={styles.popularListingContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
        }}>
        <View>
          <Text style={styles.popularListingHeading}>
            POPULAR <Text style={styles.highlightedText}>CATALOGUES</Text>
          </Text>
          <Text style={styles.popularListingSubHeading}>
            What are you interested in?
          </Text>
        </View>
        <FlatButton
          textStyle={{color: color.lightRuby}}
          onPress={() => navigation.navigate('PopularCatalogues')}
          text={'View All'}
        />
      </View>
      <View style={{backgroundColor: '#ECECEC'}}>
        <FlatList
          data={data.data}
          showsHorizontalScrollIndicator={false}
          horizontal
          key={item => item.business_id.toString()}
          contentContainerStyle={{marginTop: 12, marginBottom: 24}}
          renderItem={({item}) => {
            const isWishList = wishlist?.some(
              res => res?.catalog_id == item.id,
            );
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
                isWishList={isWishList}
                onWishlistPress={() => onAddWishListing(item, isWishList)}
              />
            );
          }}
        />
      </View>
    </View>
  );
});

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {data} = useSelector(state => state.cataloguesData);
  const shopData = useSelector(state => state?.shop?.data);
  useEffect(() => {
    dispatch(fetchLocationData());
    dispatch(fetchCategoryData());
    dispatch(fetchPopularLocationData());
    dispatch(fetchPopularShop());
    dispatch(fetchCataloguesData());
  }, [dispatch]); // Ensure `dispatch` is in the dependency array
  return (
    <Theme>
      <KeyboardAvoidingView
        style={commonStyle.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Header navigation={navigation} />
          <View style={styles.searchItemsWrapper}>
            <Text style={styles.findNearbyText}>{string.nearestText}</Text>
            <SearchNear />
          </View>
          <TopLocation />
          <PopularShopsCard data={shopData} />

          <PopularListing data={data?.Catalog} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Theme>
  );
};

const Header = ({navigation}) => {
  const userInfo = useSelector(state => state.userInfo.data);
  const [isSignIN, setIsSignIN] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const onSignInPress = () => {
    setIsUser(true);
    setIsSignIN(true);
  };
  return (
    <View style={styles.header}>
      <View style={commonStyle.rowCenter}>
        <View style={{width: '20%'}}>
          <FlatButton
            tintColor={color.white}
            imageSource={Images.menu}
            imageStyle={commonStyle.imageStyle}
            onPress={() => navigation.toggleDrawer()}
            containerStyle={{justifyContent: 'start'}}
          />
        </View>
        <View style={styles.titleContainer}>
          <Image
            resizeMode="contain"
            source={Images.earth}
            style={styles.imageStyle}
          />
        </View>
        <View style={{width: '20%', alignItems: 'flex-end'}}>
          {userInfo.id ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={
                  userInfo?.profile_pic
                    ? {
                        uri: `${API_ENDPOINTS?.PROFILE_PATH}/${userInfo?.profile_pic}`,
                      }
                    : Images.person
                }
              />
            </TouchableOpacity>
          ) : (
            <>
              <FlatButton text={'Sign In'} onPress={() => onSignInPress()} />
            </>
          )}
        </View>
      </View>
      <Auth
        isUser={isUser}
        isVisible={isSignIN}
        onCancel={() => {
          setIsSignIN(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color.blur_black,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: color?.blur,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  titleText: {
    color: color.white,
    marginLeft: 10,
    fontSize: 19,
    fontWeight: '600',
  },
  profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 5,
    borderRadius: 150,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  imageStyle: {
    height: 50,
    width: 160,
  },
  searchItemsWrapper: {
    marginTop: 30,
    marginHorizontal: 12,
  },
  findNearbyText: {
    textAlign: 'center',
    fontSize: 18,
    color: color.white,
    marginBottom: 8,
  },
  topListingContainer: {
    backgroundColor: color.white,
    paddingTop: 30,
    marginTop: 24,
    zIndex: -1,
  },
  topListingHeading: {
    color: color.dark_charcoal,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  highlightedText: {
    color: color.black,
  },
  topListingSubHeading: {
    marginTop: 8,
    textAlign: 'center',
    color: color.gray,
    fontSize: 12,
  },
  popularListingContainer: {
    backgroundColor: '#ECECEC',
    marginBottom: 40,
    paddingTop: 24,
  },
  popularListingHeading: {
    color: color.black,
    fontSize: 20,
    fontWeight: '600',
  },
  popularListingSubHeading: {
    marginTop: 4,
    color: color.gray,
    fontSize: 12,
  },
});

export default Home;
