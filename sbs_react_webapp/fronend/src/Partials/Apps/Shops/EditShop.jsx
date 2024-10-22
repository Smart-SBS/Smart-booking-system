import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditShop = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    // State initialization
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [businesses, setBusinesses] = useState([]);

    // Fetch shop details from query string
    const { shopName, shopId } = useParams();

    // Schema initialization
    const schema = yup.object().shape({
        shop_name: yup.string().required('Shop name is required'),
        shop_contact_person: yup.string().required('Contact person is required'),
        shop_contact: yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be at least 10 digits').required('Contact is required'),
        shop_email: yup.string().email('Invalid email'),
        shop_onboarding_date: yup.string().required('Onboarding date is required'),
        shop_overview: yup.string().required('Shop overview is required'),
        state_id: yup.string().required('State is required'),
        city_id: yup.string().required('City is required'),
        area_id: yup.string().required('Area is required'),
        business_id: yup.string().required('Business is required'),

        //seo fields
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
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    // Fetch active businesses
    const fetchBusinesses = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/active-business`, {
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
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error fetching active business: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error fetching active business: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Fetch active states
    const fetchStates = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/activestates`, {
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
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error fetching active states: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error fetching active states: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Fetch active cities
    const fetchCities = async (stateId) => {
        try {
            const response = await axios.get(`${APP_URL}/api/activecities/${stateId}`, {
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
            setCities([])
        }
    };

    // Fetch active areas
    const fetchAreas = async (cityId) => {
        try {
            const response = await axios.get(`${APP_URL}/api/activeareas/${cityId}`, {
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
            setAreas([])
        }
    };

    // Fetch shop details
    const fetchShopData = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/detailshop/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;"
                }
            });

            if (response.data.shops) {
                const shopData = response.data.shops;

                // Set basic shop details
                setValue('shop_name', shopData.shop_name);
                setValue('shop_contact_person', shopData.shop_contact_person);
                setValue('shop_email', shopData.shop_email);
                setValue('shop_contact', shopData.shop_contact);
                setValue('shop_overview', shopData.shop_overview);
                setValue('shop_onboarding_date', shopData.shop_onboarding_date);
                setValue('focus_keyphrase', shopData.focus_keyphrase);
                setValue('seo_title', shopData.seo_title);
                setValue('meta_description', shopData.meta_description);
                setValue('canonical_url', shopData.canonical_url);
                setValue('seo_schema', shopData.seo_schema);
                setValue('social_title', shopData.social_title);
                setValue('social_description', shopData.social_description);

                // Set business
                if (shopData.business_id) {
                    setValue('business_id', shopData.business_id);
                    const matchedBusiness = businesses.find(business => business.value === shopData.business_id);
                    if (matchedBusiness) {
                        setBusinesses(prevBusinesses => [...prevBusinesses, matchedBusiness]);
                    }
                }

                // Set state
                if (shopData.state_id) {
                    setValue('state_id', shopData.state_id);
                    const matchedState = states.find(state => state.value === shopData.state_id);
                    if (matchedState) {
                        setStates(prevStates => [...prevStates, matchedState]);
                    }
                    // Fetch cities for this state
                    await fetchCities(shopData.state_id);
                }

                // Set city
                if (shopData.city_id) {
                    setValue('city_id', shopData.city_id);
                    const matchedCity = cities.find(city => city.value === shopData.city_id);
                    if (matchedCity) {
                        setCities(prevCities => [...prevCities, matchedCity]);
                    }
                    // Fetch areas for this city
                    await fetchAreas(shopData.city_id);
                }

                // Set area
                if (shopData.area_id) {
                    setValue('area_id', shopData.area_id);
                    const matchedArea = areas.find(area => area.value === shopData.area_id);
                    if (matchedArea) {
                        setAreas(prevAreas => [...prevAreas, matchedArea]);
                    }
                }
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error fetching shop details: ${errorMessages}`);
            } else {
                toast.error(`Error fetching shop details: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Use Effect to prefetch everything
    useEffect(() => {
        fetchBusinesses();
        fetchStates();
        fetchShopData();
    }, [shopId]);

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('shop_name', data.shop_name);
        formData.append('shop_contact_person', data.shop_contact_person);
        formData.append('shop_contact', data.shop_contact);
        formData.append('shop_email', data.shop_email);
        formData.append('shop_onboarding_date', data.shop_onboarding_date);
        formData.append('shop_overview', data.shop_overview);
        formData.append('area_id', data.area_id);
        formData.append('business_id', data.business_id);

        try {
            // Append optional fields only if they're filled
            if (data.focus_keyphrase) formData.append('focus_keyphrase', data.focus_keyphrase);
            if (data.seo_title) formData.append('seo_title', data.seo_title);
            if (data.meta_description) formData.append('meta_description', data.meta_description);
            if (data.canonical_url) formData.append('canonical_url', data.canonical_url);
            if (data.seo_schema) formData.append('seo_schema', data.seo_schema);
            if (data.social_title) formData.append('social_title', data.social_title);
            if (data.social_description) formData.append('social_description', data.social_description);
            if (data.social_image && data.social_image[0]) formData.append('social_image', data.social_image[0]);

            const res = await axios.post(`${APP_URL}/api/editshop/${shopId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/shops');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error updating shop: ${errorMessages}`);
            } else {
                toast.error(`Error updating shop: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle cancel
    const handleCancel = () => {
        reset()
        navigate('/admin/shops');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit Shop: {shopName}</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/shops'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.shop_name ? 'is-invalid' : ''}`}
                                        id="shop_name"
                                        {...register('shop_name')}
                                        placeholder="Shop Name"
                                    />
                                    <label htmlFor="shop_name">Shop Name</label>
                                    {errors.shop_name && <div className="invalid-feedback">{errors.shop_name.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.shop_contact_person ? 'is-invalid' : ''}`}
                                        id="shop_contact_person"
                                        {...register('shop_contact_person')}
                                        placeholder="Contact Person"
                                    />
                                    <label htmlFor="shop_contact_person">Contact Person</label>
                                    {errors.shop_contact_person && <div className="invalid-feedback">{errors.shop_contact_person.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.shop_contact ? 'is-invalid' : ''}`}
                                        id="shop_contact"
                                        {...register('shop_contact')}
                                        placeholder="Contact"
                                    />
                                    <label htmlFor="shop_contact">Contact</label>
                                    {errors.shop_contact && <div className="invalid-feedback">{errors.shop_contact.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.shop_email ? 'is-invalid' : ''}`}
                                        id="shop_email"
                                        {...register('shop_email')}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="shop_email">Email</label>
                                    {errors.shop_email && <div className="invalid-feedback">{errors.shop_email.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="date"
                                        className={`form-control ${errors.shop_onboarding_date ? 'is-invalid' : ''}`}
                                        id="shop_onboarding_date"
                                        {...register('shop_onboarding_date')}
                                    />
                                    <label htmlFor="shop_onboarding_date">Onboarding Date</label>
                                    {errors.shop_onboarding_date && <div className="invalid-feedback">{errors.shop_onboarding_date.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <textarea
                                        className={`form-control ${errors.shop_overview ? 'is-invalid' : ''}`}
                                        id="shop_overview"
                                        {...register('shop_overview')}
                                        placeholder="Shop Overview"
                                    ></textarea>
                                    <label htmlFor="shop_overview">Shop Overview</label>
                                    {errors.shop_overview && <div className="invalid-feedback">{errors.shop_overview.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="business_id"
                                        control={control}
                                        rules={{ required: 'Business is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={businesses}
                                                className={`basic-single ${errors.business_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select Business"
                                                value={businesses.find(business => business.value === field.value) || null}
                                                onChange={(selected) => {
                                                    field.onChange(selected ? selected.value : null);
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
                                                    menu: (baseStyles) => ({
                                                        ...baseStyles,
                                                        zIndex: 9999,
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.state_id && <div className="invalid-feedback">{errors.state_id.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="state_id"
                                        control={control}
                                        rules={{ required: 'State is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={states}
                                                className={`basic-single ${errors.state_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select State"
                                                value={states.find(state => state.value === field.value) || null}
                                                onChange={(selected) => {
                                                    field.onChange(selected ? selected.value : null);
                                                    if (selected) fetchCities(selected.value);
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
                                                    menu: (baseStyles) => ({
                                                        ...baseStyles,
                                                        zIndex: 9999,
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.state_id && <div className="invalid-feedback">{errors.state_id.message}</div>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="city_id"
                                        control={control}
                                        rules={{ required: 'City is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={cities.length > 0 ? cities : [{ value: '', label: 'No cities found for the selected state' }]}
                                                className={`basic-single ${errors.city_id ? 'is-invalid' : ''}`}
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
                            <div className="col-6">
                                <div className="form-floating">
                                    <Controller
                                        name="area_id"
                                        control={control}
                                        rules={{ required: 'Area is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={areas.length > 0 ? areas : [{ value: '', label: 'No areas found for the selected city' }]}
                                                className={`basic-single ${errors.area_id ? 'is-invalid' : ''}`}
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Select Area"
                                                value={areas.find(area => area.value === field.value) || null}
                                                onChange={(selected) => {
                                                    field.onChange(selected ? selected.value : null);
                                                }}
                                                noOptionsMessage={() => "No areas found for the selected city"}
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
                                    {errors.area_id && <div className="invalid-feedback">{errors.area_id.message}</div>}
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
                                <button type="submit" className="me-1 btn btn-primary">Update</button>
                                <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditShop;