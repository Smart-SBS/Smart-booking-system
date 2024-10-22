import moment from 'moment';
import apiClient from '../api/apiClient';
import {API_ENDPOINTS} from '../api/endpoints';
import axios from 'axios';
import {API_BASE_URL} from '../config/apiConfig';
import {Alert} from 'react-native';

export function timeAgo(date) {
  const now = moment();
  const then = moment(date);

  const minutesAgo = now.diff(then, 'minutes');
  const hoursAgo = now.diff(then, 'hours');
  const daysAgo = now.diff(then, 'days');

  if (daysAgo > 0) {
    return `${daysAgo} Day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} Hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} Minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

export const catalogDetails = async (id, token) => {
  try {
    const response = await apiClient.get(`ma-catalog-details/${id}`);
    return {success: true, data: response.data};
  } catch (error) {
    console.error('Catalog details', error.message, error.response?.data);

    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const catalogDetailsImages = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_CATALOG_GALLERY}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {success: true, data: response.data};
  } catch (error) {
    console.error('catalogDetailsImages', error.message, error.response?.data);

    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const catalogDetailsReviews = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_REVIEWS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {success: true, data: response.data};
  } catch (error) {
    console.error('catalogDetailsReviews', error.message, error.response?.data);

    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const catalogDetailsReviewsAdd = async (reviewInfo, token) => {
  try {
    const apiUrl = 'https://sbs.smarttesting.in/api/ma-add-review';
    try {
      const response = await axios.post(apiUrl, reviewInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [
          data => {
            const params = new URLSearchParams();
            for (const key in data) {
              params.append(key, data[key]);
            }
            return params.toString();
          },
        ],
      });
      return response.data;
    } catch (error) {
      console.log(
        'error.response.data.message || error?.message',
        error.response.data.message || error?.message,
      );
      // Alert.alert('', error.response.data.message || error?.message);
    }
  } catch (error) {
    console.error(
      'catalogDetailsReviewsAdd',
      error.message,
      error.response?.data,
    );
  }
};

export const catalogDetailsEditReviews = async (id, obj, token) => {
  const apiUrl = `https://sbs.smarttesting.in/api/ma-edit-review/${id}`;
  try {
    const response = await axios.post(apiUrl, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        data => {
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          return params.toString();
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error:--',
      error.response.data,
      error.response ? error.response.data : error.message,
    );
  }
};

export const catalogDetailsDeleteReviews = async (id, obj, token) => {
  const apiUrl = `https://sbs.smarttesting.in/api/ma-delete-review/${id}`;

  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: obj, // Include the data as the second argument for DELETE requests
    });

    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
    // Optionally, rethrow the error if you want to handle it further up
    throw error;
  }
};

