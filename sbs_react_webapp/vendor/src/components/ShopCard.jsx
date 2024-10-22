/* eslint-disable react/prop-types */
import { useCallback, useMemo } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidBusiness } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import getTimeAgo from "../utils/getDaysAgo";
import axios from "axios";

const ShopCard = ({ listing }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const navigate = useNavigate();

    const navigateToListing = useCallback(() => {
        navigate(`/shop/${(listing.slug).toLowerCase()}`, { state: { shopId: listing.id } });
    }, [navigate, listing.slug, listing.id]);

    // handle location search
    const handleLocation = useMemo(() => async (location) => {
        try {
            const response = await axios.get(`${API_URL}/ma-search?location=${location}`);

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                navigate(`/search?location=${location}`, { state: { searchResults: response.data } });
            } else {
                navigate('/search', { state: { message: `${location} doesn't have catalogs yet`, keyword: location } });
            }
        } catch (error) {
            let errorMessage = 'An error occurred while searching';
            if (error.response?.data?.message) {
                errorMessage = typeof error.response.data.message === 'object'
                    ? Object.values(error.response.data.message).join(', ')
                    : error.response.data.message;
            }
            console.error('Error fetching results:', errorMessage);
        }
    }, [API_URL, navigate]);

    return (
        <div className="bg-white overflow-hidden w-full h-full border-[#eaeff5] border-[1px] relative" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <span onClick={navigateToListing} className="block relative w-full h-[232px] cursor-pointer">
                <img
                    src={listing.primary_shop_image ? `${IMG_URL}/gallery/thumb/${listing.primary_shop_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                    className="w-full h-full object-cover brightness-95"
                    onError={(e) => { e.target.src = 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg' }}
                    alt={listing.shop_name}
                />
                <div className="absolute bottom-2 left-2 w-10 h-10 bg-black bg-opacity-50 rounded-full">
                    <img
                        src={listing.business_logo ? `${IMG_URL}/logo/list/${listing.business_logo}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => { e.target.src = 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg' }}
                        alt={listing.business_name}
                    />
                </div>
            </span>

            <div className="p-4 space-y-4 w-full h-full">
                <span onClick={navigateToListing}>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 cursor-pointer">{listing.shop_name || 'Shop Name Unavailable'}</h3>
                </span>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <BiSolidBusiness className="mr-2 text-[#fa2964e6]" size={18} />
                    <p>{listing.business_name || 'Business Name Unavailable'}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1 cursor-pointer">
                    <FaMapMarkerAlt className="mr-2 text-[#fa2964e6]" size={18} />
                    <p onClick={() => handleLocation(listing.area_name)}>{`${listing.area_name || 'Area Name Unavailable'}, ${listing.city_name || 'City Name Unavailable'}, ${listing.states_name || 'State Name Unavailable'}`}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-[#fa2964e6]" size={18} />
                    <p>Posted {getTimeAgo(listing.created_at)}</p>
                </div>
            </div>
        </div>
    )
}

export default ShopCard