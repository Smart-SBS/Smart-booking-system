import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View, Alert} from 'react-native';
import Header from './Header';
import {
  addCatalogImage,
  deleteCatalogImage,
  getGalleryData,
  setPrimaryImage,
} from '../utils/function';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {color} from '../constants/color';
import FlatButton from './FlatButton';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {API_ENDPOINTS} from '../api/endpoints';

const AddCataloguesGallery = ({route}) => {
  const token = useSelector(state => state.userInfo?.token);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    if (route?.params?.id) {
      getGallery();
    }
  }, [route?.params?.id]);

  const getGallery = async () => {
    try {
      const response = await getGalleryData(route?.params?.id, token);
      setGalleryData(response?.data || []);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onSetPrimaryImage = async id => {
    try {
      const response = await setPrimaryImage(id, token);
       Alert.alert(response?.message);
      getGallery();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onDeleteImage = async id => {
    try {
      const response = await deleteCatalogImage(id, token);
       Alert.alert(response?.message);
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
           },
        },
      ],
      {cancelable: true},
    );
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
           },
        },
      ],
      {cancelable: true},
    );
  };

  const handleAddImage = () => {
    launchImageLibrary({}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        try {
          const {uri, fileSize} = response.assets[0];
          if (fileSize <= 2 * 1024 * 1024) {
            let obj = {
              catalog_image: response.assets[0],
              catalog_id: route?.params?.id,
            };
            await addCatalogImage(obj, token);
             getGallery(); // Refresh the gallery after upload
          } else {
            Alert.alert(
              'Image Size Error',
              'The image size must be less than 2 MB.',
            );
          }
        } catch (error) {
          console.log('Upload Error:', error);
        }
      }
    });
  };

  const renderItem = ({item}) => {
    const borderColor =
      item.is_primary_catalog_image === '1' ? color.greenLight : 'transparent';

    return (
      <View style={[styles.imageContainer, {borderColor}]}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: `${API_ENDPOINTS.CATALOGUES_PATH_THUMB}/${item?.image}`,
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
      <Header title="Catalogues Gallery" onRightPress={() => {}} />
      <FlatList
        data={galleryData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <FlatButton
        tintColor={color.white}
        imageSource={Images.cancel}
        containerStyle={styles?.addButton}
        onPress={handleAddImage}
        imageStyle={{height: 20, width: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,
  },
  imageContainer: {
    borderWidth: 2,
    margin: scaleSize(8),
    borderRadius: scaleSize(5),
    padding: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: scaleSize(200),
    borderRadius: scaleSize(5),
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: color.bluePrimary,
    padding: scaleSize(5),
    borderRadius: scaleSize(5),
    marginLeft: scaleSize(5),
  },
  buttonText: {
    color: color.white,
    fontSize: scaleSize(12),
  },
  addButton: {
    position: 'absolute',
    bottom: scaleSize(20),
    right: scaleSize(20),
    padding: scaleSize(15),
    transform: [{rotate: '45deg'}],
    borderRadius: scaleSize(30),
    elevation: 5,
    shadowColor: color.black, // Adds shadow on iOS
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: color.lightRuby,
  },
});

export default AddCataloguesGallery;