export const resetPassword = async (obj, token) => {
  const apiUrl = `https://sbs.smarttesting.in/api/ma-change-vendor-password`;

  try {
    const response = await axios.post(apiUrl, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const myBusinesses = async token => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_BUSINESS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.business};
  } catch (error) {
    console.error('myBusinesses', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

// ACTIVE_BUSINESS_TYPES
export const activeBusinessesType = async token => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.ACTIVE_BUSINESS_TYPES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.active_business_types};
  } catch (error) {
    console.error('activeBusinessesType', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const activeCategoriesType = async token => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.ACTIVE_CATEGORIES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.active_category};
  } catch (error) {
    console.error('ACTIVE_CATEGORIES', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const activeSubCategoriesType = async (token, ID) => {
  console.log(token, ID);
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVE_SUBCATEGORIES}/${ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.active_subcategory};
  } catch (error) {
    console.error('ACTIVE_SUBCATEGORIES', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const dashboardRating = async token => {
  console.log(token);
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_REVIEWS_COUNT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.Review};
  } catch (error) {
    console.error('VENDOR_REVIEWS_COUNT', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const vendorShops = async token => {
  console.log(token);
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.VENDOR_SHOPS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.shops};
  } catch (error) {
    console.error('VENDOR_SHOPS', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const activeStates = async token => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.ACTIVE_STATES}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.active_states};
  } catch (error) {
    console.error('ACTIVE_STATES', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const activeCity = async (token, id) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVE_CITIES}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.active_cities};
  } catch (error) {
    console.error('ACTIVE_CITIES', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const activeAreas = async (token, id) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVE_AREAS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.active_areas};
  } catch (error) {
    console.error('ACTIVE_AREAS', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const businessList = async token => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVE_VENDOR_BUSINESSES}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.active_business};
  } catch (error) {
    console.error(
      'ACTIVE_VENDOR_BUSINESSES',
      error.message,
      error.response?.data,
    );
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const addNewShops = async (obj, token) => {
  try {
    console.log('obj', obj);
    const formData = new FormData();
    formData.append('shop_name', obj.shop_name);
    formData.append('shop_email', obj.shop_email);

    formData.append('shop_contact_person', obj.shop_contact_person);
    formData.append('shop_contact', obj.shop_contact);
    formData.append('shop_onboarding_date', obj.shop_onboarding_date);
    formData.append('shop_overview', obj.shop_overview);
    formData.append('area_id', obj.area_id);
    formData.append('business_id', obj.business_id);
    formData.append('canonical_url', obj.canonical_url);

    formData.append('focus_keyphrase', obj.focus_keyphrase);
    formData.append('seo_title', obj.seo_title);
    formData.append('seo_schema', obj.seo_schema);
    formData.append('social_title', obj.social_title);
    formData.append('meta_description', obj.meta_description);
    formData.append('social_description', obj.social_description);

    if (obj.social_image) {
      const {uri, fileName, type} = obj.social_image;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('social_image', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_SHOPS}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, API_ENDPOINTS?.ADD_SHOPS);
  }
};

export const deleteShops = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_SHOPS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error.message;
  }
};

export const editShops = async (id, obj, token) => {
  try {
    const formData = new FormData();
    formData.append('shop_name', obj.shop_name);
    formData.append('shop_email', obj.shop_email);

    formData.append('shop_contact_person', obj.shop_contact_person);
    formData.append('shop_contact', obj.shop_contact);
    formData.append('shop_onboarding_date', obj.shop_onboarding_date);
    formData.append('shop_overview', obj.shop_overview);
    formData.append('area_id', obj.area_id);
    formData.append('business_id', obj.business_id);
    formData.append('canonical_url', obj.canonical_url || '');

    formData.append('focus_keyphrase', obj.focus_keyphrase);
    formData.append('seo_title', obj.seo_title);
    formData.append('seo_schema', obj.seo_schema);
    formData.append('social_title', obj.social_title);
    formData.append('meta_description', obj.meta_description);
    formData.append('social_description', obj.social_description);

    if (obj.social_image) {
      const {uri, fileName, type} = obj.social_image;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('social_image', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.EDIT_SHOPS}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'EDIT_SHOPS');
  }
};

export const addBusiness = async (businessData, token) => {
  try {
    const formData = new FormData();
    formData.append('business_name', businessData.business_name);
    formData.append('business_email', businessData.business_email);
    formData.append('business_contact', businessData.business_contact);
    formData.append('business_type_id', businessData.business_type_id);
    formData.append('onboarding_date', businessData.onboarding_date);
    formData.append('business_overview', businessData.business_overview);
    formData.append('subcategory_id', businessData.subcategory_id);

    if (businessData.business_logo) {
      const {uri, fileName, type} = businessData.business_logo;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('business_logo', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_BUSINESS}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    console.error('Error Message:', error.message);
  }
};

// export const deleteBusinessItem = async (id, token) => {
//   try {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${API_ENDPOINTS.DELETE_BUSINESS}/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('DELETE_BUSINESS', error.message, error.response?.data);
//   }
// };

export const editBusiness = async (id, businessData, token, oldImage) => {
  try {
    const formData = new FormData();
    formData.append('business_name', businessData.business_name);
    formData.append('business_email', businessData.business_email);
    formData.append('business_contact', businessData.business_contact);
    formData.append('business_type_id', businessData.business_type_id);
    formData.append('onboarding_date', businessData.onboarding_date);
    formData.append('business_overview', businessData.business_overview);
    formData.append('subcategory_id', businessData.subcategory_id);

    if (businessData?.business_logo?.uri) {
      const {uri, fileName, type} = businessData.business_logo;
      const filename = fileName || uri?.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('business_logo', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    } else {
      formData.append('old_business_logo', oldImage);
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.EDIT_BUSINESS}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error EDIT_BUSINESS:', error.message);
  }
};

export const vendorDetailsBusiness = async (id, token) => {
  try {
    if (!id) {
      return false;
    }
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_DETAIL_BUSINESS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.business};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const vendorDetailsShops = async (id, token) => {
  try {
    if (!id) {
      return false;
    }
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_DETAIL_SHOPS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.shops};
  } catch (error) {
    console.error('VENDOR_DETAIL_SHOPS', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const getCatalog = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.CATALOG_LIST}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.Catalog};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const addNewCatalogues = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('item_title', obj.item_title);
    formData.append('item_description', obj.item_description);
    formData.append('price', obj.price);
    formData.append('sale_price', obj.sale_price);
    formData.append('focus_keyphrase', obj.focus_keyphrase);
    formData.append('seo_title', obj.seo_title);
    formData.append('meta_description', obj.meta_description);

    formData.append('canonical_url', obj.canonical_url);
    formData.append('seo_schema', obj.seo_schema);
    formData.append('social_title', obj.social_title);
    formData.append('shop_id', obj.shop_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_CATALOG}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'ADD_CATALOG');
  }
};

