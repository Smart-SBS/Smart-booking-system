/* eslint-disable react/prop-types */
import { FaTimes } from 'react-icons/fa';

const ImagePopup = ({ image, onClose, path }) => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Image Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                <img
                    src={`${IMG_URL}${path}${image.image}`}
                    alt="Full size"
                    className="w-full h-auto max-h-[70vh] object-contain"
                />
            </div>
        </div>
    );
};

export default ImagePopup;