import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingFallback from "../utils/LoadingFallback";
import ShopCard from "./ShopCard";

const PopularShops = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <LoadingFallback />;
    if (error || listings.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
                <h2 className="text-2xl text-black text-center font-bold mb-2">POPULAR Shops</h2>
                <p className="text-gray-600 mb-6 text-center">What are you interested in?</p>
                <p className="text-gray-600 text-center">{error || "No content available"}</p>
            </div>
        );
    }

    const displayedListings = listings.slice(0, 6);
    const showViewAllButton = listings.length > 6;

    return (
        <div className="container mx-auto px-4 sm:px-48 py-8 2xl:container 2xl:mx-auto 2xl:px-48 2xl:py-8">
            <h2 className="text-2xl text-black text-center font-bold mb-2">SHOPS</h2>
            <p className="text-gray-600 mb-6 text-center">What are you interested in?</p>
            <div className='flex flex-col items-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
                    {displayedListings.map(listing => (
                        <ShopCard
                            key={listing.id}
                            listing={listing}
                        />
                    ))}
                </div>
                {showViewAllButton && (
                    <div className="text-center mt-8">
                        <Link to='/all-shops' className="bg-[#fa2964e6] text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                            View All
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularShops;