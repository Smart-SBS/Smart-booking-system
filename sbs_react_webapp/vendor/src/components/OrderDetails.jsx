/* eslint-disable react/prop-types */

const OrderDetails = ({ orderDetails }) => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const { shop_info, order_info } = orderDetails;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                <div className="relative">
                    <img
                        src={`${IMG_URL}/catalog-image/thumb/${shop_info.shop_image}`}
                        alt={shop_info.shop_name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                        <div className="p-4 text-white">
                            <h2 className="text-2xl font-bold">{shop_info.catalog_name}</h2>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <InfoSection
                            icon={<MapPinIcon />}
                            title="Shop Details"
                            details={[
                                { label: 'Name', value: shop_info.shop_name },
                                { label: 'Owner', value: shop_info.vendor },
                                { label: 'Address', value: `${shop_info.area_name}, ${shop_info.city_name}, ${shop_info.states_name}` }
                            ]}
                        />
                        <InfoSection
                            icon={<CalendarIcon />}
                            title="Visit Details"
                            details={[
                                { label: 'Date', value: new Date(order_info.visit_date).toLocaleDateString() },
                                { label: 'Time', value: new Date(order_info.visit_time).toLocaleTimeString() }
                            ]}
                        />
                        {/* {order_info.message && (
                            <InfoSection
                                icon={<MessageSquareIcon />}
                                title="Message"
                                details={[{ value: order_info.message }]}
                            />
                        )} */}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center text-gray-600">
                            <DollarSignIcon />
                            <span className="text-sm font-medium ml-2">Total Price</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">₹{order_info.final_price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoSection = ({ icon, title, details }) => (
    <div className="space-y-2">
        <div className="flex items-center space-x-2">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="ml-7">
            {details.map((detail, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600 mb-1">
                    {detail.label && (
                        <span className="font-bold mr-2">{detail.label}:</span>
                    )}
                    <span>{detail.value}</span>
                </div>
            ))}
        </div>
    </div>
);

// Simple icon components using SVG
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

// const MessageSquareIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
//     </svg>
// );

const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
);

// const ChevronRightIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mx-1" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//     </svg>
// );

export default OrderDetails;