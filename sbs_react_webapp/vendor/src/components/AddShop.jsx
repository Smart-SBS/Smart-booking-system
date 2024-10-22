/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import formatFileSize from '../utils/formatFileSize';
import { useSelector } from 'react-redux';

const AddShop = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // State initialization
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Schema initialization
    const schema = yup.object().shape({
        // Basic Information
        shop_name: yup
            .string()
            .required('Shop name is required'),

        shop_contact_person: yup
            .string()
            .required('Contact person name is required'),

        shop_contact: yup
            .number()
            .required('Shop Contact is required')
            .min(10, 'Contact number must be at least 10 digits')
            .max(10, 'Contact number should not exceed 10 digits'),

        shop_email: yup
            .string()
            .required('Email is required')
            .email('Please enter a valid email address'),

        shop_overview: yup
            .string()
            .required('Shop overview is required'),

        shop_address: yup
            .string()
            .required('Shop Address is required'),

        // Location Information
        state_id: yup
            .number()
            .required('State selection is required')
            .positive('Please select a valid state')
            .typeError('Please select a state'),

        city_id: yup
            .number()
            .required('City selection is required')
            .positive('Please select a valid city')
            .typeError('Please select a city'),

        area_id: yup
            .number()
            .required('Area selection is required')
            .positive('Please select a valid area')
            .typeError('Please select an area'),

        business_id: yup
            .number()
            .required('Business selection is required')
            .positive('Please select a valid business')
            .typeError('Please select a business'),

        // SEO Fields
        focus_keyphrase: yup
            .string()
            .max(100, 'Focus keyphrase must not exceed 100 characters')
            .matches(/^[a-zA-Z0-9\s,.-]*$/, 'Focus keyphrase can only contain letters, numbers, spaces, and basic punctuation')
            .nullable(),

        seo_title: yup
            .string()
            .max(60, 'SEO title should not exceed 60 characters for optimal display in search results')
            .nullable(),

        meta_description: yup
            .string()
            .max(160, 'Meta description should not exceed 160 characters for optimal display in search results')
            .nullable(),

        seo_schema: yup
            .string()
            .test('is-valid-json', 'Schema must be valid JSON', function (value) {
                if (!value) return true; // Allow empty value
                try {
                    JSON.parse(value);
                    return true;
                } catch (error) {
                    return false;
                }
            })
            .nullable(),

        social_title: yup
            .string()
            .max(60, 'Social title should not exceed 60 characters')
            .nullable(),

        social_description: yup
            .string()
            .max(160, 'Social description should not exceed 160 characters')
            .nullable()
    });

    // useForm hook initialization
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    //Fetch Businesses
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`${APP_URL}/ma-active-vendor-businesses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.active_business) {
                    const businessOptions = response.data.active_business.map(business => ({
                        value: business.id,
                        label: business.business_name
                    }));
                    setBusinesses(businessOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    console.error(`Error fetching businesses: ${errorMessages}`);
                } else {
                    console.error(`Error fetching businesses: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchBusinesses();
    }, [APP_URL, token]);

    // Fetch states
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${APP_URL}/ma-active-states`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.active_states) {
                    const stateOptions = response.data.active_states.map(state => ({
                        value: state.id,
                        label: state.states_name
                    }));
                    setStates(stateOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    console.error(`Error fetching states: ${errorMessages}`);
                } else {
                    console.error(`Error fetching states: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchStates();
    }, [APP_URL, token]);

    // Fetch active cities
    const fetchCities = async (stateId) => {
        try {
            const response = await axios.get(`${APP_URL}/ma-active-cities/${stateId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && response.data.active_cities) {
                const cityOptions = response.data.active_cities.map(city => ({
                    value: city.id,
                    label: city.city_name
                }));
                setCities(cityOptions);
            } else {
                setCities([])
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching cities: ${errorMessages}`);
            } else {
                console.error(`Error fetching cities: ${error.response?.data?.message || error.message}`);
            }
            setCities([])
        }
    };

    // Fetch active areas
    const fetchAreas = async (cityId) => {
        try {
            const response = await axios.get(`${APP_URL}/ma-active-areas/${cityId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });
            if (response.data && response.data.active_areas) {
                const areaOptions = response.data.active_areas.map(area => ({
                    value: area.id,
                    label: area.area_name
                }));
                setAreas(areaOptions);
            } else {
                setAreas([])
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                console.error(`Error fetching areas: ${errorMessages}`);
            } else {
                console.error(`Error fetching areas: ${error.response?.data?.message || error.message}`);
            }
            setAreas([])
        }
    };

    // Handle submit
    const onSubmit = async (data) => {
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            // Check for missing required fields
            const requiredFields = ['shop_name', 'shop_contact_person', 'shop_contact', 'shop_email', 'shop_onboarding_date', 'shop_overview', 'area_id', 'business_id'];
            const missingFields = requiredFields.filter(field => !data[field]);

            if (missingFields.length > 0) {
                toast.error(`Missing fields: ${missingFields.join(', ')}`);
                return; // Stop execution if any field is missing
            }

            formData.append('shop_name', data.shop_name);
            formData.append('address', data.shop_address);
            formData.append('shop_contact_person', data.shop_contact_person);
            formData.append('shop_contact', data.shop_contact);
            formData.append('shop_email', data.shop_email);
            formData.append('shop_onboarding_date', data.shop_onboarding_date);
            formData.append('shop_overview', data.shop_overview);
            formData.append('area_id', data.area_id);
            formData.append('business_id', data.business_id);

            // Append optional fields only if they're filled
            if (data.focus_keyphrase) formData.append('focus_keyphrase', data.focus_keyphrase);
            if (data.seo_title) formData.append('seo_title', data.seo_title);
            if (data.meta_description) formData.append('meta_description', data.meta_description);
            if (data.canonical_url) formData.append('canonical_url', data.canonical_url);
            if (data.seo_schema) formData.append('seo_schema', data.seo_schema);
            if (data.social_title) formData.append('social_title', data.social_title);
            if (data.social_description) formData.append('social_description', data.social_description);
            if (data.social_image && data.social_image[0]) formData.append('social_image', data.social_image[0]);

            const res = await axios.post(`${APP_URL}/ma-add-shops`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => navigate('/my-shops'), 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                Object.values(errorMessage).forEach(msg => toast.error(msg));
            } else {
                toast.error(errorMessage || 'An error occurred while adding the shop');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <h1 className="text-2xl font-bold">New Shop</h1>
                <Link to="/my-shops" className="px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600 transition-colors">
                    Back
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Shop Name Field */}
                    <div>
                        <label htmlFor="shop_name" className="block font-semibold text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            id="shop_name"
                            {...register('shop_name')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_name)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shop Contact Person Field */}
                    <div>
                        <label htmlFor="shop_contact_person" className="block font-semibold text-gray-700">Contact Person</label>
                        <input
                            type="text"
                            id="shop_contact_person"
                            {...register('shop_contact_person')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_contact_person)}
                    </div>

                    {/* Shop Contact Field */}
                    <div>
                        <label htmlFor="shop_contact" className="block font-semibold text-gray-700">Contact</label>
                        <input
                            type="number"
                            inputMode='numeric'
                            onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                            id="shop_contact"
                            {...register('shop_contact')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_contact)}
                    </div>

                    {/* Shop Email Field */}
                    <div>
                        <label htmlFor="shop_email" className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            id="shop_email"
                            {...register('shop_email')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_email)}
                    </div>

                    {/* Shop Onboarding Date Field */}
                    <div>
                        <label htmlFor="shop_onboarding_date" className="block font-semibold text-gray-700">Onboarding Date</label>
                        <input
                            type="date"
                            id="shop_onboarding_date"
                            {...register('shop_onboarding_date')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_onboarding_date)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Shop Address Field */}
                    <div>
                        <label htmlFor="shop_address" className="block font-semibold text-gray-700">Shop Address</label>
                        <input
                            type="text"
                            id="shop_address"
                            {...register('shop_address')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        />
                        {renderError(errors.shop_address)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Shop Overview Field */}
                    <div>
                        <label htmlFor="shop_overview" className="block font-semibold text-gray-700">Shop Overview</label>
                        <textarea
                            id="shop_overview"
                            {...register('shop_overview')}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                        ></textarea>
                        {renderError(errors.shop_overview)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shop State Field */}
                    <div>
                        <label htmlFor="state_id" className="block font-semibold text-gray-700">State</label>
                        <Controller
                            name="state_id"
                            control={control}
                            rules={{ required: 'State is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={states}
                                    className="react-select-container"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select State"
                                    value={states.find(state => state.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                        if (selected) fetchCities(selected.value);
                                    }}
                                />
                            )}
                        />
                        {renderError(errors.state_id)}
                    </div>

                    {/* Shop City Field */}
                    <div>
                        <label htmlFor="city_id" className="block font-semibold text-gray-700">City</label>
                        <Controller
                            name="city_id"
                            control={control}
                            rules={{ required: 'City is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={cities.length > 0 ? cities : [{ value: '', label: 'No cities found for the selected state' }]}
                                    className="react-select-container"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select City"
                                    value={cities.find(city => city.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                        if (selected) fetchAreas(selected.value);
                                    }}
                                    noOptionsMessage={() => "No cities found for the selected state"}
                                />
                            )}
                        />
                        {renderError(errors.city_id)}
                    </div>

                    {/* Shop Area Field */}
                    <div>
                        <label htmlFor="area_id" className="block font-semibold text-gray-700">Area</label>
                        <Controller
                            name="area_id"
                            control={control}
                            rules={{ required: 'Area is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={areas.length > 0 ? areas : [{ value: '', label: 'No areas found for the selected city' }]}
                                    className="react-select-container"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select Area"
                                    value={areas.find(area => area.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                    }}
                                    noOptionsMessage={() => "No areas found for the selected city"}
                                />
                            )}
                        />
                        {renderError(errors.area_id)}
                    </div>

                    {/* Shop Business Field */}
                    <div>
                        <label htmlFor="business_id" className="block font-semibold text-gray-700">Business</label>
                        <Controller
                            name="business_id"
                            control={control}
                            rules={{ required: 'Business is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={businesses}
                                    className="react-select-container"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Select Business"
                                    value={businesses.find(business => business.value === field.value) || null}
                                    onChange={(selected) => {
                                        field.onChange(selected ? selected.value : null);
                                    }}
                                />
                            )}
                        />
                        {renderError(errors.business_id)}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">SEO Fields (Optional)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="focus_keyphrase" className="block font-semibold text-gray-700">Focus Keyphrase</label>
                            <input
                                type="text"
                                id="focus_keyphrase"
                                {...register('focus_keyphrase')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            />
                        </div>

                        <div>
                            <label htmlFor="seo_title" className="block font-semibold text-gray-700">SEO Title</label>
                            <input
                                type="text"
                                id="seo_title"
                                {...register('seo_title')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            />
                        </div>

                        <div>
                            <label htmlFor="meta_description" className="block font-semibold text-gray-700">Meta Description</label>
                            <textarea
                                id="meta_description"
                                {...register('meta_description')}
                                rows="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="canonical_url" className="block font-semibold text-gray-700">Canonical URL</label>
                            <input
                                type="url"
                                id="canonical_url"
                                {...register('canonical_url')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            />
                            {errors.canonical_url && <p className="mt-1 text-sm text-red-600">{errors.canonical_url.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="seo_schema" className="block font-semibold text-gray-700">SEO Schema</label>
                            <textarea
                                id="seo_schema"
                                {...register('seo_schema')}
                                rows="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="social_title" className="block font-semibold text-gray-700">Social Title</label>
                            <input
                                type="text"
                                id="social_title"
                                {...register('social_title')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            />
                        </div>

                        <div>
                            <label htmlFor="social_description" className="block font-semibold text-gray-700">Social Description</label>
                            <textarea
                                id="social_description"
                                {...register('social_description')}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="social_image" className="block font-semibold text-gray-700 mb-1">Social Image</label>
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    setSelectedFile(acceptedFiles[0]);
                                    setValue('social_image', acceptedFiles);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        {...getRootProps()}
                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#fa2964e6]"
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
                            {errors.social_image && (
                                <p className="text-red-500 text-xs mt-1">{errors.social_image.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-start gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-[#fa2964e6] text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa2964e6] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Shop'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddShop