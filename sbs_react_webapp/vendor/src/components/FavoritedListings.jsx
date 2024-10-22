import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaHeart, FaTrash } from 'react-icons/fa';
import formatDate from '../utils/formatDate';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingFallback from '../utils/LoadingFallback';

// eslint-disable-next-line react/prop-types
const DashboardCard = ({ icon, count, label, color }) => (
    <div className={`rounded-lg p-4 text-white flex items-center`} style={{ backgroundColor: color }}>
        <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">{icon}</div>
        <div>
            <div className="text-2xl sm:text-3xl font-bold">{count}</div>
            <div className="text-xs sm:text-sm">{label}</div>
        </div>
    </div>
);

const FavoritedListings = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { token, userId } = useSelector(state => state.auth);

    const [wishlistData, setWishlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWishlistData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/ma-wishlist/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setWishlistData(response.data.Wishlists);
            }
        } catch (error) {
            console.error('Error fetching wishlist data:', error);
            setError('Failed to fetch favorited listings. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWishlistData();
        }
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/ma-delete-wishlist/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success('Item removed from wishlist');
                fetchWishlistData();
            }
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
            setError('Failed to delete the item. Please try again later.');
        }
    };

    if (isLoading) return <LoadingFallback />;

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Favorited Listings</h1>

            <div className="mb-6 sm:mb-8">
                <DashboardCard
                    icon={<FaHeart />}
                    count={wishlistData.length}
                    label="Favorited Listings"
                    color="#f91942"
                />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Favorited Listings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Item Title</th>
                                <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Date Added</th>
                                <th className="text-left py-2 px-3 sm:py-3 sm:px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">No favorited listings found</td>
                                </tr>
                            ) : (
                                wishlistData.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <Link to={`/catalogue-details/${item.catalog_id}`}>
                                            <td className="py-2 px-3 sm:py-3 sm:px-4">{item.item_title}</td>
                                        </Link>
                                        <td className="py-2 px-3 sm:py-3 sm:px-4">{formatDate(new Date(item.updated_at))}</td>
                                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FavoritedListings;
