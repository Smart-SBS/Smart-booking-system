/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ImageUploadForm = ({ onClose, onAddImage, catalogId }) => {
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('catalog_id', catalogId);
        Array.from(files).forEach((file) => {
            formData.append('catalog_image[]', file);
        });

        try {
            const response = await axios.post(`${APP_URL}/api/add-catalog-images`, formData, config);
            if (response.status === 200) {
                toast.success(response.data.message);
                onAddImage();
                onClose();
            } else {
                toast.error(response?.data?.message || 'An error occurred');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <Toaster />
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Images</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="imageFiles" className="form-label">Choose Images</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imageFiles"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Upload Images</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadForm;
