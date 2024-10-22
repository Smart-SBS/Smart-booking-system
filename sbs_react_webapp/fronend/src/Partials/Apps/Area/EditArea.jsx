import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditArea = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    // Area details from query string
    const { areaName, areaId } = useParams();

    // State initialization
    const [cities, setCities] = useState([]);

    // Schema initialization
    const schema = yup.object().shape({
        area_name: yup.string().required('Area name is required').typeError('Area name must be a string'),
        city_id: yup.object().required('City is required').typeError('Please select a city'),
        pincode: yup.number().positive('Pincode must be a positive number').required('Pincode is required').typeError('Pincode must be a number'),
        focus_keyphrase: yup.string(),
        seo_title: yup.string(),
        meta_description: yup.string(),
        canonical_url: yup.string().url('Must be a valid URL'),
        seo_schema: yup.string(),
        social_title: yup.string(),
        social_description: yup.string(),
        social_image: yup.mixed()
    });

    // useForm hook initialization
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            area_name: '',
            city_id: null,
            pincode: ''
        }
    });

    //fetch cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/cities`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.Cities) {
                    const cityOptions = response.data.Cities.map(city => ({
                        value: city.id,
                        label: city.city_name
                    }));
                    setCities(cityOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching cities: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching cities: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchCities();
    }, [APP_URL, token]);

    //fetch area details
    useEffect(() => {
        const fetchAreaDetails = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/area-details/${areaId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data && response.data.Area) {
                    const areaData = response.data.Area;
                    reset({
                        area_name: areaData.area_name,
                        city_id: { value: areaData.city_id, label: areaData.city_name },
                        pincode: areaData.pincode
                    });
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching area data: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching area data: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchAreaDetails();
    }, [APP_URL, areaId, token, reset]);

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('area_name', data.area_name);
        formData.append('city_id', data.city_id.value);
        formData.append('pincode', data.pincode);

        // Append optional fields only if they're filled
        if (data.focus_keyphrase) formData.append('focus_keyphrase', data.focus_keyphrase);
        if (data.seo_title) formData.append('seo_title', data.seo_title);
        if (data.meta_description) formData.append('meta_description', data.meta_description);
        if (data.canonical_url) formData.append('canonical_url', data.canonical_url);
        if (data.seo_schema) formData.append('seo_schema', data.seo_schema);
        if (data.social_title) formData.append('social_title', data.social_title);
        if (data.social_description) formData.append('social_description', data.social_description);
        if (data.social_image && data.social_image[0]) formData.append('social_image', data.social_image[0]);

        try {
            const res = await axios.post(`${APP_URL}/api/edit-area/${areaId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/areas');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error updating area: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating area: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/areas');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit Area {areaName}</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/areas'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <Controller
                                        name="city_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={cities}
                                                className={`basic-single ${errors.city_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select City"
                                                value={cities.find(city => city.value === field.value?.value)}
                                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        height: 'calc(3.5rem + 2px)',
                                                        borderRadius: '0.375rem',
                                                        border: '1px solid #ced4da',
                                                    }),
                                                    valueContainer: (baseStyles) => ({
                                                        ...baseStyles,
                                                        height: '100%',
                                                        padding: '0.7rem 0.6rem',
                                                    }),
                                                    placeholder: (baseStyles) => ({
                                                        ...baseStyles,
                                                        color: '#6c757d',
                                                    }),
                                                    input: (baseStyles) => ({
                                                        ...baseStyles,
                                                        margin: 0,
                                                        padding: 0,
                                                    }),
                                                    menu: (baseStyles) => ({
                                                        ...baseStyles,
                                                        zIndex: 9999,
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.city_id && <div className="invalid-feedback">{errors.city_id.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.area_name ? 'is-invalid' : ''}`}
                                        {...register('area_name')}
                                        placeholder="Area"
                                        defaultValue=""
                                    />
                                    <label htmlFor='area_name' className="col-form-label">Area</label>
                                    {errors.area_name && <div className="invalid-feedback">{errors.area_name.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                                        {...register('pincode')}
                                        placeholder="Pincode"
                                        defaultValue=""
                                    />
                                    <label htmlFor='pincode' className="col-form-label">Pincode</label>
                                    {errors.pincode && <div className="invalid-feedback">{errors.pincode.message}</div>}
                                </div>
                            </div>

                            <h6 className="mt-4 mb-3">SEO (Optional)</h6>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register('focus_keyphrase')}
                                        placeholder="Focus Keyword"
                                    />
                                    <label htmlFor='focus_keyphrase' className="col-form-label">Focus Keyword</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register('seo_title')}
                                        placeholder="SEO Title"
                                    />
                                    <label htmlFor='seo_title' className="col-form-label">SEO Title</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        {...register('meta_description')}
                                        placeholder="Meta Description"
                                    />
                                    <label htmlFor='meta_description' className="col-form-label">Meta Description</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="url"
                                        className="form-control"
                                        {...register('canonical_url')}
                                        placeholder="Canonical URL"
                                    />
                                    <label htmlFor='canonical_url' className="col-form-label">Canonical URL</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        {...register('seo_schema')}
                                        placeholder="SEO Schema"
                                    />
                                    <label htmlFor='seo_schema' className="col-form-label">SEO Schema</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register('social_title')}
                                        placeholder="Social Title"
                                    />
                                    <label htmlFor='social_title' className="col-form-label">Social Title</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        {...register('social_description')}
                                        placeholder="Social Description"
                                    />
                                    <label htmlFor='social_description' className="col-form-label">Social Description</label>
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className="form-control"
                                        {...register('social_image')}
                                        accept="image/*"
                                    />
                                    <label htmlFor='social_image' className="col-form-label">Social Image</label>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Update</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditArea;
