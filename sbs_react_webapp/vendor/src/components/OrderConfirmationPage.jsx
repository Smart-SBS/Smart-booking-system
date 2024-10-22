/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const { width, height } = useWindowSize();
    const [confettiRunning, setConfettiRunning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setConfettiRunning(false);
        }, 5000); // Run confetti for 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {confettiRunning && <Confetti width={width} height={height} />}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
                <p className="text-xl text-gray-700 mb-6">
                    Thank you for your order. We're excited to serve you soon!
                </p>
                <Link
                    to="/my-orders"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                >
                    View My Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;