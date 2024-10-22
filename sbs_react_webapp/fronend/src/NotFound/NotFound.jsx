import React from 'react';

const NotFound = () => {
    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1">Error <span className="text-danger">404</span></h1>
                <p className="lead">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <p className="lead">Please try to <a href="/signin">return to the Sign in page</a>.</p>
                <p className="lead">Good luck.</p>
            </div>
        </div>
    );
};

export default NotFound;
