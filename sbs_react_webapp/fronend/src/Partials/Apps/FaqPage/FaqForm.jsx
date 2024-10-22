/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FaqForm = ({ onClose, initialData = null, catalogId }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    useEffect(() => {
        if (initialData) {
            setQuestion(initialData.question);
            setAnswer(initialData.answer);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let response;
            const formData = new FormData();
            formData.append('question', question);
            formData.append('answer', answer);
            formData.append('catalog_id', catalogId);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (initialData) {
                // Editing existing FAQ
                response = await axios.post(`${APP_URL}/api/edit-faq/${initialData.id}`, formData, config);

            } else {
                // Adding new FAQ
                response = await axios.post(`${APP_URL}/api/add-faq`, formData, config);
            }

            if (response.status === 200) {
                toast.success(response.data.message);
                onClose(true)
            } else {
                toast.error(response.data.message || "An error occurred");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error in faq form: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error in faq form: ${errorMessage || error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? 'Edit FAQ' : 'Add New FAQ'}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">Question</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="answer" className="form-label">Answer</label>
                                <textarea
                                    className="form-control"
                                    id="answer"
                                    rows="3"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Saving...' : (initialData ? 'Update FAQ' : 'Add FAQ')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqForm;
