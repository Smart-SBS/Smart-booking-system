import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { toast, Toaster } from 'react-hot-toast';
import Select from 'react-select';
import formatFileSize from '../utils/formatFileSize';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingFallback from "../utils/LoadingFallback";

// Validation schema
const schema = yup.object().shape({
    business_name: yup
        .string()
        .required('Business name is required')
        .min(2, 'Business name must be at least 2 characters')
        .max(100, 'Business name must not exceed 100 characters'),
    business_email: yup
        .string()
        .required('Business email is required')
        .email('Please enter a valid email address'),
    business_contact: yup
        .number()
        .required('Business Contact is required')
        .min(10, 'Contact number must be at least 10 digits')
        .max(10, 'Contact number should not exceed 10 digits'),
    business_type_id: yup
        .number()
        .required('Business type is required')
        .typeError('Please select a business type'),
    business_overview: yup
        .string()
        .required('Business overview is required')
        .min(20, 'Business overview must be at least 20 characters')
        .max(1000, 'Business overview must not exceed 1000 characters'),
    category_id: yup
        .number()
        .required('Category is required')
        .typeError('Please select a category'),
    subcategory_id: yup
        .number()
        .required('Subcategory is required')
        .typeError('Please select a subcategory')
});

const EditBusiness = () => {
    // Business name and id from the params
    const { id, businessName } = useParams();

    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL and Image URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL

    // State initialisation
    const [selectedFile, setSelectedFile] = useState(null);
    const [businessTypes, setBusinessTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [businessLogo, setBusinessLogo] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // UseForm initialization
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    // Watch for category changes
    const selectedCategory = watch('category_id');

    // Fetch business types, categories, and business details
    useEffect(() => {
        fetchBusinessTypes();
        fetchCategories();
        fetchBusinessDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchSubcategories(selectedCategory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    // Fetch business details
    const fetchBusinessDetails = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-vendor-detail-business/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && response.data.business) {
                const business = response.data.business;
                setValue('business_name', business.business_name);
                setValue('business_email', business.business_email);
                setValue('business_contact', business.business_contact);
                setValue("old_business_logo", business.business_logo)

                // Set business logo if available
                if (business.business_logo) {
                    setBusinessLogo(`${IMG_URL}/logo/list/${business.business_logo}`);
                }

                setValue('business_type_id', business.business_type_id);
                setValue('onboarding_date', business.onboarding_date);
                setValue('business_overview', business.business_overview);
                setValue('category_id', business.category_id);
                setValue('subcategory_id', business.subcategory_id);
                fetchSubcategories(business.category_id);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching business details: ${errorMessages}`);
            } else {
                console.error(`Error fetching business details: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Fetch business types
    const fetchBusinessTypes = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-active-business-types`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && Array.isArray(response.data.active_business_types)) {
                const typeOptions = response.data.active_business_types.map(type => ({
                    value: type.id,
                    label: type.business_type_name
                }));
                setBusinessTypes(typeOptions);
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching business types: ${errorMessages}`);
            } else {
                console.error(`Error fetching business types: ${error.response?.data?.message || error.message}`);
            }
            setBusinessTypes([]);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-active-categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && response.data.active_category) {
                const categoryOptions = response.data.active_category.map(category => ({
                    value: category.id,
                    label: category.category_name
                }));
                setCategories(categoryOptions);
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching categories: ${errorMessages}`);
            } else {
                setCategories([])
                console.error(`Error fetching categories: ${error.response?.data?.message || error.message}`);
            }
            setCategories([])
        }
    };

    // Fetch subcategories
    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`${APP_URL}/active-subcategories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && response.data.active_subcategory) {
                const subcategoryOptions = response.data.active_subcategory.map(subcategory => ({
                    value: subcategory.id,
                    label: subcategory.subcategory_name
                }));
                setSubcategories(subcategoryOptions);
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching sub-categories: ${errorMessages}`);
            } else {
                console.error(`Error fetching sub-categories: ${error.response?.data?.message || error.message}`);
            }
            setSubcategories([]);
        }
    };

    const onSubmit = async (data) => {
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            // Append all form fields to formData
            Object.keys(data).forEach(key => {
                if (key === 'business_logo' && data[key]?.[0]) {
                    formData.append(key, data[key][0]);
                } else if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });

            const res = await axios.post(`${APP_URL}/ma-edit-business/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => navigate('/my-listings'), 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                Object.values(errorMessage).forEach(msg => toast.error(msg));
            } else {
                toast.error(errorMessage || 'An error occurred while updating the business');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return <LoadingFallback />;
    }

    // Helper function to render form field error
    const renderError = (error) => {
        return error ? (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
        ) : null;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Business {businessName}</h1>
                <Link to="/my-listings" className="px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600 transition-colors">
                    Back
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Business Name Field */}
                    <div>
                        <label htmlFor="business_name" className="block font-semibold text-black mb-1">Business Name</label>
                        <input
                            type="text"
                            id="business_name"
                            {...register('business_name')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            placeholder="Enter Business Name"
                        />
                        {renderError(errors.business_name)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Email Field */}
                    <div>
                        <label htmlFor="business_email" className="block font-semibold text-black mb-1">Business Email</label>
                        <input
                            type="email"
                            id="business_email"
                            {...register('business_email')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            placeholder="Enter Business Email"
                        />
                        {renderError(errors.business_email)}
                    </div>

                    {/* Business Contact Field */}
                    <div>
                        <label htmlFor="business_contact" className="block font-semibold text-black mb-1">Business Contact</label>
                        <input
                            type="number"
                            inputMode='numeric'
                            onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                            id="business_contact"
                            {...register('business_contact')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            placeholder="Enter Business Contact Number"
                        />
                        {renderError(errors.business_contact)}
                    </div>

                    {/* Business Type Field */}
                    <div>
                        <label htmlFor="business_type_id" className="block font-semibold text-black mb-1">
                            Business Type
                        </label>
                        <Controller
                            name="business_type_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={businessTypes}
                                    className="react-select-container"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    value={businessTypes.find(option => option.value === field.value)}
                                    placeholder="Select business type"
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption ? selectedOption.value : '');
                                    }}
                                    isLoading={businessTypes.length === 0}
                                />
                            )}
                        />
                        {renderError(errors.business_type_id)}
                    </div>

                    {/* Business Onboarding Date Field */}
                    <div>
                        <label htmlFor="onboarding_date" className="block font-semibold text-black">
                            Onboarding Date
                        </label>
                        <input
                            type="date"
                            id="onboarding_date"
                            {...register('onboarding_date')}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.onboarding_date ? 'border-red-500' : ''
                                }`}
                        />
                        {renderError(errors.onboarding_date)}
                    </div>

                    {/* Business Category Field */}
                    <div>
                        <label htmlFor="category_id" className="block font-semibold text-black">
                            Category
                        </label>
                        <Controller
                            name="category_id"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={categories}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.category_id ? 'border-red-500' : ''
                                        }`}
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select Category"
                                    value={categories.find(category => category.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                        setSubcategories([]);
                                        if (selected) fetchSubcategories(selected.value);
                                    }}
                                />
                            )}
                        />
                        {renderError(errors.category_id)}
                    </div>

                    {/* Business Subcategory Field */}
                    <div>
                        <label htmlFor="subcategory_id" className="block font-semibold text-black">
                            Subcategory
                        </label>
                        <Controller
                            name="subcategory_id"
                            control={control}
                            rules={{ required: 'Subcategory is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={subcategories.length > 0 ? subcategories : [{ value: '', label: 'No subcategories found for the selected category' }]}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.subcategory_id ? 'border-red-500' : ''
                                        }`}
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select Subcategory"
                                    value={subcategories.find(subcategory => subcategory.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                    }}
                                    noOptionsMessage={() => "No subcategories found for the selected category"}
                                />
                            )}
                        />
                        {renderError(errors.subcategory_id)}
                    </div>

                    {/* Business Overview Field */}
                    <div>
                        <label htmlFor="business_overview" className="block font-semibold text-black mb-1">Business Overview</label>
                        <textarea
                            id="business_overview"
                            {...register('business_overview')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            rows="5"
                            placeholder="Enter Business Overview"
                        ></textarea>
                        {renderError(errors.business_overview)}
                    </div>

                    {/* Business Logo Field */}
                    <div>
                        <label htmlFor="business_logo" className="block font-semibold text-black mb-1">Business Logo</label>
                        <div className="flex items-center space-x-4">
                            {businessLogo && (
                                <div className="w-24 h-24 overflow-hidden rounded-md">
                                    <img src={businessLogo} alt="Business Logo" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <input type='hidden' name='old_business_logo' id='old_business_logo' {...register('old_business_logo')} />
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    setSelectedFile(acceptedFiles[0]);
                                    setValue('business_logo', acceptedFiles);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        {...getRootProps()}
                                        className="flex-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#fa2964e6]"
                                    >
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-[#fa2964e6] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#fa2964e6]"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        {...getInputProps()}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            {selectedFile && (
                                                <div className="mt-2">
                                                    <p className="text-sm font-semibold text-gray-600">File name: {selectedFile.name}</p>
                                                    <p className="text-sm font-semibold text-gray-600">File size: {formatFileSize(selectedFile.size)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {renderError(errors.business_logo)}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-start space-x-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-[#fa2964e6] text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa2964e6] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Business'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditBusiness;