import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EditOffer = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const APP_URL = import.meta.env.VITE_API_URL;

    const { catalogueName, catalogueId, offerId, offerName, shopName, shopId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = yup.object().shape({
        offer_title: yup.string().required('Offer Title is required'),
        offer_description: yup.string().required('Offer Description is required'),
        offer_amount: yup.number().positive('Offer Amount must be a positive number').required('Offer Amount is required'),
        offer_type: yup.string().required('Offer Type is required'),
        offer_validity_start_date: yup.string().required('Start Date is required'),
        offer_validity_end_date: yup.string().required('End Date is required')
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Fetch offer details
    useEffect(() => {
        const fetchOfferDetails = async () => {
            try {
                const response = await axios.get(`${APP_URL}/ma-detail-specialoffers/${offerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data && response.data.SpecialOffer) {
                    const offerData = response.data.SpecialOffer;
                    setValue('offer_title', offerData.offer_title || '');
                    setValue('offer_description', offerData.offer_description || '');
                    setValue('offer_amount', offerData.offer_amount || '');
                    setValue('offer_type', offerData.offer_type || '');
                    setValue('offer_validity_start_date', offerData.offer_validity_start_date || '');
                    setValue('offer_validity_end_date', offerData.offer_validity_end_date || '');
                }
            } catch (error) {
                toast.error(`Error fetching offer data: ${error.response?.data?.message || error.message}`);
            }
        };

        fetchOfferDetails();
    }, [offerId, catalogueId, APP_URL, token, setValue]);

    // Date validation function
    const validateDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start < end;
    };

    const onSubmit = async (data) => {
        if (isSubmitting) return;

        // Validate date fields
        if (!validateDates(data.offer_validity_start_date, data.offer_validity_end_date)) {
            toast.error("End date must be after the start date");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('catalog_id', catalogueId);
            formData.append('offer_title', data.offer_title);
            formData.append('offer_description', data.offer_description);
            formData.append('offer_amount', data.offer_amount);
            formData.append('offer_type', data.offer_type);
            formData.append('offer_validity_start_date', data.offer_validity_start_date);
            formData.append('offer_validity_end_date', data.offer_validity_end_date);

            const res = await axios.post(`${APP_URL}/ma-edit-specialoffers/${offerId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate(`/catalogue-offers/${shopName}/${shopId}/${catalogueId}/${catalogueName}`);
                }, 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            toast.error(`Error updating offer: ${errorMessage || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h6 className="text-xl font-bold">Edit Special Offer {offerName}</h6>
                <Link className="mt-2 inline-block px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600" to={`/catalogue-offers/${shopName}/${shopId}/${catalogueId}/${catalogueName}`}>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="offer_title" className="block font-semibold text-gray-700">Offer Title</label>
                        <input
                            type="text"
                            id="offer_title"
                            {...register('offer_title')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_title ? 'border-red-500' : ''}`}
                            placeholder="Offer Title"
                        />
                        {errors.offer_title && <p className="mt-1 text-red-500">{errors.offer_title.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="offer_description" className="block font-semibold text-gray-700">Offer Description</label>
                        <textarea
                            id="offer_description"
                            {...register('offer_description')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_description ? 'border-red-500' : ''}`}
                            placeholder="Offer Description"
                            rows="3"
                        />
                        {errors.offer_description && <p className="mt-1 text-red-500">{errors.offer_description.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="offer_amount" className="block font-semibold text-gray-700">Offer Amount</label>
                        <input
                            type="number"
                            inputMode='numeric'
                            onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                            id="offer_amount"
                            {...register('offer_amount')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_amount ? 'border-red-500' : ''}`}
                            placeholder="Offer Amount"
                        />
                        {errors.offer_amount && <p className="mt-1 text-red-500">{errors.offer_amount.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="offer_type" className="block font-semibold text-gray-700">Offer Type</label>
                        <select
                            id="offer_type"
                            {...register('offer_type')}
                            className={`w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_type ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Offer Type</option>
                            <option value="%">Percent</option>
                            <option value="flat">Flat</option>
                        </select>
                        {errors.offer_type && <p className="mt-1 text-red-500">{errors.offer_type.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="offer_validity_start_date" className="block font-semibold text-gray-700">Start Date</label>
                        <input
                            type="date"
                            id="offer_validity_start_date"
                            {...register('offer_validity_start_date')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_validity_start_date ? 'border-red-500' : ''}`}
                        />
                        {errors.offer_validity_start_date && <p className="mt-1 text-red-500">{errors.offer_validity_start_date.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="offer_validity_end_date" className="block font-semibold text-gray-700">End Date</label>
                        <input
                            type="date"
                            id="offer_validity_end_date"
                            {...register('offer_validity_end_date')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.offer_validity_end_date ? 'border-red-500' : ''}`}
                        />
                        {errors.offer_validity_end_date && <p className="mt-1 text-red-500">{errors.offer_validity_end_date.message}</p>}
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        disabled={isSubmitting}
                        className={`px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600 mr-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Offer'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditOffer;