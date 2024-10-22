/* eslint-disable react/prop-types */
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthPopup } from '../redux/slices/authPopupSlice';

const AddReview = ({ catalogueId, onAdd }) => {
    // Access token
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // State initialisation
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle rating changes
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    // Handle review submission
    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!token) {
            dispatch(openAuthPopup());
            return;
        }

        if ((rating === 0) && (reviewText.trim() === '')) {
            toast.error('Please enter both rating and the reivew');
            return;
        }

        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('review_text', reviewText);
            formData.append('catalog_id', catalogueId);
            const response = await axios.post(`${APP_URL}/ma-add-review`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setRating(0);
                setReviewText('');
                onAdd(prev => !prev)
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error adding review: ${errorMessages}`);
            } else {
                toast.error(`Error adding review: ${error.response?.data?.message || error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-8 p-4 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <Toaster />
            <h3 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Add Review</h3>
            <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-700 mb-2">Your Rating</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                className={`h-8 w-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                onClick={() => handleRatingClick(star)}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="review" className="block text-gray-700 mb-2">Your Review</label>
                    <textarea
                        id="review"
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className={`bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 disabled:bg-pink-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default AddReview;