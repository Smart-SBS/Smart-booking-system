import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddSubCategory = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    // State initialization
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);

    // Schema initialization
    const schema = yup.object().shape({
        category_id: yup.object().nullable().required('Please select a category'),
        subcategory_name: yup.string().required('Sub Category is required'),
        subcategory_image: yup.mixed()
    });

    // useForm hook initialization
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ resolver: yupResolver(schema) });

    //fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/category`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                if (response.data && response.data.category) {
                    const categoryOptions = response.data.category.map(category => ({
                        value: category.id,
                        label: category.category_name
                    }));
                    setCategories(categoryOptions);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching categories: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching categories: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchCategories();
    }, [APP_URL, token]);

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('category_id', data.category_id.value);
        formData.append('subcategory_name', data.subcategory_name);
        if (data.subcategory_image.length) {
            formData.append('subcategory_image', data.subcategory_image[0]);
        }
        try {
            const response = await axios.post(`${APP_URL}/api/add-subcategory`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/admin/subCategories');
                }, 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error adding subcategory: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error adding subcategory: ${error.response?.data?.message || error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
        reset();
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/subCategories');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="card">
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Add Sub Category</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/subCategories'>Back</Link>
                </div>

                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-6 col-12">
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
                                                placeholder="Select Category"
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
                                    {errors.category_id && <div className="invalid-feedback">{errors.category_id.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.subcategory_name ? 'is-invalid' : ''}`}
                                        {...register('subcategory_name')}
                                        placeholder="Enter Sub Category name"
                                    />
                                    <label htmlFor='subcategory_name' className="col-form-label">Sub Category</label>
                                    {errors.subcategory_name && <div className="invalid-feedback">{errors.subcategory_name.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className={`form-control ${errors.subcategory_image ? 'is-invalid' : ''}`}
                                        {...register('subcategory_image')}
                                    />
                                    <label htmlFor='subcategory_image' className="col-form-label">Sub Category Image</label>
                                    {errors.subcategory_image && <div className="invalid-feedback">{errors.subcategory_image.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Adding...' : 'Add Sub Category'}
                                </button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSubCategory;
