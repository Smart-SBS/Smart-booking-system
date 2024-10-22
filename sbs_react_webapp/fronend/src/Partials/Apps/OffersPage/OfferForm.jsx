/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './offers.css'

const OfferForm = ({ onClose, initialData = null, catalogId, onSubmitSuccess }) => {
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL

    const schema = yup.object().shape({
        offer_title: yup.string().required('Offer title is required'),
        offer_description: yup.string().required('Offer description is required'),
        offer_validity_start_date: yup
            .date()
            .nullable()
            .required('Offer validity start date is required'),
        offer_validity_end_date: yup
            .date()
            .nullable()
            .required('Offer validity end date is required'),
        offer_amount: yup.number().positive('Amount must be positive').required('Offer amount is required'),
        offer_type: yup.string().required('Offer type is required'),
    });

    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || {
            offer_title: '',
            offer_description: '',
            offer_validity_start_date: null,
            offer_validity_end_date: null,
            offer_amount: '',
            offer_type: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append('catalog_id', catalogId);
            formData.append('offer_title', data.offer_title);
            formData.append('offer_description', data.offer_description);
            formData.append('offer_validity_start_date', data.offer_validity_start_date.toISOString().split('T')[0]);
            formData.append('offer_validity_end_date', data.offer_validity_end_date.toISOString().split('T')[0]);
            formData.append('offer_amount', data.offer_amount);
            formData.append('offer_type', data.offer_type);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            let response;
            if (initialData) {
                response = await axios.post(`${APP_URL}/api/editspecialoffer/${initialData.id}`, formData, config);
            } else {
                response = await axios.post(`${APP_URL}/api/addspecialoffer`, formData, config);
            }

            if (response.status === 200) {
                toast.success(response.data.message);
                onSubmitSuccess();
                onClose(true);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error in offer form: ${errorMessages}`);
            } else {
                toast.error(`Error in offer form: ${errorMessage || error.message}`);
            }
            console.log(error)
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? 'Edit Offer' : 'Add New Offer'}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="offer_title" className="form-label">Offer Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.offer_title ? 'is-invalid' : ''}`}
                                    id="offer_title"
                                    {...register('offer_title')}
                                />
                                {errors.offer_title && <div className="invalid-feedback">{errors.offer_title.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="offer_description" className="form-label">Offer Description</label>
                                <textarea
                                    className={`form-control ${errors.offer_description ? 'is-invalid' : ''}`}
                                    id="offer_description"
                                    rows="3"
                                    {...register('offer_description')}
                                ></textarea>
                                {errors.offer_description && <div className="invalid-feedback">{errors.offer_description.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="offer_validity_start_date" className="form-label">Start Date</label>
                                <Controller
                                    name="offer_validity_start_date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            className={`form-control ${errors.offer_validity_start_date ? 'is-invalid' : ''}`}
                                            minDate={new Date()}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    )}
                                />
                                {errors.offer_validity_start_date && (
                                    <div className="invalid-feedback d-block">
                                        {errors.offer_validity_start_date.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="offer_validity_end_date" className="form-label">End Date</label>
                                <Controller
                                    name="offer_validity_end_date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            className={`form-control ${errors.offer_validity_end_date ? 'is-invalid' : ''}`}
                                            minDate={new Date()}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    )}
                                />
                                {errors.offer_validity_end_date && (
                                    <div className="invalid-feedback d-block">
                                        {errors.offer_validity_end_date.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="offer_amount" className="form-label">Offer Amount</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.offer_amount ? 'is-invalid' : ''}`}
                                    id="offer_amount"
                                    {...register('offer_amount')}
                                />
                                {errors.offer_amount && <div className="invalid-feedback">{errors.offer_amount.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="offer_type" className="form-label">Offer Type</label>
                                <select
                                    className={`form-select ${errors.offer_type ? 'is-invalid' : ''}`}
                                    id="offer_type"
                                    {...register('offer_type')}
                                >
                                    <option value="">Select Offer Type</option>
                                    <option value="%">%</option>
                                    <option value="Flat">Flat</option>
                                </select>
                                {errors.offer_type && <div className="invalid-feedback">{errors.offer_type.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : (initialData ? 'Update Offer' : 'Add Offer')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferForm;