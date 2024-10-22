import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingFallback from "../utils/LoadingFallback";
import { useSelector } from 'react-redux';
import slugToShopName from '../utils/slugToShopName';

const ReviewPage = () => {
    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL and Image URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const Img_url = import.meta.env.VITE_IMG_URL;

    // State initialization
    const { catalogueName, catalogueId, shopId, shopName } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('date');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${APP_URL}/ma-reviews/${catalogueId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const result = response.data;
                if (result.status === 200 && result.Review) {
                    setReviews(result.Review);
                    setHasError(false);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setHasError(true);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [catalogueId, APP_URL, token]);

    const reviewsPerPage = 10;

    const sortedReviews = useMemo(() => {
        return [...reviews].sort((a, b) => {
            if (sortBy === 'date') return parseInt(b.id) - parseInt(a.id);
            if (sortBy === 'rating') return parseInt(b.rating) - parseInt(a.rating);
            return 0;
        });
    }, [reviews, sortBy]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
        return (sum / reviews.length).toFixed(1);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

    const renderStars = (rating) => '★'.repeat(Math.min(rating, 5)) + '☆'.repeat(Math.max(5 - rating, 0));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedReviews.length / reviewsPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    if (loading) return <LoadingFallback />;

    return (
        <div className="container mx-auto p-4 text-black shadow-md bg-white">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">{slugToShopName(catalogueName)} Reviews</h1>
                <div className="flex gap-2">
                    <Link
                        className="px-4 py-2 bg-[#fa2964e6] border shadow text-white rounded hover:bg-pink-600 hover:text-white transition-colors"
                        to={`/catalogues/${shopName}/${shopId}`}
                    >
                        Back
                    </Link>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Total Reviews</h2>
                        <h3 className="text-2xl text-green-600">{reviews.length}</h3>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Average Rating</h2>
                        <h3 className="text-2xl">
                            {calculateAverageRating(reviews)}
                            <small className="text-yellow-500 ml-2">{renderStars(Math.round(calculateAverageRating(reviews)))}</small>
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <label htmlFor="sortSelect" className="mr-2">Sort by:</label>
                        <select
                            id="sortSelect"
                            className="border rounded-md p-2"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Date</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {
                reviews.length === 0 || hasError ? (
                    <div className='h-16'>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-3">
                            No reviews found for this catalogue.
                        </div>
                    </div>
                ) : (
                    <>
                        {currentReviews.map((review) => (
                            <div key={review.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <img
                                            src={review.profile_picture ? `${Img_url}/profile/list/${review.profile_picture}` : `${Img_url}/default/list/user.webp`}
                                            alt={review.firstname || "User profile"}
                                            className="w-12 h-12 rounded-full mr-4 object-cover"
                                            onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold">{review.firstname} {review.lastname} <span className="text-yellow-500 ml-2">{renderStars(parseInt(review.rating))}</span></h4>
                                            <p className="text-sm text-gray-500">Review ID: {review.id}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4">{review.review_text}</p>
                            </div>
                        ))}

                        {
                            reviews.length > 10 ?
                                <nav className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#fa2964e6] text-white hover:bg-pink-600'}`}
                                    >
                                        Previous
                                    </button>
                                    <div className="flex space-x-2">
                                        {Array.from({ length: Math.ceil(sortedReviews.length / reviewsPerPage) }).map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => paginate(index + 1)}
                                                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-[#fa2964e6] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === Math.ceil(sortedReviews.length / reviewsPerPage)}
                                        className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(sortedReviews.length / reviewsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#fa2964e6] text-white hover:bg-pink-600'}`}
                                    >
                                        Next
                                    </button>
                                </nav> : null
                        }
                    </>
                )
            }
        </div>
    );
};

export default ReviewPage;
