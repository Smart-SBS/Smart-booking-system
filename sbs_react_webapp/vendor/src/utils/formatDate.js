// Function to format a Date object into a YYYY-MM-DD string
function formatDate(date) {
    // Get the full year from the Date object
    const year = date.getFullYear();

    // Get the month from the Date object and add 1 (since getMonth() returns 0-11)
    // Convert the month to a string and pad with a leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Get the day of the month from the Date object
    // Convert the day to a string and pad with a leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0');

    // Combine the year, month, and day into a YYYY-MM-DD formatted string
    return `${year}-${month}-${day}`;
}

// Export the formatDate function as the default export
export default formatDate;
