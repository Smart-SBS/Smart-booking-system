import { CheckCircleIcon } from '@heroicons/react/24/solid';

const amenities = [
    'Private Parking', 'Valet Parking', 'Credit Cards', 'Wheelchair Accessible',
    'Full Bar', 'Free Wi-Fi', 'Outdoor Seating', 'Live Music'
];

const AmenitiesList = () => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{amenity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesList;