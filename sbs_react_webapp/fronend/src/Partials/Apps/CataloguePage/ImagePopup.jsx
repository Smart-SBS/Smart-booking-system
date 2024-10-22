import React from 'react';
import './ImagePopup.css';

const ImagePopup = ({ image, onClose }) => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={`${IMG_URL}/catalog-image/thumb/${image.image}`} className="img-fluid uncropped-image mb-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;
