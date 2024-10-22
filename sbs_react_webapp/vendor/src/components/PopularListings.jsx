import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingFallback from "../utils/LoadingFallback";
import ListingCard from './ListingCard';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';

const PopularListings = () => {
    // State initialization
    const [wishlist, setWishlist] = useState({});
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();
    const { token, userType, userId } = useSelector(state => state.auth);

    // Fetch catalogs
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${API_URL}/ma-popular-catalog`);
                if (response.data.status === 200) {
                    setListings(response.data.Catalog);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    setError("Server Error. Please try again later");
                    console.error(`Error fetching catalogs: ${errorMessages}`);
                } else {
                    setError("Server Error. Please try again later");
                    console.error(`Error fetching catalogs: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [API_URL]);

    const fetchWishlist = useCallback(async () => {
        if ((!token || userType !== 'user') && !token && !userType && !userId) {
            setWishlist({})
        } else {
            try {
                const response = await axios.get(`${API_URL}/ma-wishlist/${userId}`, {
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

    }, [API_URL, token, userType, userId]);

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
                const response = await axios.delete(`${API_URL}/ma-delete-wishlist/${wishlist[listingId]}`, {
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
                const response = await axios.post(`${API_URL}/ma-add-wishlist`, formdata, {
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
    }, [token, userType, wishlist, API_URL, userId, fetchWishlist, dispatch]);

    if (loading) return <LoadingFallback />;

    if (error || listings.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
                <h2 className="text-2xl text-black text-center font-bold mb-2">POPULAR CATALOGUES</h2>
                <p className="text-gray-600 mb-6 text-center">What are you interested in?</p>
                <p className="text-gray-600 text-center">{error || "No content available"}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
            <h2 className="text-2xl text-black text-center font-bold mb-2">POPULAR CATALOGUES</h2>
            <p className="text-gray-600 mb-6 text-center">What are you interested in?</p>
            <div className='flex flex-col items-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
                    {listings.map(listing => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            isLiked={!!wishlist[listing.id]}
                            onLike={() => handleLike(listing.id)}
                        />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to='/popular-catalogues' className="bg-[#fa2964e6] text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                        View All
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PopularListings;
