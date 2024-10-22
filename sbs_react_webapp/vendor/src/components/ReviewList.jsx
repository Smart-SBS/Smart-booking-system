/* eslint-disable react/prop-types */
import { StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaEdit, FaTrash, FaReply } from 'react-icons/fa';
import AddReview from './AddReview';
import EditReview from './EditReview';
import CustomerFeedback from './CustomerFeedback';
import { useSelector } from 'react-redux';

const ReviewList = ({ catalogueId, catalogueData }) => {
    // Access token
    const { token, userId } = useSelector(state => state.auth);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [isVendor, setIsVendor] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [error, setError] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [formError, setFormError] = useState('')
    const [editingReplyId, setEditingReplyId] = useState(null);

    // Fetch reviews and set user information
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-reviews/${catalogueId}`);
            if (response.data.status === 200) {
                setReviews(response.data.Review);
                setError(false);
                if (token) {
                    setIsVendor(userId === catalogueData.user_id);
                }
            } else {
                setReviews([]);
                setError(true);
            }
        } catch (err) {
            console.error(`Error fetching reviews: ${err.response?.data?.message || err.message}`);
            setReviews([]);
            setError(true);
        }
    };

    useEffect(() => {
        if ((catalogueId && catalogueData) || reviewAdded) {
            fetchReviews();
        }
    }, [reviewAdded, catalogueId, catalogueData]);

    // Handle review edition
    const handleEdit = (review) => {
        setEditingReview(review);
    };

    // Handle review updation
    const handleUpdate = async (updatedReview) => {
        const formData = new FormData()
        formData.append("rating", updatedReview.rating);
        formData.append("review_text", updatedReview.review_text);
        formData.append("catalog_id", catalogueId);
        try {
            const response = await axios.post(`${APP_URL}/ma-edit-review/${updatedReview.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.status === 200) {
                toast.success(response.data.message);
                setEditingReview(null);
                setReviewAdded(!reviewAdded);
            }
        } catch (error) {
            console.error(`Error updating review: ${error.response?.data?.message || error.message}`);
        }
    };

    // Handle review deletion
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/ma-delete-review/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.status === 200) {
                toast.success(response.data.message)
                setReviewAdded(!reviewAdded)
            }
        } catch (error) {
            console.error(`Error deleting review: ${error.response?.data?.message || error.message}`);
        }
    }

    // Handle initiating a reply or editing a reply
    const handleReply = (reviewId, existingReply = '') => {
        if (isVendor) {
            setReplyingTo(reviewId);
            setReplyText(existingReply);
            setEditingReplyId(existingReply ? reviewId : null);
        } else {
            toast.error("Only the vendor can reply to reviews.");
        }
    };

    // Handle submitting a reply (new or edited)
    const handleSubmitReply = async (reviewId) => {
        if (!isVendor) {
            toast.error("Only the vendor can reply to reviews.");
            return;
        }

        if (!replyText.trim()) {
            setFormError('Reply text cannot be empty');
            return;
        }

        const formData = new FormData();
        formData.append('reply', replyText);
        try {
            const response = await axios.post(`${APP_URL}/ma-reply-review/${reviewId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.data.status === 200) {
                toast.success(editingReplyId ? 'Reply updated successfully' : 'Reply added successfully');
                setReplyingTo(null);
                setReplyText('');
                setEditingReplyId(null);
                fetchReviews(); // Refresh reviews to show the new/updated reply
            }
        } catch (error) {
            console.error('Error adding/updating reply:', error);
            toast.error('Failed to add/update reply');
        }
    };

    // Render a single review with potential reply
    const renderReview = (review, isUserReview = false) => (
        <div key={review.id} className="pb-4 border-gray-200 mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <img
                        src={`${IMG_URL}/profile/list/${review.profile_picture}`}
                        alt={review.firstname}
                        className="w-12 h-12 rounded-full mr-3 object-cover"
                        onError={(e) => { e.target.src = `${IMG_URL}/default/list/user.webp`; }}
                    />
                    <div>
                        <h4 className="font-semibold text-lg">{review.firstname} {review.lastname}</h4>
                        <span className="text-gray-500 text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex mr-4">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    {isUserReview && (
                        <>
                            <button onClick={() => handleEdit(review)} className="text-blue-500 mr-2" aria-label="Edit"><FaEdit /></button>
                            <button onClick={() => handleDelete(review.id)} className="text-red-500" aria-label="Delete"><FaTrash /></button>
                        </>
                    )}
                    {isVendor && !isUserReview && (
                        review.reply ? (
                            <button
                                onClick={() => handleReply(review.id, review.reply)}
                                className="text-blue-500 ml-2"
                                aria-label="Edit Reply"
                            >
                                <FaEdit />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleReply(review.id)}
                                className="text-green-500 ml-2"
                                aria-label="Reply"
                            >
                                <FaReply />
                            </button>
                        )
                    )}
                </div>
            </div>
            <p className="text-gray-700 mb-4">{review.review_text}</p>

            {review.reply && replyingTo !== review.id && (
                <div className="ml-8 p-3 bg-gray-100 rounded-lg">
                    <p className="font-semibold">Response from the owner</p>
                    <p>{review.reply}</p>
                </div>
            )}

            {replyingTo === review.id && (
                <div className="mt-4">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Type your reply..."
                    />
                    <div className="mt-3">
                        {
                            formError ?
                                <p className='text-red-500 m-2'>{formError}</p>
                                : null
                        }
                        <button
                            onClick={() => handleSubmitReply(review.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            {editingReplyId ? 'Update Reply' : 'Submit Reply'}
                        </button>
                        <button
                            onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                                setEditingReplyId(null);
                            }}
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    // Check if the user has reviewed this catalogue
    const userReview = reviews.find((review) => review.user_id === userId);

    return (
        <>
            {error || reviews.length === 0 ? (
                <div className="text-center text-gray-500 m-4">
                    No reviews found for this catalogue.
                </div>
            ) : (
                <>
                    <CustomerFeedback reviews={reviews} />
                    {userReview && (
                        <div className="mb-8 p-4 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
                            <h3 className="text-xl font-bold mb-4">Your Review</h3>
                            {editingReview && editingReview.id === userReview.id ? (
                                <EditReview
                                    review={editingReview}
                                    onUpdate={handleUpdate}
                                    onCancel={() => setEditingReview(null)}
                                />
                            ) : (
                                renderReview(userReview, true)
                            )}
                        </div>
                    )}

                    <div className="mb-8 p-4 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
                        <h3 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">All Reviews</h3>
                        <div className="space-y-6">
                            {reviews.filter(review => review.user_id !== userId).map((review) => renderReview(review))}
                        </div>
                    </div>
                </>
            )}
            {!userReview && !isVendor && <AddReview catalogueId={catalogueId} onAdd={setReviewAdded} />}
        </>
    );
};

export default ReviewList;