export const getCatalogDetails = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.VENDOR_DETAIL_CATALOG}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.Catalog[0]};
  } catch (error) {
    console.error('VENDOR_DETAIL_CATALOG', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const editCatalog = async (id, obj, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.VENDOR_EDIT_CATALOG}/${id}`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [
          data => {
            const params = new URLSearchParams();
            for (const key in data) {
              params.append(key, data[key]);
            }
            return params.toString();
          },
        ],
      },
    );
    return response.data;
  } catch (error) {
    console.error('EDIT_BUSINESS', error.message, error.response?.data);
  }
};

export const deleteCatalog = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_CATALOG}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('DELETE_CATALOG', error.message, error.response?.data);
  }
};

export const getGalleryData = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.CATALOG_GALLERY}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.gallery};
  } catch (error) {
    console.error('CATALOG_GALLERY', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const setPrimaryImage = async (id, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_ENDPOINTS.SET_CATALOG_PRIMARY_IMAGE}/${id}`,
      null, // No request body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error setting primary image:',
      error.response ? error.response.data : error.message,
    );
  }
};

export const deleteCatalogImage = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_CATALOG_IMAGE}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('DELETE_CATALOG_IMAGE', error.message, error.response?.data);
  }
};

export const addCatalogImage = async (businessData, token) => {
  try {
    const formData = new FormData();
    formData.append('catalog_id', businessData.catalog_id);

    if (businessData.catalog_image) {
      const {uri, fileName, type} = businessData.catalog_image;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('catalog_image[]', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_CATALOG_IMAGES}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'ADD_CATALOG_IMAGES');
  }
};

