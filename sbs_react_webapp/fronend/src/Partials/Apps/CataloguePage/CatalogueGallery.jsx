/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ImagePopup from './ImagePopup';
import ImageUploadForm from './ImageUploadForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SetPrimaryImageModal from './SetPrimaryImageModal';
import toast, { Toaster } from 'react-hot-toast';

const CatalogueGallery = () => {
    const { catalogName, catalogId, shopId, shopName } = useParams();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showSetPrimaryConfirmation, setShowSetPrimaryConfirmation] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [imageToSetPrimary, setImageToSetPrimary] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/catalog-gallery/${catalogId}`, config);
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
    }, [catalogId, refreshTrigger, token, APP_URL, IMG_URL]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
    };

    const handleModalClose = () => {
        setShowUploadForm(false)
        setRefreshTrigger(prev => !prev)
        window.location.reload()
    }

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
                const response = await axios.delete(`${APP_URL}/api/delete-catalog-image/${imageToDelete.id}`, config);
                if (response.data.status === 200) {
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

    const handleSetPrimaryConfirm = async () => {
        if (imageToSetPrimary) {
            try {
                const response = await axios.put(`${APP_URL}/api/catalog-setprimaryimage/${imageToSetPrimary.id}`, {}, config);
                if (response.data.status === 200) {
                    setImages(images.map(img => ({
                        ...img,
                        is_primary_catalog_image: img.id === imageToSetPrimary.id ? '1' : '0'
                    })));
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
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0 d-flex justify-content-between align-items-center">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Welcome to {catalogName}'s Gallery</strong></h6>
                    <div className='d-flex gap-2'>
                        <button className="btn btn-primary" onClick={() => setShowUploadForm(true)}>Add Image</button>
                        <Link to={`/admin/shop/catalogue/${shopName}/${shopId}`} className='btn btn-info text-white text-decoration-none'>Back</Link>
                    </div>
                </div>
                {hasError ? (
                    <div className="alert col-md-11 m-2">
                        No images found for this catalogue.
                    </div>
                ) : (
                    <ul className="grid-wrapper li_animate mx-3">
                        {images.map((image, index) => (
                            <li
                                key={image.id}
                                className="position-relative"
                                onMouseEnter={() => setHoveredImage(index)}
                                onMouseLeave={() => setHoveredImage(null)}
                                style={{
                                    border: image.is_primary_catalog_image === '1' ? '4px solid limegreen' : '0.5px solid #ddd', borderRadius: '10px'
                                }}
                            >
                                <img src={`${IMG_URL}/catalog-image/thumb/${image.image}`} alt={`Image ${index + 1}`} onClick={() => handleImageClick(image)} />
                                <button
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                    style={{
                                        opacity: hoveredImage === index ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                        border: '1px solid #fff'
                                    }}
                                    onClick={(e) => handleDeleteClick(image, e)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                                <button
                                    className="btn btn-primary btn-sm position-absolute top-0 m-2"
                                    style={{
                                        opacity: hoveredImage === index ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                        border: '1px solid #fff',
                                        right: '14%',
                                        backgroundColor: image.is_primary_catalog_image === '1' ? 'limegreen' : 'blue'
                                    }}
                                    onClick={(e) => handleSetPrimaryClick(image, e)}
                                    disabled={image.is_primary_catalog_image === '1'}
                                >
                                    <i className="bi bi-star-fill"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedImage && (
                <>
                    <div className="modal-backdrop show"></div>
                    <ImagePopup image={selectedImage} onClose={handleClosePopup} />
                </>
            )}
            {showUploadForm && (
                <>
                    <div className="modal-backdrop show"></div>
                    <ImageUploadForm onAddImage={handleAddImage} onClose={handleModalClose} catalogId={catalogId} />
                </>
            )}
            {showDeleteConfirmation && (
                <>
                    <div className="modal-backdrop show"></div>
                    <DeleteConfirmationModal onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
                </>
            )}
            {showSetPrimaryConfirmation && (
                <>
                    <div className="modal-backdrop show"></div>
                    <SetPrimaryImageModal onConfirm={handleSetPrimaryConfirm} onCancel={handleSetPrimaryCancel} />
                </>
            )}
        </div>
    );
}

export default CatalogueGallery;