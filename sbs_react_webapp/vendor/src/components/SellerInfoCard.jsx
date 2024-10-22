/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Mail } from 'lucide-react';
import { BiSolidBusiness } from 'react-icons/bi';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const SellerInfoCard = ({ catalogueData }) => {
    const IMG_URL = import.meta.env.VITE_IMG_URL

    return (
        <div className={`max-w-sm bg-white p-6 border-[#eaeff5] border-[1px]`} style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">
                Business Info
            </h2>
            <div className="flex items-start justify-start gap-2">
                <img
                    src={catalogueData?.business_logo ? `${IMG_URL}/logo/list/${catalogueData?.business_logo}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                    alt={catalogueData?.business_name || "Business Name"}
                    className="h-11 w-11 rounded-full border-2 border-[#fa2964] object-cover"
                    onError={(e) => { e.target.src = 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg' }}
                />
                <div>
                    <h3 className="font-semibold mb-2">
                        {catalogueData?.firstname && catalogueData?.lastname
                            ? `${catalogueData?.firstname} ${catalogueData?.lastname}`
                            : 'Owner Info not available'}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <BiSolidBusiness className="mr-2 text-[#fa2964e6]" size={18} />
                        <p>{catalogueData?.business_name || 'Business Name Unavailable'}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Mail className="mr-2 text-[#fa2964]" size={16} />
                        <p>{catalogueData?.business_email || 'Business Email Unavailable'}</p>
                    </div>
                </div>
            </div>

            {/* <div className="flex space-x-2">
                <FaFacebookF className="text-[#fa2964] hover:text-pink-600 cursor-pointer" size={20} />
                <FaTwitter className="text-[#fa2964] hover:text-pink-600 cursor-pointer" size={20} />
                <FaLinkedinIn className="text-[#fa2964] hover:text-pink-600 cursor-pointer" size={20} />
            </div> */}
        </div>
    );
};

export default SellerInfoCard;
