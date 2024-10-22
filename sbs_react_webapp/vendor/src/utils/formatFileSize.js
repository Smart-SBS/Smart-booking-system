// Function to format a file size in bytes into a human-readable string with appropriate units
function formatFileSize(bytes) {
    // Array of units representing bytes, kilobytes, megabytes, and gigabytes
    const units = ['B', 'KB', 'MB', 'GB'];

    // Initialize index for the units array
    let i = 0;

    // Loop to convert bytes into the appropriate unit by dividing by 1024
    // Continue until the file size is less than 1024 or the highest unit is reached
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024; // Convert to the next higher unit
        i++; // Move to the next unit
    }

    // Return the formatted file size with two decimal places and the appropriate unit
    return `${bytes.toFixed(2)} ${units[i]}`;
}

// Export the formatFileSize function as the default export
export default formatFileSize;
