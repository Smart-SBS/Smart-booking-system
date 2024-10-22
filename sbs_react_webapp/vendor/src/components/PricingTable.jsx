/* eslint-disable react/prop-types */

const PricingTable = ({ catalogueData }) => {
    // If there's no catalogueData or it's an empty object, show a message
    if (!catalogueData || Object.keys(catalogueData).length === 0) {
        return <div className="text-start text-gray-500 text-lg m-4">
            No pricing data available.
        </div>;
    }

    // Helper function to calculate the final sale price
    const calculateFinalPrice = (salePrice, platformFee, platformFeeType) => {
        if (platformFeeType === "%") {
            return salePrice + (salePrice * platformFee / 100);
        } else if (platformFeeType === "flat") {
            return salePrice + platformFee;
        }
        return salePrice;
    };

    // Extracting the relevant fields from catalogueData
    const salePrice = parseFloat(catalogueData.sale_price || 0);
    const platformFee = parseFloat(catalogueData.platform_fee || 0);
    const platformFeeType = catalogueData.platform_fee_type || "flat";

    const finalPrice = calculateFinalPrice(salePrice, platformFee, platformFeeType);

    return (
        <div className="mb-8 p-4 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <h3 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">
                Pricing
            </h3>
            <table className="w-full mt-4">
                <thead>
                    <tr className="bg-purple-50">
                        <th className="text-left text-[#fa2964] py-2 px-4">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 text-gray-700">
                            ₹ {finalPrice.toFixed(2) || 'N/A'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PricingTable;