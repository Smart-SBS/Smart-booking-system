import React from 'react';

// Function to generate a star rating as an array of SVG elements
const generateStarRating = (averageRating, totalStars = 5) => {
    // Create an array with length equal to totalStars and map over it
    return [...Array(totalStars)].map((_, i) => {
        // Calculate the star's value (1-based index)
        const starValue = i + 1;

        // Determine if this should be a full star (completely filled)
        const isFullStar = starValue <= Math.floor(averageRating);

        // Determine if this should be a half star (partially filled)
        const isHalfStar = !isFullStar && starValue - 0.5 <= averageRating;

        // Define SVG properties common to all stars
        const svgProps = {
            key: i, // Unique key for each star in the array
            className: `w-4 h-4 ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-gray-300'}`, // Color depends on whether the star is filled or not
            fill: "currentColor", // Use current text color for fill
            viewBox: "0 0 20 20", // Set the SVG viewbox
        };

        // Determine the SVG path data based on whether the star is full, half, or empty
        let pathData;
        if (isFullStar) {
            // Full star SVG path data
            pathData = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
        } else if (isHalfStar) {
            // Half star SVG path data
            pathData = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292zM10 15.95V4.05";
        } else {
            // Empty star SVG path data
            pathData = "M10 2l2.09 6.26H18l-5.18 3.76 1.99 6.02L10 13.52 6.18 18l1.99-6.02L3 8.26h5.91L10 2z";
        }

        // Create and return the SVG element for this star
        return React.createElement('svg', svgProps, React.createElement('path', { d: pathData }));
    });
}

// Export the generateStarRating function as the default export
export default generateStarRating;