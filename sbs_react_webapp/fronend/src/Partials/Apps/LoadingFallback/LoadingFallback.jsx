import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center">
            <Loader2 className="w-12 h-12 mb-4 text-primary spinner-border mx-auto" />
            <p className="h5 font-weight-bold text-dark">Loading...</p>
            <p className="small text-muted">Please wait while we prepare your content.</p>
        </div>
    </div>
);

export default LoadingFallback;