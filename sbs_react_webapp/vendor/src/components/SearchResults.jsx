/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MapView from '../utils/MapView';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ListingCard from './ListingCard';
import Sidebar from './Sidebar';
import CommonHeader from './CommonHeader';
import LoadingFallback from '../utils/LoadingFallback';
import LeftSidebar from './LeftSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';
import PaginationControls from './PaginationControls';

const SearchResults = () => {
    // Use location to fetch search results from the previous page
    const location = useLocation();
    const dispatch = useDispatch();

    // Navigation function
    const navigate = useNavigate();

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [listings, setListings] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [error, setError] = useState('');
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [resultVar, setResultVar] = useState('')

    const { token, userType, userId } = useSelector(state => state.auth);

    // Fetch listings when the search results change
    useEffect(() => {
        const searchResults = location.state?.searchResults || [];
        setListings(searchResults);
        setLoading(false)
    }, [location.state?.searchResults]);

    // Fetch popular cities
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/ma-popular-cities`);
                if (response.status === 200) {
                    const filteredLocations = response.data.Cities.filter(city => city.is_popular === "1" && city.status === "1");
                    setLocations(filteredLocations);
                    if (filteredLocations.length === 0) {
                        setError("No popular cities found.");
                    }
                }
                else {
                    throw new Error("Unexpected response status");
                }
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    console.log('HTTP 503 error: Service Unavailable');
                } else {
                    console.log('An error occurred:', error.message);
                }
                setError("Server Error. Please try again later");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [API_URL]);

    // Error response when there are no listings in the search results
    useEffect(() => {
        const errorResponse = location.state?.message || '';
        setError(errorResponse)
        setLoading(false)
    }, [location.state?.message]);

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

    useEffect(() => {
        const keyVar = location.state?.keyword;
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get('keyword') || keyVar;
        const locationVar = searchParams.get('location');
        const category = searchParams.get('category');

        // Construct the result string
        const result = [keyword, category, locationVar].filter(Boolean).join(' in ');

        // Set resultVar with the combined result
        setResultVar(result || '');
        setLoading(false)
    }, [location.search, location.state?.keyword]);

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

    // Effect to close sidebar on route change
    useEffect(() => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    }, [location]);

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

    // State variable to track the current active page
    const [currentPage, setCurrentPage] = useState(1);

    // Number of listings displayed per page
    const resultsPerPage = 12;

    // Calculate total number of pages based on listings length
    const totalPages = Math.ceil(listings.length / resultsPerPage);

    // Index of the last listing on the current page
    const indexOfLastResult = currentPage * resultsPerPage;

    // Index of the first listing on the current page
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

    // Extract listings to display on the current page
    const currentListings = listings.slice(indexOfFirstResult, indexOfLastResult);

    // Function to handle page changes, ensuring the new page is within valid bounds
    const paginate = (pageNumber) => {
        scrollTo(0, 0)
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return <LoadingFallback />;

    console.error(error)

    return (
        <>
            {/* Left Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <LeftSidebar
                    isOpen={leftSidebarOpen}
                />
            </div>

            {/* Right Sidebar */}
            <div className={`fixed inset-y-0 right-0 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <Sidebar />
            </div>

            <CommonHeader
                toggleLeftSidebar={toggleLeftSidebar}
                toggleRightSidebar={toggleRightSidebar}
            />


            <div className="container mx-auto mt-28 px-4 py-6 2xl:container 2xl:mx-auto 2xl:px-4 2xl:py-6">
                <Header listingsCount={listings.length} resultVar={resultVar} error={error} listings={listings} />

                {error && <PopularLocationsRow locations={locations} handleLocation={handleLocation} IMG_URL={IMG_URL} />}

                <div className="flex flex-col lg:flex-row gap-6">
                    <ListingsSection
                        listings={listings}
                        currentListings={currentListings}
                        wishlist={wishlist}
                        handleLike={handleLike}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                    />
                    <MapSection listings={listings} />
                </div>
            </div>
            <Footer />
        </>
    );
};

const Header = ({ listingsCount, resultVar, listings, error }) => (
    <div className="flex justify-between items-center text-black mb-6">
        {listings.length > 0 ? (
            <h2 className="text-2xl font-bold">
                {listingsCount} Search Results {resultVar && `for ${resultVar}`}
            </h2>
        ) : <div className='flex flex-col items-start'>
            <h2 className="text-2xl font-bold mb-4">
                {listingsCount} Search Results {resultVar && `for ${resultVar}`}
            </h2>
            <p>
                {error}
            </p>
        </div>}
        <div className="flex items-center">
            <span className="mr-2">SORT BY:</span>
            <select className="border rounded px-2 py-1">
                <option>Popularity</option>
            </select>
        </div>
    </div>
);

const ListingsSection = ({ listings, currentListings, wishlist, handleLike, currentPage, totalPages, paginate }) => (
    <div className="lg:w-1/2 h-[800px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.length > 0 ? (
                currentListings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        isLiked={!!wishlist[listing.id]}
                        onLike={() => handleLike(listing.id)}
                    />
                ))
            ) : (
                null
            )}
        </div>
        {listings.length > 0 && (
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />
        )}
    </div>
);

const MapSection = ({ listings }) => (
    <div className="lg:w-1/2 h-[800px] z-10">
        {listings.length > 0 && <MapView listings={listings} />}
    </div>
);

const PopularLocationsRow = ({ locations, handleLocation, IMG_URL }) => {
    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            <h2 className="text-3xl text-black font-bold text-center mb-6">
                Other Popular Locations you can explore
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {locations.slice(0, 5).map((location, index) => (
                    <LocationCard
                        key={index}
                        location={location}
                        handleLocation={handleLocation}
                        IMG_URL={IMG_URL}
                    />
                ))}
            </div>
        </div>
    );
};

const LocationCard = ({ location, handleLocation, IMG_URL }) => (
    <div
        className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => handleLocation(location.city_name)}
    >
        <div className="aspect-w-16 aspect-h-9">
            <img
                src={location.city_image ? `${IMG_URL}/city-images/thumb/${location.city_image}` : `https://placehold.co/300x200?text=${location.city_name}`}
                alt={location.city_name}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-lg font-semibold">{location.city_name}</h3>
                <p className="text-sm font-medium">View listings</p>
            </div>
        </div>
    </div>
);

export default SearchResults;