/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardHeader from './DashboardHeader';
import Footer from "./Footer";

const NoDataFound = () => {
    // Use location to fetch search results from the previous page
    const location = useLocation();
    const [message, setMessage] = useState('')

    // Fetch listings when the search results change
    useEffect(() => {
        const errorMessage = location.state?.message || '';
        setMessage(errorMessage);
    }, [location.state?.message]);

    return (
        <>
            <DashboardHeader />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{message}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        We couldn't find any data to display at the moment.
                    </p>
                    <div className="mt-6">
                        <Link
                            to='/'
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Home Page
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NoDataFound;