import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../StatusModal/Modal';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import DeleteModal from '../DeleteModal/DeleteModal'
import toast, { Toaster } from 'react-hot-toast';

const ReviewPage = () => {
    const { catalogName, catalogId, shopId, shopName } = useParams();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const Img_url = import.meta.env.VITE_IMG_URL;

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('date');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 1, review_text: '' });
    const [hasError, setHasError] = useState(false);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);
    const [editReview, setEditReview] = useState({ rating: 1, review_text: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/reviews/${catalogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const result = response.data;
                if (result.status === 200 && result.Review) {
                    setReviews(result.Review);
                    setHasError(false);
                }
            } catch (error) {
                setHasError(true);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [catalogId, token, reviewAdded]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('rating', newReview.rating);
        formdata.append('review_text', newReview.review_text);
        formdata.append('catalog_id', catalogId);
        try {
            const response = await axios.post(`${APP_URL}/api/addreview`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setShowModal(false);
                setReviewAdded(!reviewAdded);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error adding review: ${errorMessages}`);
            } else {
                toast.error(`Error adding review: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const handleStatusClick = (review) => {
        setRecordToUpdate(review);
        setModalMessage(`Are you sure you want to ${review.status === '1' ? 'deactivate' : 'activate'} this review?`);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!recordToUpdate) return;
        setIsLoading(true);

        try {
            const response = await axios.put(`${APP_URL}/api/reviewupdatestatus/${recordToUpdate.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setReviews(prevReviews => prevReviews.map(review =>
                    review.id === recordToUpdate.id ? { ...review, status: review.status === '1' ? '0' : '1' } : review
                ));
                toast.success(response.data.message || "Review status updated successfully");
            } else {
                toast.error("Failed to update review status");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating review status");
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    // Handle delete callback
    const handleDelete = useCallback((id) => {
        setReviewToDelete({ id });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (reviewToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/deletereview/${reviewToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setReviews(prevData => prevData.filter(review => review.id !== reviewToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while deleting the review");
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setReviewToDelete(null);
            }
        }
    };

    // handle click on edit button
    const handleEditClick = (review) => {
        setReviewToEdit(review);
        setEditReview({ rating: review.rating, review_text: review.review_text });
        setIsEditModalOpen(true);
    };

    // handle edit review submission
    const handleSubmitEditReview = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('rating', editReview.rating);
        formdata.append('review_text', editReview.review_text);
        formdata.append('catalog_id', catalogId);

        try {
            const response = await axios.post(`${APP_URL}/api/editreview/${reviewToEdit.id}`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 200) {
                setIsEditModalOpen(false);
                setReviewAdded(!reviewAdded); // To trigger re-fetching of reviews
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(`Error editing review: ${error.response?.data?.message || error.message}`);
        }
    };

    const reviewsPerPage = 5;

    const sortedReviews = useMemo(() => {
        return [...reviews].sort((a, b) => {
            if (sortBy === 'date') return parseInt(b.id) - parseInt(a.id);
            if (sortBy === 'rating') return parseInt(b.rating) - parseInt(a.rating);
            return 0;
        });
    }, [reviews, sortBy]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
        return (sum / reviews.length).toFixed(1);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

    const renderStars = (rating) => '★'.repeat(Math.min(rating, 5)) + '☆'.repeat(Math.max(5 - rating, 0));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedReviews.length / reviewsPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="card">
                <div className="container m-4">
                    <h1 className="mb-4">{catalogName} Reviews</h1>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h2>Total Reviews</h2>
                            <h3 className="text-success">{reviews.length}</h3>
                        </div>
                        <div className="col-md-6">
                            <h2>Average Rating</h2>
                            <h3>{calculateAverageRating(reviews)} <small className="text-warning">{renderStars(Math.round(calculateAverageRating(reviews)))}</small></h3>
                        </div>
                    </div>

                    <div className="mb-3 col-md-11 d-flex align-items-center gap-3 justify-content-between">
                        <div>
                            <label htmlFor="sortSelect" className="form-label">Sort by:</label>
                            <select
                                id="sortSelect"
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        <div className='d-flex gap-2'>
                            <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                                Add a Review
                            </button>
                            <Link className='btn btn-info text-white' to={`/admin/shop/catalogue/${shopName}/${shopId}`}>Back</Link>
                        </div>
                    </div>

                    <BootstrapModal show={showModal} onHide={() => setShowModal(false)}>
                        <BootstrapModal.Header closeButton>
                            <BootstrapModal.Title>Add a Review</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <Form onSubmit={handleSubmitReview}>
                                <Form.Group controlId="rating" className="mt-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="rating"
                                        value={newReview.rating}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="review_text" className="mt-3">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="review_text"
                                        rows="3"
                                        value={newReview.review_text}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="mt-3">
                                    Submit Review
                                </Button>
                            </Form>
                        </BootstrapModal.Body>
                    </BootstrapModal>

                    <BootstrapModal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
                        <BootstrapModal.Header closeButton>
                            <BootstrapModal.Title>Edit Review</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <Form onSubmit={handleSubmitEditReview}>
                                <Form.Group controlId="edit_rating" className="mt-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="rating"
                                        value={editReview.rating}
                                        onChange={(e) => setEditReview({ ...editReview, rating: e.target.value })}
                                        required
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="edit_review_text" className="mt-3">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="review_text"
                                        rows="3"
                                        value={editReview.review_text}
                                        onChange={(e) => setEditReview({ ...editReview, review_text: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="mt-3">
                                    Submit Review
                                </Button>
                            </Form>
                        </BootstrapModal.Body>
                    </BootstrapModal>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirm}
                        message={modalMessage}
                        isLoading={isLoading}
                    />

                    {reviewToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete review ${reviewToDelete.id}?`}
                            isLoading={isDeleting}
                        />
                    )}

                    {reviews.length === 0 || hasError ? (
                        <div className="alert alert-info col-md-11">
                            No reviews found for this shop.
                        </div>
                    ) : (
                        <>
                            {currentReviews.map((review) => (
                                <div key={review.id} className="review-item mb-4">
                                    <div className="row align-items-start justify-content-end">
                                        <div className="col-md-2">
                                            <img
                                                src={review.profile_picture ? `${Img_url}/profile/list/${review.profile_picture}` : `${Img_url}/default/list/user.webp`}
                                                alt={review.firstname || "User profile"}
                                                className="me-2 avatar rounded-circle xl"
                                                onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                                            />
                                        </div>
                                        <div className="col-md-7">
                                            <h4>{review.firstname} {review.lastname} <small className="text-warning">{renderStars(parseInt(review.rating))}</small></h4>
                                            <p className="text-muted">Review ID: {review.id}</p>
                                            <p>{review.review_text}</p>
                                        </div>
                                        <div className="col-md-3" style={{ textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleStatusClick(review)}
                                                className={`btn btn-sm ${review.status === '1' ? 'btn-success' : 'btn-danger'} m-1`}
                                                style={{
                                                    backgroundColor: review.status === '1' ? '#28a745' : '#dc3545',
                                                    borderColor: review.status === '1' ? '#28a745' : '#dc3545',
                                                    color: '#ffffff',
                                                    width: '70px',
                                                    height: '35px'
                                                }}>
                                                {review.status === '1' ? 'Active' : 'Inactive'}
                                            </button>
                                            <button type="button" className="btn text-info px-2 me-1" onClick={() => handleEditClick(review)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button type="button" className="btn text-danger px-2" onClick={() => handleDelete(review.id, review.review_text)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: Math.ceil(sortedReviews.length / reviewsPerPage) }).map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => paginate(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(sortedReviews.length / reviewsPerPage) ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={nextPage}
                                            disabled={currentPage === Math.ceil(sortedReviews.length / reviewsPerPage)}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;