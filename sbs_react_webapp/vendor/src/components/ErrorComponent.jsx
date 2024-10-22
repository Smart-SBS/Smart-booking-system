/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

const ErrorComponent = ({ error }) => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-700 mb-4">
                    We're sorry, but we encountered an error while loading this page.
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error details: </strong>
                        <span className="block sm:inline">{error.message || 'Unknown error'}</span>
                    </div>
                )}
                <div className="flex justify-center">
                    <button
                        onClick={handleReload}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
