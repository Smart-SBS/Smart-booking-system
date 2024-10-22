import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditSubCategory = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const [categories, setCategories] = useState([]);
    const [subCategoryImage, setSubCategoryImage] = useState(null);
    const { subCategoryId, subCategoryName } = useParams();

    const schema = yup.object().shape({
        category_id: yup.object().nullable().required('Please select a category'),
        subcategory_name: yup.string().required('Sub Category is required'),
        subcategory_image: yup.mixed()
    });

    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm({
        resolver: yupResolver(schema)
    });

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
                    label: `${category.category_name}`
                }));
                setCategories(categoryOptions);
                return categoryOptions;
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            toast.error('Failed to fetch categories', error);
        }
    };

    const fetchSubCategoryDetails = async (categories) => {
        try {
            const response = await axios.get(`${APP_URL}/api/subcategory-details/${subCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const subCategory = response.data.SubCategory;
            if (subCategory) {
                setValue('subcategory_name', subCategory.subcategory_name);

                if (subCategory && categories.length > 0) {
                    const selectedCategory = categories.find(category => category.value === subCategory.category_id);
                    if (selectedCategory) {
                        setValue('category_id', selectedCategory);
                    }
                }

                if (subCategory.image) {
                    setSubCategoryImage(`${IMG_URL}/subcategory/list/${subCategory.image}`);
                }
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error fetching subcategory details: ${errorMessages}`);
            } else {
                toast.error(`Error fetching subcategory details: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const categoryOptions = await fetchCategories();
            await fetchSubCategoryDetails(categoryOptions);
        };

        fetchData();
    }, [APP_URL]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subcategory_name', data.subcategory_name);
        formData.append('category_id', data.category_id.value);
        if (data.subcategory_image && data.subcategory_image[0]) formData.append('subcategory_image', data.subcategory_image[0]);

        try {
            const response = await axios.post(`${APP_URL}/api/edit-subcategory/${subCategoryId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/admin/subCategories');
                }, 2000);
            }
        } catch (error) {
            toast.error(`Failed to update sub category: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancel = () => {
        reset();
        navigate('/admin/subCategories');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="card">
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Edit Sub Category {subCategoryName}</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/subCategories'>Back</Link>
                </div>

                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row align-items-center">
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
                                        name="subcategory_name"
                                        {...register('subcategory_name')}
                                        placeholder="Enter Sub Category name"
                                    />
                                    <label htmlFor='subcategory_name' className="col-form-label">Sub Category</label>
                                    {errors.subcategory_name && <div className="invalid-feedback">{errors.subcategory_name.message}</div>}
                                </div>
                            </div>
                            {subCategoryImage ? (
                                <>
                                    <div className="col-md-1 col-12 mb-3">
                                        <img src={subCategoryImage} alt="Sub Category" className="img-thumbnail" style={{ maxWidth: '100%', height: '60px' }} />
                                    </div>
                                    <div className="col-md-5 col-12 mb-3">
                                        <div className="form-floating">
                                            <input
                                                type="file"
                                                className={`form-control ${errors.subcategory_image ? 'is-invalid' : ''}`}
                                                id="subcategory_image"
                                                {...register('subcategory_image')}
                                                accept="image/*"
                                            />
                                            <label htmlFor="subcategory_image">Sub Category Image</label>
                                            {errors.subcategory_image && <div className="invalid-feedback">{errors.subcategory_image.message}</div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 col-md-6 col-12">
                                    <div className="form-floating">
                                        <input
                                            type="file"
                                            className={`form-control ${errors.subcategory_image ? 'is-invalid' : ''}`}
                                            {...register('subcategory_image')}
                                        />
                                        <label className="col-form-label">Sub Category Image</label>
                                        {errors.subcategory_image && <div className="invalid-feedback">{errors.subcategory_image.message}</div>}
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

export default EditSubCategory;
