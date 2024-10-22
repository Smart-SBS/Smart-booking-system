import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import Header from './Header';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import FlatButton from './FlatButton';
import {scaleSize} from '../utils/dimensions';
import {
  addShopGalleryImage,
  deleteShopImage,
  getShopGalleryData,
  setShopPrimaryImage,
} from '../utils/function';
import {API_ENDPOINTS} from '../api/endpoints';

const AddShopGallery = ({route}) => {
  const [galleryData, setGalleryData] = useState([]);

  const token = useSelector(state => state.userInfo.token);

  useEffect(() => {
    if (route?.params?.id) {
      getGallery();
    }
  }, [route?.params?.id]);

  const getGallery = async () => {
    try {
      const response = await getShopGalleryData(route?.params?.id, token);
      setGalleryData(response?.data || []);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddImage = async () => {
    launchImageLibrary(
      {selectionLimit: 0}, // 0 allows multiple selections
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
        } else {
          try {
            const images = response.assets;
            const validImages = images.filter(
              image => image.fileSize <= 2 * 1024 * 1024,
            );

            if (validImages.length > 0) {
 
              for (const image of validImages) {
                const obj = {
                  shop_image: image,
                  shop_id: route?.params?.id,
                };
                const uploadResponse = await addShopGalleryImage(obj, token);
                Alert.alert(uploadResponse?.message);
              }

              getGallery(); // Refresh the gallery after upload
              Alert.alert('Images Uploaded Successfully');
            } else {
              Alert.alert(
                'Image Size Error',
                'All selected images must be less than 2 MB.',
              );
            }
          } catch (error) {
            console.error('Upload Error:', error.message);
          }
        }
      },
    );
  };

  const onDeleteImage = async id => {
    try {
      const response = await deleteShopImage(id, token);
      console.log(response);
      Alert.alert('', response?.message);
      getGallery();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSetPrimary = id => {
    Alert.alert(
      'Set as Primary',
      'Are you sure you want to set this image as the primary one?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            onSetPrimaryImage(id);
            console.log(`Set primary image with id: ${id}`);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onSetPrimaryImage = async id => {
    try {
      const response = await setShopPrimaryImage(id, token);
       Alert.alert('', response?.message);
      getGallery();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            onDeleteImage(id);
            console.log(`Delete image with id: ${id}`);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}) => {
    const borderColor =
      item.is_primary_shop_image === '1' ? color.greenLight : 'transparent';
    return (
      <View style={[styles.imageContainer, {borderColor}]}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: `${API_ENDPOINTS.VENDOR_SHOP_IMAGE_THUMB}/${item?.image}`,
          }}
        />
        <View style={styles.buttonContainer}>
          <FlatButton
            tintColor={color.white}
            imageSource={Images.star}
            textStyle={styles.buttonText}
            containerStyle={styles.button}
            onPress={() => handleSetPrimary(item.id)}
          />
          <FlatButton
            tintColor={color.white}
            textStyle={styles.buttonText}
            imageSource={Images.delete}
            containerStyle={{
              ...styles.button,
              backgroundColor: color.lightRuby,
            }}
            onPress={() => handleDelete(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Shops Gallery"
        subTitle={'Add'}
        onRightPress={() => handleAddImage()}
      />
      <FlatList
        data={galleryData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      {/* <FlatButton
        tintColor={color.white}
        imageSource={Images.cancel}
        containerStyle={styles.addButton}
        onPress={handleAddImage}
        imageStyle={styles.buttonImage}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,
  },
  buttonContainer: {
    top: 10,
    right: 10,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  addButton: {
    padding: scaleSize(15),
    borderRadius: scaleSize(30),
    backgroundColor: color.lightRuby,
    elevation: 10,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    bottom: scaleSize(20),
    right: scaleSize(20),
  },
  buttonImage: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    padding: 3,
    borderWidth: 2,
    position: 'relative',
    margin: scaleSize(8),
    borderRadius: scaleSize(5),
  },
  image: {
    width: '100%',
    height: scaleSize(200),
    borderRadius: scaleSize(5),
  },
  buttonText: {
    color: color.white,
    fontSize: scaleSize(12),
  },
  button: {
    backgroundColor: color.bluePrimary,
    padding: scaleSize(5),
    borderRadius: scaleSize(5),
    marginLeft: scaleSize(5),
  },
});

export default AddShopGallery;