export const addShopGalleryImage = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('shop_id', obj.shop_id);

    if (obj.shop_image) {
      const {uri, fileName, type} = obj.shop_image;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('shop_image', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_GALLERY_IMAGES}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add image:', response.data);
      throw new Error('Failed to add image');
    }
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const getShopGalleryData = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.SHOP_GALLERY}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.gallery};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const setShopPrimaryImage = async (id, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_ENDPOINTS.SET_SHOP_PRIMARY_IMAGE}/${id}`,
      null, // No request body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error setting primary image:',
      error.response ? error.response.data : error.message,
    );
  }
};

export const deleteShopImage = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_GALLERY_IMAGE}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('DELETE_GALLERY_IMAGE', error.message, error.response?.data);
  }
};

export const getSpecialOffers = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.SPECIAL_OFFERS_LIST}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.SpecialOffers};
  } catch (error) {
    console.error('SPECIAL_OFFERS_LIST', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const editShopsOffers = async (id, obj, token) => {
  try {
    const formData = new FormData();
    formData.append('offer_description', obj.offer_description);
    formData.append('offer_validity_start_date', obj.offer_validity_start_date);
    formData.append('offer_validity_end_date', obj.offer_validity_end_date);
    formData.append('offer_type', obj.offer_type);
    formData.append('offer_amount', obj.offer_amount);
    formData.append('offer_title', obj.offer_title);
    formData.append('offer_amount', obj.offer_amount);
    formData.append('shop_id', obj.shop_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.EDIT_SPECIAL_OFFERS}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    console.error('Error Message:', error.message);
  }
};

export const addShopsOffers = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('offer_description', obj.offer_description);
    formData.append('offer_validity_start_date', obj.offer_validity_start_date);
    formData.append('offer_validity_end_date', obj.offer_validity_end_date);
    formData.append('offer_type', obj.offer_type.value);
    formData.append('offer_amount', obj.offer_amount);
    formData.append('offer_title', obj.offer_title);
    formData.append('offer_amount', obj.offer_amount);
    formData.append('catalog_id', obj.catalog_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_SPECIAL_OFFERS}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'ADD_SPECIAL_OFFERS');
  }
};

export const detailShopsOffers = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.DETAIL_SPECIAL_OFFERS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.SpecialOffer};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const deleteOffers = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_SPECIAL_OFFERS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    errorCheck(error, 'DELETE_SPECIAL_OFFERS');
  }
};

export const getReviewsCatalog = async (id, token) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.REVIEWS}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {success: true, data: response?.data?.Review};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const addCatalogReviews = async (obj, token) => {
  try {
    const formData = new FormData();

    formData.append('review_text', obj.review_text);
    formData.append('rating', obj.rating);
    formData.append('catalog_id', obj?.catalog_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_REVIEW}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'DETAIL_REVIEW');
  }
};

export const editCataloguesReviews = async (id, obj, token) => {
  try {
    const formData = new FormData();
    formData.append('review_text', obj.review_text);
    formData.append('rating', obj.rating);
    formData.append('catalog_id', obj.catalog_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.EDIT_REVIEW}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    console.error('Error Message:', error.message);
  }
};

export const detailCatalogReviews = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.DETAIL_REVIEW}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {success: true, data: response?.data?.Reviews};
  } catch (error) {
    console.error('SPECIAL_OFFERS_LIST', error.message, error.response?.data);
    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

export const deleteReview = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_REVIEW}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (error) {
    errorCheck(error, 'DELETE_REVIEW');
  }
};

export const addFAQReviews = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('question', obj.question);
    formData.append('answer', obj.answer);
    formData.append('catalog_id', obj?.catalog_id);
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_FAQ}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, API_ENDPOINTS.ADD_FAQ);
  }
};

export const editFAQReviews = async (id, offerData, token) => {
  try {
    const formData = new FormData();

    formData.append('question', offerData.question);
    formData.append('answer', offerData.answer);
    formData.append('catalog_id', offerData?.catalog_id);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.EDIT_FAQ}/${id?.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, API_ENDPOINTS.EDIT_FAQ);
  }
};

export const deleteFAQ = async (id, token) => {
  try {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/${API_ENDPOINTS.DELETE_FAQ}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      errorCheck(error, API_ENDPOINTS.DELETE_FAQ);
    }
  } catch (error) {
    console.error('DELETE_FAQ', error.message, error.response?.data);
  }
};

export const sendOTP = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('email', obj.email);

    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.SEND_OTP}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    return (
      error.response.data.messages ||
      error.response.data.message ||
      'Something went wrong'
    );
  }
};

export const verifyOTP = async (otp, token) => {
  try {
    const formData = new FormData();
    formData.append('otp', otp);
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.VALIDATE_OTP}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return (
      error.response.data.messages ||
      error.response.data.message ||
      'Something went wrong'
    );
  }
};

export const changePassword = async (obj, token) => {
  try {
    const formData = new FormData();
    formData.append('ma_reset_otp', obj.ma_reset_otp);
    formData.append('newpassword', obj.newpassword);
    formData.append('confirmpassword', obj.confirmpassword);
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.RESET_PASSWORD}`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return (
      error.response.data.messages ||
      error.response.data.message ||
      'Something went wrong'
    );
  }
};

