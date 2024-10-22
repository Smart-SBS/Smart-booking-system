import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const NewProject = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const [businessTypes, setBusinessTypes] = useState([]);
    const [vendorNames, setVendorNames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const schema = yup.object().shape({
        business_name: yup.string().required('Business name is required'),
        business_email: yup.string().email('Invalid email').required('Business email is required'),
        business_contact: yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits')
            .required('Business contact is required'),
        business_type_id: yup.number().required('Business type is required'),
        onboarding_date: yup.string().required('Onboarding date is required'),
        business_overview: yup.string().required('Business overview is required'),
        business_logo: yup.mixed().required('Business logo is required'),
        user_id: yup.number().required('Vendor Name is required'),
        category_id: yup.string().required('Category is required'),
        subcategory_id: yup.string().required('Subcategory is required')
    });

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Fetch business types
    useEffect(() => {
        const fetchBusinessTypes = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/business-type-list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && Array.isArray(response.data.BusinessTypes)) {
                    const typeOptions = response.data.BusinessTypes.map(type => ({
                        value: type.id,
                        label: type.business_type_name
                    }));
                    setBusinessTypes(typeOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                toast.error('Failed to fetch business types');
                setBusinessTypes([]);
            }
        };

        fetchBusinessTypes();
    }, [APP_URL, token]);

    // Fetch vendors
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/all-vendors-dropdown`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data && Array.isArray(response.data.vendors)) {
                    const vendorOptions = response.data.vendors.map(vendor => ({
                        value: vendor.id,
                        label: `${vendor.firstname} ${vendor.lastname}`
                    }));
                    setVendorNames(vendorOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                toast.error('Failed to fetch vendors');
                setVendorNames([]);
            }
        };

        fetchVendors();
    }, [APP_URL, token]);

    //fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/active-categories`, {
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
                toast.error('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, [APP_URL, token]);

    //fetch sub categories
    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`${APP_URL}/api/active-subcategories/${categoryId}`, {
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
            setSubcategories([]);
        }
    };

    //handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.business_name) formData.append('business_name', data.business_name);
        if (data.business_email) formData.append('business_email', data.business_email);
        if (data.business_contact) formData.append('business_contact', data.business_contact);
        if (data.business_type_id) formData.append('business_type_id', data.business_type_id);
        if (data.onboarding_date) formData.append('onboarding_date', data.onboarding_date);
        if (data.business_overview) formData.append('business_overview', data.business_overview);
        if (data.business_logo && data.business_logo[0]) formData.append('business_logo', data.business_logo[0]);
        if (data.user_id) formData.append('user_id', data.user_id);
        if (data.subcategory_id) formData.append('subcategory_id', data.subcategory_id);

        try {
            const res = await axios.post(`${APP_URL}/api/add-business`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/businessList');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error adding business: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error adding business: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/businessList');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h4 className="title-font mt-2 mb-0"><strong>New Business</strong></h4>
                    <Link className='btn btn-info text-white' to='/admin/businessList'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.business_name ? 'is-invalid' : ''}`}
                                        id="business_name"
                                        {...register('business_name')}
                                        placeholder="Business Name"
                                    />
                                    <label htmlFor="business_name">Business Name</label>
                                    {errors.business_name && <div className="invalid-feedback">{errors.business_name.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.business_email ? 'is-invalid' : ''}`}
                                        id="business_email"
                                        {...register('business_email')}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="business_email">Email</label>
                                    {errors.business_email && <div className="invalid-feedback">{errors.business_email.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.business_contact ? 'is-invalid' : ''}`}
                                        id="business_contact"
                                        {...register('business_contact')}
                                        placeholder="Contact"
                                    />
                                    <label htmlFor="business_contact">Contact</label>
                                    {errors.business_contact && <div className="invalid-feedback">{errors.business_contact.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="date"
                                        className={`form-control ${errors.onboarding_date ? 'is-invalid' : ''}`}
                                        {...register('onboarding_date')}
                                    />
                                    <label className="col-form-label">Onboarding Date</label>
                                    {errors.onboarding_date && <div className="invalid-feedback">{errors.onboarding_date.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-6">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className={`form-control ${errors.business_logo ? 'is-invalid' : ''}`}
                                        {...register('business_logo')}
                                        accept="image/*"
                                    />
                                    <label className="col-form-label">Business Logo</label>
                                    {errors.business_logo && <div className="invalid-feedback">{errors.business_logo.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-6">
                                <div className="form-floating">
                                    <textarea
                                        className={`form-control ${errors.business_overview ? 'is-invalid' : ''}`}
                                        {...register('business_overview')}
                                    ></textarea>
                                    <label className="col-form-label">Business Overview</label>
                                    {errors.business_overview && <div className="invalid-feedback">{errors.business_overview.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6">
                                <div className="form-floating">
                                    <Controller
                                        name="user_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={vendorNames}
                                                className={`basic-single ${errors.user_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                value={vendorNames.find(option => option.value === field.value)}
                                                placeholder="Select vendor"
                                                onChange={(selectedOption) => {
                                                    field.onChange(selectedOption ? selectedOption.value : '');
                                                }}
                                                isLoading={vendorNames.length === 0}
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
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.user_id && <div className="invalid-feedback">{errors.user_id.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6">
                                <div className="form-floating">
                                    <Controller
                                        name="business_type_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={businessTypes}
                                                className={`basic-single ${errors.business_type_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                value={businessTypes.find(option => option.value === field.value)}
                                                placeholder="Select business type"
                                                onChange={(selectedOption) => {
                                                    field.onChange(selectedOption ? selectedOption.value : '');
                                                }}
                                                isLoading={businessTypes.length === 0}
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
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.business_type_id && <div className="invalid-feedback">{errors.business_type_id.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="category_id"
                                        control={control}
                                        rules={{ required: 'Category is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                className={`basic-single ${errors.category_id ? 'is-invalid' : ''}`}
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
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.category_id && <div className="invalid-feedback">{errors.category_id.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="subcategory_id"
                                        control={control}
                                        rules={{ required: 'Subcategory is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={subcategories.length > 0 ? subcategories : [{ value: '', label: 'No subcategories found for the selected category' }]}
                                                className={`basic-single ${errors.subcategory_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select Subcategory"
                                                value={subcategories.find(subcategory => subcategory.value === field.value) || null}
                                                onChange={(selected) => {
                                                    field.onChange(selected ? selected.value : null);
                                                }}
                                                noOptionsMessage={() => "No subcategories found for the selected category"}
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
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.subcategory_id && <div className="invalid-feedback">{errors.subcategory_id.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Add Business</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewProject;
