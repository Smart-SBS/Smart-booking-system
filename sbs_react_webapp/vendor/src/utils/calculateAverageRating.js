// Function to calculate the average rating from a comma-separated string of ratings
const calculateAverageRating = (ratingString = "") => {
    // Convert the comma-separated string into an array of numbers
    const ratingsArray = ratingString.split(',').map(Number);

    // Calculate the sum of the ratings
    const sum = ratingsArray.reduce((a, b) => a + b, 0);

    // Calculate the average and avoid division by zero
    const average = ratingsArray.length ? sum / ratingsArray.length : 0;

    // Return the average rounded to one decimal place
    return average.toFixed(1);
};

// Export the calculateAverageRating function as the default export
export default calculateAverageRating;
