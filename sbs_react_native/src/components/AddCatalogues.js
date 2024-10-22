import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator, 
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import InputBox from './InputBox';
import FlatButton from './FlatButton';
import {color} from '../constants/color';
import {Images} from '../constants/assets';
import {scaleSize} from '../utils/dimensions';
import {
  addNewCatalogues,
  editCatalog,
  getCatalogDetails,
} from '../utils/function';

const ImageUploader = ({imageUri, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.uploadContainer}>
    {imageUri ? (
      <Image style={styles.uploadedImage} source={{uri: imageUri}} />
    ) : (
      <>
        <Image source={Images.gallery} style={styles.galleryIcon} />
        <View style={styles.uploadTextContainer}>
          <Text style={styles.uploadInstruction}>
            Upload a file{' '}
            <Text style={styles.uploadInstructionHighlight}>
              or drag and drop
            </Text>
          </Text>
          <Text style={styles.uploadDetails}>PNG, JPG, GIF up to 10MB</Text>
        </View>
      </>
    )}
  </TouchableOpacity>
);

const AddCatalogues = ({isModalVisible, onClose, shopId, isEditId}) => {
  const token = useSelector(state => state.userInfo.token);

  const [imageUri, setImageUri] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [socialTitle, setSocialTitle] = useState('');
  const [seoSchema, setSeoSchema] = useState('');
  const [socialDescription, setSocialDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditId) {
      fetchCataloguesInfo();
    }
  }, [isEditId]);

  const fetchCataloguesInfo = async () => {
    try {
      const response = await getCatalogDetails(isEditId, token);
      const data = response.data;
      setItemTitle(data.item_title || '');
      setPrice(data.price || '');
      setSalePrice(data.sale_price || '');
      setItemDescription(data.item_description || '');
      setFocusKeyword(data.focus_keyphrase || '');
      setSeoTitle(data.seo_title || '');
      setMetaDescription(data.meta_description || '');
      setCanonicalUrl(data.canonical_url || '');
      setSocialTitle(data.social_title || '');
      setSeoSchema(data.seo_schema || '');
      setSocialDescription(data.social_description || '');
      setImageUri(data.social_image || '');
    } catch (error) {
      console.error('Error fetching catalog info:', error);
      setError('Failed to fetch catalog details. Please try again.');
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage);
      }
    });
  };

  const onAddCatalogues = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const catalogData = {
      item_title: itemTitle,
      item_description: itemDescription,
      price,
      sale_price: salePrice,
      focus_keyphrase: focusKeyword,
      seo_title: seoTitle,
      meta_description: metaDescription,
      canonical_url: canonicalUrl,
      seo_schema: seoSchema,
      social_title: socialTitle,
      social_description: socialDescription,
      social_image: imageUri,
      shop_id: shopId,
    };

    try {
      const response = isEditId
        ? await editCatalog(isEditId, catalogData, token)
        : await addNewCatalogues(catalogData, token);

      setSuccess(`Catalog successfully ${isEditId ? 'update' : 'added'}!`);
      // Alert(`Catalog successfully ${isEditId ? 'update' : 'added'}!`)
      onClose(); // Close the modal on success
    } catch (error) {
      setError('Failed to add catalog. Please try again.');
      console.error('Error adding catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <FlatButton
            imageStyle={styles.closeButtonImage}
            onPress={onClose}
            imageSource={Images.cancel}
            tintColor={color.white}
            containerStyle={styles.closeButton}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{`${
              isEditId ? 'Update' : 'Add New'
            } Catalogues`}</Text>
            <InputBox
              placeholder="Item Title"
              value={itemTitle}
              onChangeText={setItemTitle}
            />
            <InputBox
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <InputBox
              placeholder="Sale Price"
              value={salePrice}
              onChangeText={setSalePrice}
              keyboardType="numeric"
            />
            <InputBox
              placeholder="Item Descriptions"
              value={itemDescription}
              onChangeText={setItemDescription}
              style={{maxHeight: scaleSize(150)}}
              inputStyle={{maxHeight: scaleSize(150)}}
              multiline
            />
            <Text
              style={{
                color: color.black,
                fontSize: 18,
                fontWeight: '600',
                marginTop: scaleSize(8),
              }}>
              SEO (Optional)
            </Text>
            <InputBox
              placeholder="Focus Keyword"
              value={focusKeyword}
              onChangeText={setFocusKeyword}
            />
            <InputBox
              placeholder="SEO Title"
              value={seoTitle}
              onChangeText={setSeoTitle}
            />
            <InputBox
              placeholder="Meta Description"
              value={metaDescription}
              onChangeText={setMetaDescription}
            />
            <InputBox
              placeholder="Canonical URL"
              value={canonicalUrl}
              onChangeText={setCanonicalUrl}
            />
            <InputBox
              placeholder="Social Title"
              value={socialTitle}
              onChangeText={setSocialTitle}
            />
            <InputBox
              placeholder="SEO Schema"
              value={seoSchema}
              onChangeText={setSeoSchema}
            />
            <InputBox
              placeholder="Social Description"
              value={socialDescription}
              onChangeText={setSocialDescription}
            />
            <ImageUploader imageUri={imageUri?.uri} onPress={openGallery} />
            {loading && (
              <ActivityIndicator size="large" color={color.primary} />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
            <FlatButton
              onPress={onAddCatalogues}
              text={isEditId ? 'Update' : 'Add'}
              containerStyle={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.blur_black,
    alignItems: 'center',
    paddingVertical: 24,
  },
  closeButtonImage: {
    height: 20,
    width: 20,
  },
  modalTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: color.black,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingBottom: 8,
  },
  modalContent: {
    backgroundColor: color.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  uploadContainer: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    height: 95,
    width: '98%',
  },
  galleryIcon: {
    height: 30,
    width: 30,
  },
  uploadTextContainer: {
    width: '100%',
    marginHorizontal: 12,
  },
  uploadInstruction: {
    color: color.black,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
  uploadInstructionHighlight: {
    color: color.black,
    fontSize: 12,
  },
  uploadDetails: {
    color: color.eightEightEight,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
  saveButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(8),
    marginTop: scaleSize(12),
  },
  errorText: {
    color: color.red,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  successText: {
    color: color.green,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default AddCatalogues;
