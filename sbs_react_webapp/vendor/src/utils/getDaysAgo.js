function getTimeAgo(date) {
    const today = new Date();
    const postedDate = new Date(date);

    // Calculate the difference in time (in milliseconds)
    const timeDifference = today - postedDate;

    // Convert time difference to days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysAgo >= 1) {
        // If more than 1 day has passed, return the difference in days
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else {
        // If less than a day has passed, calculate the hours
        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
        return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    }
}

export default getTimeAgo;