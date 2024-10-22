export default function slugToShopName(slug) {
    // Replace hyphens with spaces
    const words = slug.split('-');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a string
    return capitalizedWords.join(' ');
}