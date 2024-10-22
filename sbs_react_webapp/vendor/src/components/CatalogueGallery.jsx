/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaTrash, FaStar } from 'react-icons/fa';
import ImagePopup from './ImagePopup';
import CatalogueImageUploadForm from './CatalogueImageUploadForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SetPrimaryImageModal from './SetPrimaryImageModal';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import slugToShopName from '../utils/slugToShopName';

const CatalogueGallery = () => {
    const { catalogueId, catalogueName, shopName, shopId } = useParams();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showSetPrimaryConfirmation, setShowSetPrimaryConfirmation] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [imageToSetPrimary, setImageToSetPrimary] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL and Image URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const path = '/catalog-image/thumb/'

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-catalog-gallery/${catalogueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.status === 200) {
                setImages(response.data.gallery);
            } else {
                setHasError(true);
            }
        } catch (err) {
            setHasError(true);
        }
    };

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogueId, refreshTrigger]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
    };

    const handleAddImage = () => {
        setShowUploadForm(false);
        setRefreshTrigger(prev => !prev);
    };

    const handleDeleteClick = (image, event) => {
        event.stopPropagation();
        setImageToDelete(image);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        if (imageToDelete) {
            try {
                const response = await axios.delete(`${APP_URL}/ma-delete-catalog-image/${imageToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data.status === 200) {
                    toast.success(response.data.message);
                    setImages(images.filter(img => img.id !== imageToDelete.id));
                    setShowDeleteConfirmation(false);
                    setImageToDelete(null);
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
        setImageToDelete(null);
    };

    const handleSetPrimaryClick = (image, event) => {
        event.stopPropagation();
        setImageToSetPrimary(image);
        setShowSetPrimaryConfirmation(true);
    };

    const handleModalClose = () => {
        setShowUploadForm(false)
        setRefreshTrigger(prev => !prev)
        window.location.reload()
    }

    const handleSetPrimaryConfirm = async () => {
        if (imageToSetPrimary) {
            try {
                const response = await axios.put(`${APP_URL}/ma-set-catalog-primary-image/${imageToSetPrimary.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data.status === 200) {
                    setImages(images.map(img => ({
                        ...img,
                        is_primary_catalog_image: img.id === imageToSetPrimary.id ? '1' : '0'
                    })));
                    toast.success(response.data.message);
                    setShowSetPrimaryConfirmation(false);
                    setImageToSetPrimary(null);
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    };

    const handleSetPrimaryCancel = () => {
        setShowSetPrimaryConfirmation(false);
        setImageToSetPrimary(null);
    };

    return (
        <div className="px-4 py-3">
            <Toaster />
            <div className='bg-white text-black rounded-lg shadow-md'>
                <div className="p-4 flex flex-col md:flex-row justify-between items-center">
                    <h6 className="text-2xl font-bold mb-4 md:mb-0">{`Welcome to ${slugToShopName(catalogueName) }'s Gallery`}</h6>
                    <div className='flex md:flex-row items-start justify-start gap-2'>
                        <button
                            className="bg-[#04AA6D] text-white px-4 py-2 rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                            onClick={() => setShowUploadForm(true)}
                        >
                            <FaPlus className="mr-2" /> Add Image
                        </button>
                        <Link
                            to={`/catalogues/${shopName}/${shopId}`}
                            className='bg-[#fa2964e6] text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors'
                        >
                            Back
                        </Link>
                    </div>
                </div>
                {hasError ? (
                    <div className='h-16'>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-3">
                            No images found for this catalogue.
                        </div>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {images.map((image, index) => (
                            <li
                                key={image.id}
                                className="relative group"
                                style={{
                                    border: image.is_primary_catalog_image === '1' ? '4px solid limegreen' : 'none',
                                    borderRadius: '10px'
                                }}
                            >
                                <img
                                    src={`${IMG_URL}${path}${image.image}`}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => handleDeleteClick(image, e)}
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    className={`absolute top-2 right-14 ${image.is_primary_catalog_image === '1' ? 'bg-green-500' : 'bg-blue-500'
                                        } text-white p-2 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300`}
                                    onClick={(e) => handleSetPrimaryClick(image, e)}
                                    disabled={image.is_primary_catalog_image === '1'}
                                >
                                    <FaStar />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedImage && (
                <ImagePopup image={selectedImage} onClose={handleClosePopup} path={path} />
            )}
            {showUploadForm && (
                <CatalogueImageUploadForm onAddImage={handleAddImage} onClose={handleModalClose} catalogueId={catalogueId} />
            )}
            {showDeleteConfirmation && (
                <DeleteConfirmationModal onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
            )}
            {showSetPrimaryConfirmation && (
                <SetPrimaryImageModal onConfirm={handleSetPrimaryConfirm} onCancel={handleSetPrimaryCancel} />
            )}
        </div>
    );
}

export default CatalogueGallery;