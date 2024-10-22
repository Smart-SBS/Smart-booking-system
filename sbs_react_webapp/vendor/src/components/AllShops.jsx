import { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import LoadingFallback from "../utils/LoadingFallback";
import CommonHeader from "./CommonHeader";
import Sidebar from "./Sidebar";
import LeftSidebar from "./LeftSidebar";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";

const AllShops = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [listings, setListings] = useState([]);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 9;

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${API_URL}/ma-all-shops`);
                if (response.status === 200) {
                    setListings(response.data.shops);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    setError("Server Error. Please try again later");
                    console.error(`Error fetching shops: ${errorMessages}`);
                } else {
                    setError("Server Error. Please try again later");
                    console.error(`Error fetching shops: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [API_URL]);

    // Pagination logic
    const totalPages = Math.ceil(listings.length / resultsPerPage);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentListings = listings.slice(indexOfFirstResult, indexOfLastResult);

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

    const paginate = (pageNumber) => {
        window.scrollTo(0, 0);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const PaginationControls = () => (
        <div className="flex justify-center mt-6">
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

    if (error || listings.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
                <h2 className="text-2xl text-black text-center font-bold mb-2">All Shops</h2>
                <p className="text-gray-600 text-center">{error || "No shops available"}</p>
            </div>
        );
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'All Shops', link: null } // Current page, no link
    ];

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
                <h2 className="text-2xl text-black font-bold mb-10 mt-3">All Shops</h2>
                <div className='flex flex-col items-start'>
                    {listings.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
                                {currentListings.map(listing => (
                                    <ShopCard
                                        key={listing.id}
                                        listing={listing}
                                    />
                                ))}
                            </div>
                            {listings.length > 10 && <PaginationControls />}
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
    );
};

export default AllShops;