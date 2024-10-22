import axios from 'axios';

// Asynchronous function to fetch geographic coordinates (latitude and longitude) based on a location name
const getCoordinates = async (location) => {
    // Construct the API endpoint URL using the location query, encoded to handle special characters
    const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    try {
        // Make an HTTP GET request to the Nominatim API to fetch location data
        const response = await axios.get(endpoint);

        // Extract the first result from the API response data
        const data = response.data[0];

        // Return an object containing the latitude and longitude as numbers
        return {
            lat: parseFloat(data.lat), // Convert the latitude from a string to a float
            lon: parseFloat(data.lon)  // Convert the longitude from a string to a float
        };
    } catch (error) {
        // Log an error message to the console if the request fails
        console.error('Error fetching coordinates:', error);

        // Return null to indicate that the coordinates could not be retrieved
        return null;
    }
};

// Export the getCoordinates function as the default export
export default getCoordinates;
