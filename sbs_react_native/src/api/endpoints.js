import {API_BASE_URL} from '../config/apiConfig';

export const API_ENDPOINTS = {
  GET_USER: '/user',
  GET_POSTS: '/posts',
  GET_ARIAS: '/ma-detail-areas',
  GET_CATEGORIES: '/ma-active-categories',
  GET_VENDOR_PROFILE: '/ma-vendor-profile',
  GET_USER_PROFILE: '/ma-user-profile',
  GET_CITIES_FOR_SEARCH: '/ma-cities-for-search',
  VENDOR_DETAIL_CATALOG: '/ma-vendor-detail-catalog',
  VENDOR_CATALOG_GALLERY: '/ma-catalog-gallery',
  VENDOR_REVIEWS: '/ma-reviews',
  VENDOR_EDIT_REVIEW: '/ma-vendor-edit-review',
  POPULAR_CITIES: '/ma-popular-cities',
  POPULAR_CATALOG: '/ma-popular-catalog',
  ALL_CATALOG: '/ma-all-popular-catalogs',
  LIST_PATH: `${API_BASE_URL}/public/uploads/city-images/list`,
  THUMB_PATH: `${API_BASE_URL}/public/uploads/city-images/thumb`,
  CATALOGUES_PATH_THUMB: `${API_BASE_URL}/public/uploads/catalog-image/thumb`,
  CATALOGUES_PATH_LIST: `${API_BASE_URL}/public/uploads/catalog-image/thumb`,
  PROFILE_PATH: `${API_BASE_URL}/public/uploads/profile/thumb`,

  POST_REGISTER_VENDOR: '/ma-register-vendor',
  POST_REGISTER_USER: '/ma-register-user',
  POST_LOGIN_VENDOR: '/ma-app-login',
  POST_CHANGE_PASSWORD: '/ma-change-vendor-password',

  VENDOR_BUSINESS: '/ma-vendor-business',
  ACTIVE_BUSINESS_TYPES: '/ma-active-business-types',
  ACTIVE_CATEGORIES: '/ma-active-categories',
  ACTIVE_SUBCATEGORIES: '/active-subcategories',

  VENDOR_REVIEWS_COUNT: '/ma-vendor-reviews-count',
  VENDOR_SHOPS: '/ma-vendor-shops',
  VENDOR_BUSINESS_IMAGE: `${API_BASE_URL}/public/uploads/logo/list`,
  VENDOR_SHOP_IMAGE: `${API_BASE_URL}/public/uploads/gallery/og`,
  VENDOR_SHOP_IMAGE_THUMB: `${API_BASE_URL}/public/uploads/gallery/thumb`,

  ACTIVE_STATES: '/ma-active-states',
  ACTIVE_CITIES: '/ma-active-cities',
  ACTIVE_AREAS: '/ma-active-areas',
  ACTIVE_VENDOR_BUSINESSES: '/ma-active-vendor-businesses',

  ADD_SHOPS: '/ma-add-shops',
  DELETE_SHOPS: '/ma-delete-shop',
  EDIT_SHOPS: '/ma-edit-shop',
  SHOP_GALLERY: '/ma-shop-gallery',
  SET_SHOP_PRIMARY_IMAGE: 'ma-set-shop-primary-image',

  ADD_GALLERY_IMAGES: '/ma-add-gallery-images',
  ADD_BUSINESS: '/ma-add-business',
  DELETE_BUSINESS: '/ma-delete-business',
  EDIT_BUSINESS: '/ma-edit-business',

  VENDOR_DETAIL_BUSINESS: '/ma-vendor-detail-business',
  VENDOR_DETAIL_SHOPS: '/ma-vendor-detail-shop',
  CATALOG_LIST: '/ma-catalog-list',
  ADD_CATALOG: '/ma-add-catalog',
  VENDOR_DETAIL_CATALOG: 'ma-vendor-detail-catalog',
  VENDOR_EDIT_CATALOG: '/ma-edit-catalog',
  DELETE_CATALOG: '/ma-delete-catalog',

  CATALOG_GALLERY: '/ma-catalog-gallery',
  SET_CATALOG_PRIMARY_IMAGE: '/ma-set-catalog-primary-image',
  DELETE_CATALOG_IMAGE: '/ma-delete-catalog-image',
  ADD_CATALOG_IMAGES: '/ma-add-catalog-images',

  DELETE_GALLERY_IMAGE: 'ma-delete-gallery-image',
  SPECIAL_OFFERS_LIST: '/ma-specialoffers-list',
  ADD_SPECIAL_OFFERS: '/ma-add-specialoffers',
  EDIT_SPECIAL_OFFERS: '/ma-edit-specialoffers',
  DELETE_SPECIAL_OFFERS: '/ma-delete-specialoffers',

  DETAIL_SPECIAL_OFFERS: '/ma-detail-specialoffers',

  REVIEWS: '/ma-reviews',
  ADD_REVIEW: '/ma-add-review',
  EDIT_REVIEW: '/ma-edit-review',
  DELETE_REVIEW: '/ma-delete-review',
  DETAIL_REVIEW: '/ma-detail-review',

  VENDOR_FAQS: '/ma-vendor-faqs',
  ADD_FAQ: '/ma-add-faq',
  EDIT_FAQ: '/ma-edit-faq',
  DELETE_FAQ: '/ma-delete-faq',
  DETAIL_FAQ: '/ma-detail-faq',
  SEND_OTP: '/SendOTP', 
  VALIDATE_OTP: '/MaValidateOTP',
  RESET_PASSWORD: '/MaResetPassword',

  UPDATE_BUSINESS_STATUS:"/update-business-status",
  UPDATE_SHOP_STATUS:"/updateshopstatus",
  UPDATE_SPECIAL_OFFERS_STATUS:"/updatespecialofferstatus",
  UPDATE_CATALOG_STATUS:"/catalogupdatestatus",
  SUBMIT_USER_ENQUIRY:"/ma-submit-user-enquiry",
  ENQUIRY:"/ma-enquiries",

  OPEN_HOURS:"/ma-openhours",
  ADD_OPEN_HOURS:"/ma-add-openhours",
  EDIT_OPEN_HOURS:"/ma-edit-openhours",

  WISHLIST:"/ma-wishlist",
  ADD_WISHLIST:"/ma-add-wishlist",
  DELETE_WISHLIST:"/ma-delete-wishlist",
  DELETE_OPEN_HOURS:"/ma-delete-openhours",

  CART:"/ma-cart",
  ADD_CART:"/ma-add-cart",
  DELETE_CART:"/ma-delete-cart",

  ENQUIRIES:"/ma-enquiries",
  DELETE_ENQUIRIES:"/ma-delete-enquiry",
  ORDER:"/ma-order",

  UPDATE_PAYMENT_STATUS:"/ma-update-payment-status",
  MA_ALL_SHOPS:"/ma-all-shops",
  MA_SHOP_DETAILS:"/ma-shop-details"
};
