import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
            <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
            <p className="text-sm text-gray-500">Please wait while we prepare your content.</p>
        </div>
    </div>
);

export default LoadingFallback