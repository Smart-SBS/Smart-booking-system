import { AlertTriangle } from 'lucide-react';

const Error503Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <AlertTriangle className="mx-auto h-24 w-24 text-[#fa2964e6]" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">503 Service Unavailable</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Oops! It looks like our server is taking a quick break.
                    </p>
                </div>
                <div className="mt-8 bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">What happened?</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>
                                Our service is temporarily unavailable. This could be due to maintenance or capacity issues.
                            </p>
                        </div>
                        <div className="mt-5">  
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#fa2964e6] hover:bg-[#fa2964] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa2964e6]"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        If the problem persists, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error503Page;