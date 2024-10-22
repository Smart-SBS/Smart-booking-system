import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditBusiness = () => {
    const { businessName, businessId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [businessTypes, setBusinessTypes] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState(null);
    const [vendorNames, setVendorNames] = useState([]);
    const [selectedVendorName, setSelectedVendorName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [businessLogo, setBusinessLogo] = useState(null)

    const schema = yup.object().shape({
        business_name: yup.string().required('Business name is required'),
        business_email: yup.string().email('Invalid email').required('Business email is required'),
        business_contact: yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be at least 10 digits').required('Business contact is required'),
        business_type_id: yup.number().required('Business type is required'),
        onboarding_date: yup.string().required('Onboarding date is required'),
        business_overview: yup.string().required('Business overview is required'),
        business_logo: yup.mixed().required('Business logo is required'),
        user_id: yup.number().required('Vendor Name is required'),
        category_id: yup.string().required('Category is required'),
        subcategory_id: yup.string().required('Subcategory is required'),
        old_business_logo: yup.string()
    });

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onBusinessTypeSelect = (selectedOption) => {
        setSelectedBusinessType(selectedOption);
        setValue('business_type_id', selectedOption ? selectedOption.value : '');
    };

    const onVendorNameSelect = (selectedOption) => {
        setSelectedVendorName(selectedOption);
        setValue('user_id', selectedOption ? selectedOption.value : '');
    };

    const onCategorySelect = async (selectedOption) => {
        setSelectedCategory(selectedOption);
        setValue('category_id', selectedOption ? selectedOption.value : '');
        setSelectedSubcategory(null);
        setValue('subcategory_id', '');

        if (selectedOption) {
            await fetchSubcategories(selectedOption.value);
        }
    };

    // Fetch business types
    useEffect(() => {
        const fetchBusinessTypes = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/business-type-list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
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
                        "Content-Type": "application/json"
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

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`${APP_URL}/api/active-subcategories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data && response.data.active_subcategory) {
                const subcategoryOptions = response.data.active_subcategory.map(subcategory => ({
                    value: subcategory.id.toString(),
                    label: subcategory.subcategory_name
                }));
                setSubcategories(subcategoryOptions);
                return subcategoryOptions;
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            toast.error('Failed to fetch subcategories');
            return [];
        }
    };

    //fetch business details
    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await axios.get(`${APP_URL}/api/business-details/${businessId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.data.business) {
                    const business = res.data.business;

                    // Set form values
                    setValue('business_name', business.business_name || '');
                    setValue('business_email', business.business_email || '');
                    setValue('business_contact', business.business_contact || '');
                    setValue('onboarding_date', business.onboarding_date || '');
                    setValue('business_overview', business.business_overview || '');
                    setValue("old_business_logo", business.business_logo)

                    // Set business logo if available
                    if (business.business_logo) {
                        setBusinessLogo(`${IMG_URL}/logo/list/${business.business_logo}`);
                    }

                    // Business Type
                    const matchedType = businessTypes.find(type => type.value === business.business_type_id);
                    if (matchedType) {
                        setSelectedBusinessType(matchedType);
                        setValue('business_type_id', matchedType.value);
                    }

                    // Vendor Name
                    const vendorName = `${business.firstname} ${business.lastname}`;
                    const matchedVendor = vendorNames.find(vendor => vendor.label === vendorName);
                    if (matchedVendor) {
                        setSelectedVendorName(matchedVendor);
                        setValue('user_id', matchedVendor.value);
                    }

                    // Category
                    const matchedCategory = categories.find(cat => cat.value === business.category_id);
                    if (matchedCategory) {
                        setSelectedCategory(matchedCategory);
                        setValue('category_id', matchedCategory.value);

                        // Fetch subcategories for this category
                        const subcats = await fetchSubcategories(matchedCategory.value);

                        // Set subcategory after fetching
                        const matchedSubcategory = subcats.find(sub => sub.value === business.subcategory_id.toString());
                        if (matchedSubcategory) {
                            setSelectedSubcategory(matchedSubcategory);
                            setValue('subcategory_id', matchedSubcategory.value);
                        }
                    }
                }
            } catch (error) {
                toast.error('Error fetching business data');
            }
        };

        if (businessTypes.length > 0 && vendorNames.length > 0 && categories.length > 0) {
            fetchBusiness();
        }
    }, [businessId, setValue, token, businessTypes, vendorNames, categories]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        if (data.business_name) formData.append('business_name', data.business_name);
        if (data.business_email) formData.append('business_email', data.business_email);
        if (data.business_contact) formData.append('business_contact', data.business_contact);
        if (data.business_type_id) formData.append('business_type_id', data.business_type_id);
        if (data.onboarding_date) formData.append('onboarding_date', data.onboarding_date);
        if (data.business_overview) formData.append('business_overview', data.business_overview);
        if (data.business_logo && data.business_logo[0]) formData.append('business_logo', data.business_logo[0]);
        if (data.old_business_logo) formData.append('old_business_logo', data.old_business_logo);
        if (data.user_id) formData.append('user_id', data.user_id);
        if (data.subcategory_id) formData.append('subcategory_id', data.subcategory_id);

        try {
            const res = await axios.post(`${APP_URL}/api/edit-business/${businessId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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
                toast.error(`Error updating business: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating business: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const handleCancel = () => {
        reset();
        navigate('/admin/businessList');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit {businessName} Details</strong></h6>
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
                                    <input type="date" className={`form-control ${errors.onboarding_date ? 'is-invalid' : ''}`} {...register('onboarding_date')} />
                                    <label className="col-form-label">Onboarding Date</label>
                                    {errors.onboarding_date && <div className="invalid-feedback">{errors.onboarding_date.message}</div>}
                                </div>
                            </div>
                            {businessLogo ? (
                                <>
                                    <div className="col-md-1">
                                        <img src={businessLogo} alt="Business Logo" className="img-thumbnail" style={{ maxWidth: '100%', height: '60px' }} />
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-floating">
                                            <input
                                                type="file"
                                                className={`form-control ${errors.business_logo ? 'is-invalid' : ''}`}
                                                id="business_logo"
                                                {...register('business_logo')}
                                                accept="image/*"
                                            />
                                            <input type='hidden' name='old_business_logo' id='old_business_logo' {...register('old_business_logo')} />
                                            <label htmlFor="business_logo">Business Logo</label>
                                            {errors.business_logo && <div className="invalid-feedback">{errors.business_logo.message}</div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 col-6">
                                    <div className="form-floating">
                                        <input type="file" className={`form-control ${errors.business_logo ? 'is-invalid' : ''}`} {...register('business_logo')} accept="image/*" />
                                        <label className="col-form-label">Business Logo</label>
                                        {errors.business_logo && <div className="invalid-feedback">{errors.business_logo.message}</div>}
                                    </div>
                                </div>
                            )}
                            <div className="mb-3 col-6">
                                <div className="form-floating">
                                    <textarea className={`form-control ${errors.business_overview ? 'is-invalid' : ''}`} {...register('business_overview')}></textarea>
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
                                                placeholder="Select vendor"
                                                onChange={(option) => {
                                                    onVendorNameSelect(option);
                                                    field.onChange(option ? option.value : null);
                                                }}
                                                value={selectedVendorName}
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
                                                placeholder="Select business type"
                                                onChange={(option) => {
                                                    onBusinessTypeSelect(option);
                                                    field.onChange(option ? option.value : null);
                                                }}
                                                value={selectedBusinessType}
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
                            <div className="mb-3 col-md-6">
                                <div className="form-floating">
                                    <Controller
                                        name="category_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                className={`basic-single ${errors.category_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select category"
                                                onChange={(option) => {
                                                    onCategorySelect(option);
                                                    field.onChange(option ? option.value : null);
                                                }}
                                                value={selectedCategory}
                                                isLoading={categories.length === 0}
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
                            <div className="mb-3 col-md-6">
                                <div className="form-floating">
                                    <Controller
                                        name="subcategory_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={subcategories}
                                                className={`basic-single ${errors.subcategory_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select subcategory"
                                                onChange={(option) => {
                                                    setSelectedSubcategory(option);
                                                    field.onChange(option ? option.value : null);
                                                }}
                                                value={selectedSubcategory}
                                                isLoading={subcategories.length === 0}
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

export default EditBusiness;
