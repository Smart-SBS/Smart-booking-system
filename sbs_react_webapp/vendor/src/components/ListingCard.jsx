/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaMapMarkerAlt, FaCalendarAlt, FaStar, FaHeart } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import { openAuthPopup } from '../redux/slices/authPopupSlice';
import getTimeAgo from '../utils/getDaysAgo';
import calculateAverageRating from '../utils/calculateAverageRating';
import generateStarRating from '../utils/generateStarRating';
import axios from "axios";

const ListingCard = React.memo(({ listing, isLiked, onLike }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token, userType } = useSelector(state => state.auth);
    const isVendor = userType === 'vendor';

    const renderStars = useMemo(() => {
        if (listing.rating) {
            return generateStarRating(calculateAverageRating(listing.rating));
        } else {
            return Array(5).fill().map((_, index) => (
                <FaStar key={index} className="text-gray-300" />
            ));
        }
    }, [listing.rating]);

    const navigateToListing = useCallback(() => {
        navigate(`/catalog/${(listing.category_name).toLowerCase()}/${listing.slug}`, { state: { catalogueId: listing.id } });
    }, [navigate, listing.category_name, listing.slug, listing.id]);

    const handleLikeClick = useCallback(() => {
        if (!token || userType !== 'user') {
            dispatch(openAuthPopup());
        } else {
            onLike(listing.id);
        }
    }, [token, userType, dispatch, onLike, listing.id]);

    // handle location search
    const handleLocation = useMemo(() => async (location) => {
        try {
            const response = await axios.get(`${API_URL}/ma-search?location=${location}`);

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                navigate(`/search?location=${location}`, { state: { searchResults: response.data } });
            } else {
                navigate('/search', { state: { message: `${location} doesn't have catalogs yet`, keyword: location } });
            }
        } catch (error) {
            let errorMessage = 'An error occurred while searching';
            if (error.response?.data?.message) {
                errorMessage = typeof error.response.data.message === 'object'
                    ? Object.values(error.response.data.message).join(', ')
                    : error.response.data.message;
            }
            console.error('Error fetching results:', errorMessage);
        }
    }, [API_URL, navigate]);

    return (
        <div className="bg-white overflow-hidden w-full h-full border-[#eaeff5] border-[1px] relative" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <span onClick={navigateToListing} className="block relative w-full h-[232px] cursor-pointer">
                <img
                    src={listing.primary_catalog_image ? `${IMG_URL}/catalog-image/thumb/${listing.primary_catalog_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                    className="w-full h-full object-cover brightness-95"
                    onError={(e) => { e.target.src = 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg' }}
                    alt={listing.item_title}
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-50 rounded">
                    <div className="flex items-center">
                        {renderStars}
                        <span className="text-xs font-semibold text-white ml-2">
                            ({listing.number_of_reviews || 0} Reviews)
                        </span>
                    </div>
                </div>
            </span>

            {!isVendor && (
                <div className="absolute top-2 right-2">
                    <FaHeart
                        onClick={handleLikeClick}
                        title='Add To Wishlist'
                        aria-label="Add To Wishlist"
                        className={`text-2xl cursor-pointer transition-colors duration-200 ${isLiked ? 'text-[#fa2964]' : 'text-white'} drop-shadow-lg`} />
                </div>
            )}

            <div className="p-4 space-y-4 w-full h-full">
                <span onClick={navigateToListing}>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 cursor-pointer">{listing.item_title || 'Catalogue Name Unavailable'}</h3>
                </span>
                <div className="flex items-center text-sm text-gray-600 mb-1 cursor-pointer">
                    <FaMapMarkerAlt className="mr-2 text-[#fa2964e6]" size={18} />
                    <p onClick={() => handleLocation(listing.area_name)}>{`${listing.area_name || 'Area Name Unavailable'}, ${listing.city_name || 'City Name Unavailable'}, ${listing.states_name || 'State Name Unavailable'}`}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-[#fa2964e6]" size={18} />
                    <p>Posted {getTimeAgo(listing.created_at)}</p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex items-center text-sm text-gray-600 mb-2 cursor-pointer">
                    <BiCategory className="mr-2 text-[#fa2964e6]" size={18} />
                    <p onClick={() => navigate(`/all-catalogues/category/${listing.category_name}`)}>{listing.category_name ? (listing.category_name) : 'none'}</p>
                </div>
            </div>
        </div>
    );
});

export default ListingCard;