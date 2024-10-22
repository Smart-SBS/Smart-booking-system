/* eslint-disable react/prop-types */
import { MapPin, User } from 'lucide-react';

const ShopInfo = ({ shopData }) => {
    const address = shopData.area_name && shopData.city_name && shopData.states_name
        ? `${shopData.area_name}, ${shopData.city_name}, ${shopData.states_name}`
        : 'Address not available';

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8">
            <h1 className="text-3xl font-bold mb-4">{shopData.shop_name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-6 ml-3">
                <div className="flex items-center">
                    <MapPin className="mr-3 text-[#fa2964]" size={20} />
                    <p className="text-gray-700">{address}</p>
                </div>
                <div className="flex items-center">
                    <User className="mr-3 text-[#fa2964]" size={20} />
                    <p className="text-gray-700">{shopData.shop_contact_person || 'Contact Person not available'}</p>
                </div>
            </div>
        </div>
    );
};

export default ShopInfo;