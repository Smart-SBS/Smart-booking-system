/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingFallback from '../utils/LoadingFallback';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ListingCard from './ListingCard';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';

const CatalogCarousel = ({ shopId }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const { token, userType, userId } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [wishlist, setWishlist] = useState({});
    const [catalog, setCatalog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

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
    }, [token, userType, dispatch, wishlist, API_URL, userId, fetchWishlist]);

    if (loading) return <LoadingFallback />;
    

    // Render a single image without Slider when there's only one image
    if (catalog.length === 1) {
        const item = catalog[0];
        return (
            <div className="container mx-auto px-4">
                <ListingCard
                    listing={item}
                    isLiked={!!wishlist[item.id]}
                    onLike={() => handleLike(item.id)}
                />
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        dotsClass: "slick-dots",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Catalogues</h2>
            <div className="px-4"> {/* Add padding to container */}
                <Slider {...settings}>
                    {catalog.map((item) => (
                        <div key={item.id} className="px-3"> {/* Add horizontal padding to each slide */}
                            <ListingCard
                                listing={item}
                                isLiked={!!wishlist[item.id]}
                                onLike={() => handleLike(item.id)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

const CustomNextArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 -right-8 -translate-y-1/2 z-10 cursor-pointer"
    >
        <AiOutlineArrowRight color='#000' size={30} />
    </div>
);

const CustomPrevArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 -left-8 -translate-y-1/2 z-10 cursor-pointer"
    >
        <AiOutlineArrowLeft color='#000' size={30} />
    </div>
);

export default CatalogCarousel;