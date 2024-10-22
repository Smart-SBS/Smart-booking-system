/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import LoadingFallback from "../utils/LoadingFallback";
import calculateAverageRating from '../utils/calculateAverageRating';
import generateStarRating from '../utils/generateStarRating';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';
import { FaHeart, FaStar } from 'react-icons/fa';

const RestaurantInfo = ({ catalogueId }) => {
    const dispatch = useDispatch();

    // Access token and usertype
    const { token, userType, userId } = useSelector(state => state.auth);
    const isVendor = userType === 'vendor';

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // State initialization
    const [restaurant, setRestaurant] = useState({});
    const [wishlist, setWishlist] = useState({});

    // Fetch restaurant details from API and update state on successful response
    const fetchRestaurantDetails = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-catalog-details/${catalogueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.status === 200) {
                setRestaurant(response.data.Catalog);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching restaurant details: ${errorMessages}`);
            } else {
                console.error(`Error fetching restaurant details: ${error.response?.data?.message || error.message}`);
            }
            setRestaurant([]);
        }
    };

    const renderStars = useMemo(() => {
        if (restaurant.rating) {
            return generateStarRating(calculateAverageRating(restaurant.rating));
        } else {
            return Array(5).fill().map((_, index) => (
                <FaStar key={index} className="text-gray-300" />
            ));
        }
    }, [restaurant.rating]);

    const fetchWishlist = useCallback(async () => {
        if ((!token || userType !== 'user') && !token && !userType && !userId) {
            setWishlist({})
        } else {
            try {
                const response = await axios.get(`${APP_URL}/ma-wishlist/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    const wishlistMap = {};
                    response.data.Wishlists.forEach(item => {
                        wishlistMap[item.catalog_id] = item.id;
                    });
                    setWishlist(wishlistMap);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        }

    }, [APP_URL, token, userType, userId]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const handleLike = useCallback(async (listingId) => {
        if (!token || userType !== 'user') {
            dispatch(openAuthPopup());
            setWishlist({});
            return;
        }

        try {
            if (wishlist[listingId]) {
                const response = await axios.delete(`${APP_URL}/ma-delete-wishlist/${wishlist[listingId]}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setWishlist(prev => {
                        const newWishlist = { ...prev };
                        delete newWishlist[listingId];
                        return newWishlist;
                    });
                }
            } else {
                const formdata = new FormData();
                formdata.append('user_id', userId);
                formdata.append('catalog_id', listingId);
                const response = await axios.post(`${APP_URL}/ma-add-wishlist`, formdata, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    fetchWishlist();
                }
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    }, [token, userType, dispatch, wishlist, APP_URL, userId, fetchWishlist]);

    // Fetch restaurant details when catalogueId prop changes
    useEffect(() => {
        if (catalogueId) {
            fetchRestaurantDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogueId]);

    if (!restaurant) return <LoadingFallback />;

    // Calculate if the current restaurant is in the wishlist
    const isLiked = Boolean(wishlist[catalogueId]);

    return (
        <div className="mb-8">
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{restaurant.item_title}</h1>
                    <div className="flex items-center mb-2 px-2 py-1 bg-black bg-opacity-40 rounded">
                        {renderStars}
                        <span className="text-xs font-semibold text-white ml-2">
                            ({restaurant.number_of_reviews || 0} Reviews)
                        </span>
                    </div>
                </div>
                {!isVendor && (
                    <FaHeart
                        onClick={() => handleLike(catalogueId)}
                        title='Add To Wishlist'
                        aria-label="Add To Wishlist"
                        className={`text-2xl cursor-pointer transition-colors duration-200 ${isLiked ? 'text-[#fa2964]' : 'text-gray-400'} drop-shadow-md`} />
                )}
            </div>
            <div className="bg-white p-6 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
                <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">
                    Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {restaurant.item_description}
                </p>
            </div>
        </div>
    );
};

export default RestaurantInfo;