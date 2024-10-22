/* eslint-disable react/prop-types */
import { StarIcon } from 'lucide-react';

const CustomerFeedback = ({ reviews }) => {
    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) / reviews.length;
    const roundedAverageRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place

    // Count ratings
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
        ratingCounts[review.rating]++;
    });

    return (
        <div className="w-full p-6 bg-white mb-4 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Customer Feedback</h2>

            <div className="flex items-start mb-6">
                <div className="mr-6">
                    <div className="text-4xl font-bold">{roundedAverageRating}</div>
                    <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                </div>

                <div className="flex-grow">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = (ratingCounts[rating] / reviews.length) * 100;
                        return (
                            <div key={rating} className="flex items-center mb-2">
                                <span className="w-12 text-sm">{rating} Stars</span>
                                <div className="flex-grow bg-gray-200 rounded-md h-6 mx-2">
                                    <div
                                        className="bg-yellow-400 rounded-md h-6"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="w-8 text-right text-sm text-gray-600">{Math.round(percentage)}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CustomerFeedback;