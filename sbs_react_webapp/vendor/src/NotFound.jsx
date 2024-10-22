/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! You've found the void.</p>
            <p className="text-lg text-gray-500 mb-4">
                It seems the page you're looking for has gone on a permanent vacation.
            </p>
            <p className="text-lg text-gray-500 mb-8">
                But don't worry, we've got plenty of other things to explore!
            </p>
            <button
                onClick={() => navigate("/")}
                className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
                Take Me Home
            </button>
            <p className="text-sm text-gray-400 mt-8">
                *Wherever that page is, it's sipping a coconut drink with a little umbrella in it.* 🍹
            </p>
        </div>
    );
};

export default NotFound;
