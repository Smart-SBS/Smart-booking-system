import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditCity = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    // City details from query string
    const { cityName, cityId } = useParams();

    // State initialization
    const [states, setStates] = useState([]);
    const [cityImage, setCityImage] = useState(null);

    // Schema initialization
    const schema = yup.object().shape({
        state_id: yup.string().required('State is required'),
        city_name: yup.string().required('City name is required'),
        city_image: yup.mixed()
    });

    // useForm hook initialization
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            city_name: '',
            state_id: ''
        }
    });

    //fetch states
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/states`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.States) {
                    const stateOptions = response.data.States.map(state => ({
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
                    toast.error(`Error fetching states: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching states: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchStates();
    }, [APP_URL, token]);

    //fetch city details
    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/city-details/${cityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data && response.data.City) {
                    const cityData = response.data.City;

                    if (cityData.city_image) {
                        setCityImage(`${IMG_URL}/category/list/${cityData.city_image}`)
                    }

                    reset({
                        city_name: cityData.city_name,
                        state_id: cityData.state_id
                    });
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

        fetchCityDetails();
    }, [APP_URL, cityId, token, reset, IMG_URL]);

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('city_name', data.city_name);
        formData.append('state_id', data.state_id);
        if (data.city_image && data.city_image[0]) formData.append('city_image', data.city_image[0]);
        try {
            const res = await axios.post(`${APP_URL}/api/edit-city/${cityId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/cities');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error updating city: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating city: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/cities');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit {cityName} City</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/cities'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-6 col-12">
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
                                                onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : '')}
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
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.city_name ? 'is-invalid' : ''}`}
                                        {...register('city_name')}
                                        placeholder="City"
                                        defaultValue=""
                                    />
                                    <label htmlFor='city_name' className="col-form-label">City</label>
                                    {errors.city_name && <div className="invalid-feedback">{errors.city_name.message}</div>}
                                </div>
                            </div>
                            {cityImage ? (
                                <>
                                    <div className="col-md-1 col-12">
                                        <img src={cityImage} alt="City Image" className="img-thumbnail" style={{ maxWidth: '100%', height: '60px' }} />
                                    </div>
                                    <div className="col-md-5 col-12">
                                        <div className="form-floating">
                                            <input
                                                type="file"
                                                className={`form-control ${errors.city_image ? 'is-invalid' : ''}`}
                                                {...register('city_image')}
                                            />
                                            <label htmlFor='city_image' className="col-form-label">City Image</label>
                                            {errors.city_image && <div className="invalid-feedback">{errors.city_image.message}</div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 col-md-6 col-12">
                                    <div className="form-floating">
                                        <input
                                            type="file"
                                            className={`form-control ${errors.city_image ? 'is-invalid' : ''}`}
                                            {...register('city_image')}
                                        />
                                        <label htmlFor='city_image' className="col-form-label">City Image</label>
                                        {errors.city_image && <div className="invalid-feedback">{errors.city_image.message}</div>}
                                    </div>
                                </div>
                            )}
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

export default EditCity;
