/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CatalogueImageUploadForm = ({ onAddImage, onClose, catalogueId }) => {
    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            toast.error('Please select at least one file');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('catalog_image[]', file);
        });
        formData.append('catalog_id', catalogueId);

        try {
            const response = await axios.post(
                `${APP_URL}/ma-add-catalog-images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === 200) {
                toast.success(response.data.message);
                onAddImage();
            } else {
                toast.error(response.data.message || 'Upload failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Upload Images</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Select Images
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            multiple={true}
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {files.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm font-semibold">{files.length} file(s) selected</p>
                            <ul className="list-disc list-inside">
                                {files.map((file, index) => (
                                    <li key={index} className="text-sm">{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : (
                                <>
                                    <FaUpload className="mr-2" />
                                    Upload
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CatalogueImageUploadForm;