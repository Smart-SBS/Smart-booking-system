/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatDate from '../utils/formatDate';
import { FaList, FaStar, FaComments, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DashboardCard = ({ icon, count, label, color }) => (
    <div className={`rounded-lg p-4 text-white flex items-center`} style={{ backgroundColor: color }}>
        <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">{icon}</div>
        <div>
            <div className="text-2xl sm:text-3xl font-bold">{count}</div>
            <div className="text-xs sm:text-sm">{label}</div>
        </div>
    </div>
);

const ManageDashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { token, userType, userId } = useSelector(state => state.auth);

    const [listingData, setListingData] = useState([]);
    const [reviewCount, setReviewCount] = useState('');
    const [activeListingsCount, setActiveListingsCount] = useState(0);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        if (token) {
            if (userType) {
                if (userType === 'user') {
                    fetchWishlistData();
                } else {
                    fetchVendorData();
                }
            } else {
                console.log('userData not yet available');
            }
        }
    }, [token, userType]);

    const fetchWishlistData = async () => {
        try {
            const response = await axios.get(`${API_URL}/ma-wishlist/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setWishlistData(response.data.Wishlists);
                setActiveListingsCount(response.data.Wishlists.length);
            }
        } catch (error) {
            console.error('Error fetching wishlist data:', error);
            setWishlistData([]);
        }
    };

    const fetchVendorData = async () => {
        try {
            const businessResponse = await axios.get(`${API_URL}/ma-vendor-business`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (businessResponse.status === 200) {
                setListingData(businessResponse.data.business);
                const activeCount = businessResponse.data.business.filter(business => business.status === '1').length;
                setActiveListingsCount(activeCount);
            }

            const reviewResponse = await axios.get(`${API_URL}/ma-vendor-reviews-count`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (reviewResponse.status === 200) {
                setReviewCount(reviewResponse.data.Review.review_count);
            }
        } catch (error) {
            console.error('Error fetching vendor data:', error);
            setListingData([]);
            setReviewCount('');
        }
    };

    const dashboardData = userType === 'user'
        ? [
            { icon: <FaHeart />, count: activeListingsCount, label: 'Favorited Listings', color: '#f91942' }
        ]
        : [
            { icon: <FaList />, count: activeListingsCount, label: 'Published Listing', color: '#1ec38b' },
            { icon: <FaStar />, count: reviewCount, label: 'Total Reviews', color: '#f91' },
            { icon: <FaComments />, count: 223, label: 'Messages', color: '#6ae' },
            { icon: <FaHeart />, count: 432, label: 'Times Bookmarked', color: '#f91942' },
        ];

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Dashboard</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {dashboardData.map((item, index) => (
                    <DashboardCard key={index} {...item} />
                ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    {userType === 'user' ? 'Favorited Listings' : 'Listings'}
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                {userType === 'user' ? (
                                    <>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Catalogue</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Business Name</th>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Email</th>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Contact</th>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Date Added</th>
                                        <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Status</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {userType === 'user' ? (
                                wishlistData.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">No favorited listings found</td>
                                    </tr>
                                ) : (
                                    wishlistData.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{item.item_title}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                listingData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No records found</td>
                                    </tr>
                                ) : (
                                    listingData.map((listing, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{listing.business_name}</td>
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{listing.business_email}</td>
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{listing.business_contact}</td>
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{formatDate(new Date(listing.created_at))}</td>
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">
                                                <span className={`px-2 py-1 rounded text-xs ${listing.status === '1' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                    {listing.status === '1' ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageDashboard;