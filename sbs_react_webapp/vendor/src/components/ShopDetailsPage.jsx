import Footer from './Footer.jsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import CommonHeader from './CommonHeader.jsx';
import LeftSidebar from './LeftSidebar.jsx';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import ShopCarousel from './ShopCarousel.jsx'
import ShopInfo from './ShopInfo.jsx';
import SellerInfoCard from './SellerInfoCard.jsx';
import ShopOverview from './ShopOverview.jsx';
import OpeningHoursCard from './OpeningHoursCard.jsx';
import ListingCard from './ListingCard.jsx';
import { openAuthPopup } from '../redux/slices/authPopupSlice';
import ShopCard from './ShopCard.jsx';

const ShopDetailsPage = () => {
    const location = useLocation();

    // Access token
    const { token, userType, userId } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    const [shopId, setshopId] = useState('')
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [shop, setShop] = useState([])
    const [openingHours, setOpeningHours] = useState([]);
    const [catalog, setCatalog] = useState([])
    const [listings, setListings] = useState([]);
    const [wishlist, setWishlist] = useState({});

    useEffect(() => {
        const id = location.state?.shopId || '';
        setshopId(id);
    }, [location.state?.shopId]);

    // Fetch shop details from API and update state on successful response
    const fetchShopDetails = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-shop-details/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.status === 200) {
                setShop(response.data.shops);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching shop details: ${errorMessages}`);
            } else {
                console.error(`Error fetching shop details: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const fetchOpeningHours = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-openhours/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.status === 200) {
                setOpeningHours(response.data.OpenHours);
            }
        } catch (error) {
            console.error('Error fetching opening hours:', error);
        }
    };

    // Fetch vendor catalogue data
    const fetchCatalogs = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-catalog-list/${shopId}`);
            if (response.status === 200) {
                setCatalog(response.data.Catalog);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching vendor catalogue data: ${errorMessages}`);
            } else {
                console.error(`Error fetching vendor catalogue data: ${error.response?.data?.message || error.message}`);
            }
        }
    };

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
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${APP_URL}/ma-all-shops`);
                if (response.status === 200) {
                    setListings(response.data.shops);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    console.error(`Error fetching catalogs: ${errorMessages}`);
                } else {
                    console.error(`Error fetching catalogs: ${error.response?.data?.message || error.message}`);
                }
            }
        };
        fetchListings();
    }, [APP_URL]);

    // Fetch shop details when shopId prop changes
    useEffect(() => {
        if (shopId) {
            fetchShopDetails();
            fetchOpeningHours();
            fetchCatalogs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopId]);

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

    // Toggle Right Sidebar Functionality
    const toggleRightSidebar = () => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(prev => !prev);
    };

    // Toggle Left Sidebar Functionality
    const toggleLeftSidebar = () => {
        setRightSidebarOpen(false);
        setLeftSidebarOpen(prev => !prev);
    };

    const getRandomShops = (catalogs, count = 5) => {
        // Create a copy of the original array to avoid modifying it
        const shuffled = [...catalogs];
        let currentIndex = shuffled.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[randomIndex];
            shuffled[randomIndex] = temporaryValue;
        }

        // Return the first 'count' elements from the shuffled array
        return shuffled.slice(0, count);
    };

    const randomCatalogs = useMemo(() => getRandomShops(listings), [listings]);

    // Effect to close sidebar on route change
    useEffect(() => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Left Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <LeftSidebar isOpen={leftSidebarOpen} />
            </div>

            {/* Right Sidebar */}
            <div className={`fixed inset-y-0 right-0 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <Sidebar />
            </div>

            <CommonHeader toggleLeftSidebar={toggleLeftSidebar} toggleRightSidebar={toggleRightSidebar}
            />

            <main className="flex-grow mt-28">
                <ShopCarousel shopId={shopId} />
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                        <div className="w-full md:w-2/3">
                            <ShopInfo shopData={shop} />
                            <div className="container mx-auto">
                                <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Catalogues</h2>
                                {
                                    catalog.length === 0 ?
                                        <div className="text-start text-gray-500 mb-8">
                                            No catalogues found for this shop.
                                        </div> :
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-start w-full mt-4">
                                            {catalog.map((item) => (
                                                <div key={item.id}>
                                                    <ListingCard
                                                        listing={item}
                                                        isLiked={!!wishlist[item.id]}
                                                        onLike={() => handleLike(item.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                }
                            </div>
                            <ShopOverview shopData={shop} />
                        </div>
                        <div className="w-full md:w-1/3">
                            <SellerInfoCard catalogueData={shop} />
                            <OpeningHoursCard openingHours={openingHours} />
                        </div>
                    </div>
                </div>
            </main>

            <div className="container mx-auto mb-6 py-4 2xl:container 2xl:mx-auto 2xl:px-12 2xl:py-4">
                <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Explore more shops</h2>
                {
                    listings.length === 0 ?
                        <div className="text-start text-gray-500 mb-8">
                            No shop records found.
                        </div> :
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-start w-full mt-4">
                            {randomCatalogs.map((item) => (
                                <div key={item.id}>
                                    <ShopCard
                                        key={item.id}
                                        listing={item}
                                    />
                                </div>
                            ))}
                        </div>
                }
            </div>
            <Footer />
        </div>
    );
};

export default ShopDetailsPage