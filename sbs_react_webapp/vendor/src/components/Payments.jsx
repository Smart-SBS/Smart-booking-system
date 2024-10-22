import { FaCreditCard, FaPaypal } from 'react-icons/fa';

const Payments = () => {
    return (
        <div className="max-w-full mx-auto p-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Billing Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="text-red-500 mr-2">□</span> Billing Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="col-span-2 p-2 border rounded" />
                        <input type="email" placeholder="Email" className="col-span-2 p-2 border rounded" />
                        <input type="tel" placeholder="Phone" className="p-2 border rounded" />
                        <input type="text" placeholder="City" className="p-2 border rounded" />
                        <input type="text" placeholder="State" className="p-2 border rounded" />
                        <input type="text" placeholder="Country" className="p-2 border rounded" />
                        <input type="text" placeholder="Address" className="col-span-2 p-2 border rounded" />
                        <input type="text" placeholder="Zip" className="col-span-2 p-2 border rounded" />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="text-pink-500 mr-2">□</span> Payment Method
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded">
                            <span>PayPal</span>
                            <FaPaypal className="text-blue-600 text-2xl" />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                            <span>Credit / Debit Card</span>
                            <div className="flex space-x-2">
                                <FaCreditCard className="text-red-500 text-2xl" />
                                <FaCreditCard className="text-blue-500 text-2xl" />
                                <FaCreditCard className="text-yellow-500 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Summary */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="text-red-500 mr-2">☆</span> Booking Summary
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    <h3 className="font-semibold col-span-2">Reservation Details</h3>
                    <span>Date</span>
                    <span className="text-right">18 Jun 2018</span>
                    <span>Time</span>
                    <span className="text-right">9pm-10pm</span>
                    <span>From</span>
                    <span className="text-right">10 Jan 2019</span>

                    <h3 className="font-semibold col-span-2 mt-4">Pricing Details</h3>
                    <span>Dinner</span>
                    <span className="text-right">$150</span>
                    <span>Reservation</span>
                    <span className="text-right">$60</span>
                    <span>Tax</span>
                    <span className="text-right">$53</span>
                    <span className="font-semibold">Total Cost</span>
                    <span className="text-right font-semibold">$263</span>
                </div>
            </div>
        </div>
    );
};

export default Payments;