/* eslint-disable react/prop-types */

const ShopOverview = ({ shopData }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 mt-8">
            <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">
                Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
                {shopData.shop_overview || 'Overview not available'}
            </p>
        </div>
    )
}

export default ShopOverview