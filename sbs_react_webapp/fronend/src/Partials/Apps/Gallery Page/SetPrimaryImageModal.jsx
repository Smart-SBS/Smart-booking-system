import React from 'react';

const SetPrimaryImageModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set Primary Image</h5>
                        <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to set this image as the primary image?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Set Primary</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetPrimaryImageModal;
