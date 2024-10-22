import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import ListingCard from "./ListingCard";
import Footer from './Footer.jsx';
import CommonHeader from "./CommonHeader";
import Sidebar from "./Sidebar";
import LoadingFallback from "../utils/LoadingFallback";
import LeftSidebar from "./LeftSidebar";
import Breadcrumb from './Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';

const Categories = () => {
    const { type, name } = useParams();

    // State initialization
    const searchParamsRef = useRef(null)
    const dispatch = useDispatch();
    var searchParams = searchParamsRef.current;
    const [listings, setListings] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token, userType, userId } = useSelector(state => state.auth);
    const location = useLocation();

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch listings based on category or subcategory
    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                let params = new URLSearchParams();
                params.append(type, name);

                searchParamsRef.current = params.toString()
                const response = await axios.get(`${API_URL}/ma-search?${params.toString()}`);
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setListings(response.data);
                } else {
                    setListings([])
                    setError('No results found');
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
                setError('An error occurred while fetching listings');
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [API_URL, type, searchParams, name]);

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

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Catalogues', link: '/popular-catalogues' },
        { label: name, link: null } // Current page, no link
    ];

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
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Component rendering the pagination controls
    const PaginationControls = () => (
        <div className="flex justify-center mt-6">
            {/* Button to navigate to the previous page */}
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-[#fa2964e6]'
                    }`}
            >
                Previous
            </button>

            {/* Buttons for each page number */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`mx-1 px-3 py-1 border rounded ${currentPage === number
                        ? 'bg-[#fa2964e6] text-white'
                        : 'bg-white text-[#fa2964e6]'
                        }`}
                >
                    {number}
                </button>
            ))}

            {/* Button to navigate to the next page */}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-[#fa2964e6]'
                    }`}
            >
                Next
            </button>
        </div>
    );

    if (loading) return <LoadingFallback />;

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

            <div className="container mx-auto mt-28 top-28 px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
                <Breadcrumb items={breadcrumbItems} />
                <h2 className="text-2xl text-black font-bold mb-10 mt-3">{name.toUpperCase()} CATALOGUES</h2>
                <div className='flex flex-col items-start'>
                    {listings.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
                                {currentListings.map(listing => (
                                    <ListingCard
                                        key={listing.id}
                                        listing={listing}
                                        isLiked={!!wishlist[listing.id]}
                                        onLike={() => handleLike(listing.id)}
                                    />
                                ))}
                            </div>
                            {listings.length > resultsPerPage && <PaginationControls />}
                        </>
                    ) : (
                        <div className="flex items-start justify-start h-64">
                            <p className="text-black font-semibold text-lg text-left">
                                {error || "No Data Found"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Categories;