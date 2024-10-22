import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Sidebar from './Sidebar';
import LeftSidebar from './LeftSidebar';
import CommonHeader from './CommonHeader';
import axios from 'axios';
import OrderDetails from './OrderDetails';
import toast, { Toaster } from 'react-hot-toast';

const CheckoutPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const token = useSelector(state => state.auth.token);
    const { state } = useLocation();
    const orderDetails = state?.orderDetails;
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const toggleRightSidebar = () => {
        setRightSidebarOpen(prev => !prev);
    };

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(prev => !prev);
    };

    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
    };

    const handlePlaceOrder = async () => {
        try {
            const dateObj = new Date(orderDetails.order_info.visit_time);
            const formattedTime = dateObj.toTimeString().split(' ')[0].slice(0, 5);

            // Format visit_date to YYYY-MM-DD
            const formattedDate = new Date(orderDetails.order_info.visit_date).toISOString().split('T')[0];

            const formdata = new FormData();
            formdata.append('catalog_id', orderDetails.shop_info.catalog_id);
            formdata.append('vendor_id', orderDetails.shop_info.vendor_id);
            formdata.append('visit_date', formattedDate);
            formdata.append('visit_time', formattedTime);
            formdata.append('message', orderDetails.order_info.message);
            formdata.append('sale_price', orderDetails.order_info.sale_price);
            formdata.append('final_price', orderDetails.order_info.final_price.toFixed(2));
            formdata.append('payment_method', paymentMethod);

            const res = await axios.post(`${API_URL}/ma-place-order`, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/order-confirmation')
                }, 1000);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const renderOrderDetails = () => (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={`${IMG_URL}/catalog-image/thumb/${orderDetails.shop_info.shop_image}`}
                    alt={orderDetails.shop_info.shop_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="p-4 text-white">
                        <h2 className="text-2xl font-bold">{orderDetails.shop_info.catalog_name}</h2>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Shop Details</h3>
                    <p><b>Name:</b> {orderDetails.shop_info.shop_name}</p>
                    <p><b>Owner:</b> {orderDetails.shop_info.vendor}</p>
                    <p><b>Address:</b> {orderDetails.shop_info.area_name}, {orderDetails.shop_info.city_name}, {orderDetails.shop_info.states_name}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Visit Details</h3>
                    <p><b>Date:</b> {new Date(orderDetails.order_info.visit_date).toLocaleDateString()}</p>
                    <p><b>Time:</b> {new Date(orderDetails.order_info.visit_time).toLocaleTimeString()}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Total Price</h3>
                    <p className="text-2xl font-bold text-green-600">₹{orderDetails.order_info.final_price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );

    const renderPaymentOptions = () => (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
            <div className="mb-4">
                <label className="flex items-center space-x-3 text-gray-700 text-lg">
                    <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span>Pay On Visit</span>
                </label>
            </div>
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
                Place Order
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster />
            <div className={`fixed inset-y-0 left-0 transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <LeftSidebar isOpen={leftSidebarOpen} />
            </div>

            <div className={`fixed inset-y-0 right-0 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <Sidebar />
            </div>

            <CommonHeader
                toggleLeftSidebar={toggleLeftSidebar}
                toggleRightSidebar={toggleRightSidebar}
            />

            <div className="container mx-auto mt-28 p-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
                {isLoggedIn ? (
                    <div className="max-w-3xl mx-auto">
                        <OrderDetails orderDetails={orderDetails} />
                        {renderPaymentOptions()}
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="md:w-1/2">
                            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                                <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                                <RegisterForm isOpen={true} onClose={() => { }} />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            {renderOrderDetails()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;