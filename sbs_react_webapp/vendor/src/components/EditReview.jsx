/* eslint-disable react/prop-types */
import { useState } from "react";

const EditReview = ({ review, onUpdate, onCancel }) => {
    // Initialize state initialization
    const [rating, setRating] = useState(review.rating);
    const [reviewText, setReviewText] = useState(review.review_text);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...review, rating, review_text: reviewText });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label className="block mb-2">Rating:</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Review:</label>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                ></textarea>
            </div>
            <div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
};

export default EditReview