export const updateProfile = async (obj, userType, token) => {
  try {
    const formData = new FormData();
    formData.append('firstname', obj.firstname);
    formData.append('lastname', obj.lastname);
    // formData.append('email', obj.email);
    formData.append('contact_no', obj.contact_no);

    const response = await axios.post(
      `${API_BASE_URL}/ma-${userType}-edit-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Add Accept header
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'edit-profile');
  }
};

 

export const userReviews = async (obj, id, token) => {
  try {
    const formData = new FormData();
    formData.append('reply', obj.reply);
    const response = await axios.post(
      `${API_BASE_URL}/ma-reply-review/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    errorCheck(error, 'ma-reply-review');
  }
};

export const updateStatus = async (url, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${url}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error Message:', error.message, error.message, error.response?.data);
  }
};

export const addProfileImage = async (url, value, token) => {
  try {
    const formData = new FormData();

    if (value.profile_pic) {
      const {uri, fileName, type} = value.profile_pic;
      const filename = fileName || uri.split('/').pop();
      const localUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      formData.append('profile_pic', {
        uri: localUri,
        type: type || 'image/jpeg',
        name: filename,
      });
    }

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json', // Add Accept header
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, url);
  }
};

export const addOpenHour = async (shopId, {data}, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.ADD_OPEN_HOURS}`,
      {data}, // The payload is now the data object
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Changed to 'application/json'
          Accept: 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add open hours:', response.data);
    }
  } catch (error) {
    if (error.response) {
      console.error('Server Response Error:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
  }
};

export const editOpenHour = async (item, token) => {
  const API_URL = 'https://sbs.smarttesting.in/api/ma-edit-openhours';

  // Convert all fields to strings
  const formatData = data => {
    return data.map(entry =>
      entry.id
        ? {
            id: String(entry.id),
            start_time: String(entry.start_time),
            end_time: String(entry.end_time),
            is_closed: String(entry.is_closed),
            day_id: String(entry.day_id),
            shop_id: String(entry.shop_id),
          }
        : {
            start_time: String(entry.start_time),
            end_time: String(entry.end_time),
            is_closed: String(entry.is_closed),
            day_id: String(entry.day_id),
            shop_id: String(entry.shop_id),
          },
    );
  };

  const formattedData = formatData(item.data || []);

  try {
    // console.log("Sending data", { data: formattedData });
    const response = await axios.post(
      API_URL,
      {data: formattedData}, // Pass formatted data
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      'Error editing open hours:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const addItemInCatalog = async (url, obj, token) => {
  try {
    const formData = new FormData();
    formData.append('catalog_id', obj.catalog_id);
    formData.append('user_id', obj.user_id);
    const response = await axios.post(`${API_BASE_URL}/${url}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add business:', response.data);
    }
  } catch (error) {
    errorCheck(error, 'ADD_WISHLIST');
  }
};

export const deleteWishListing = async (id, token) => {
  console.log("id",id,token);
  try {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/${API_ENDPOINTS.DELETE_WISHLIST}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : error.message;
    }
  } catch (error) {
    console.error('DELETE_SHOPS', error.message, error.response?.data);
  }
};

// export const deleteOpensHours = async (id, token) => {
//   try {
//     try {
//       const response = await axios.delete(
//         `${API_BASE_URL}/${API_ENDPOINTS.DELETE_OPEN_HOURS}/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         },
//       );
//        return response.data;
//     } catch (error) {
//       return error.response ? error.response.data : error.message;
//     }
//   } catch (error) {
//     console.error('DELETE_SHOPS', error.message, error.response?.data);
//   }
// };

export const deleteItems = async (id, url, token) => {
  try {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : error.message;
    }
  } catch (error) {
    return {status: false, message: error.response ? error.response.data : error.message};
   }
};

export const getData = async (url, token) => {
  try {
    console.log("url",url);
    const response = await apiClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     return response?.data;
  } catch (error) {
    console.log("error",error.response.data);
    // errorCheck(error,url);
    return {status: false, message: error};
  }
};

const errorCheck = (error, apiName) => {
  if (error.response) {
    console.error(`${apiName} Error Response:`, error.response.data);
    console.error(`${apiName}Error Status:`, error.response.status);
    console.error(`${apiName}Error Headers:`, error.response.headers);
  } else if (error.request) {
    console.error(`${apiName}Error Request:`, error.request);
  } else {
    console.error(`${apiName}Error Message:`, error.message);
  }
  console.error(`${apiName}Error Config:`, error.config);
};
