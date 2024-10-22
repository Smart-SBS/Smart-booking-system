/* eslint-disable react/prop-types */
import { FaExclamationTriangle } from 'react-icons/fa';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex items-center justify-center text-red-500 mb-4">
                    <FaExclamationTriangle size={48} />
                </div>
                <h2 className="text-xl font-bold text-center mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 text-center mb-6">
                    Are you sure you want to delete this image? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;