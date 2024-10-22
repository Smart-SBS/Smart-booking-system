const formatTimeTo12Hour = (time) => {
    if (time === "00:00:00") return "Closed"; // Handle closed case
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHour}:${minutes} ${ampm}`;
};

export default formatTimeTo12Hour