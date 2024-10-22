import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddCategory = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    // Schema initialization
    const schema = yup.object().shape({
        category_name: yup.string().required('Category is required'),
        category_image: yup.mixed(),
    });

    // useForm hook initialization
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('category_name', data.category_name);
        if (data.category_image && data.category_image[0]) formData.append('category_image', data.category_image[0]);

        try {
            const response = await axios.post(`${APP_URL}/api/add-category`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => navigate('/admin/categories'), 2000);
            }
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error updating category: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating category: ${error.response?.data?.message || error.message}`);
            }
        }
        reset();
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        navigate('/admin/categories');
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="card">
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Add Category</strong></h6>
                    <Link className='btn btn-info text-white' to='/admin/categories'>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.category_name ? 'is-invalid' : ''}`}
                                        {...register('category_name')}
                                        placeholder="Enter Category name"
                                    />
                                    <label htmlFor='category_name' className="col-form-label">Category</label>
                                    {errors.category_name && <div className="invalid-feedback">{errors.category_name.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className={`form-control ${errors.category_image ? 'is-invalid' : ''}`}
                                        {...register('category_image')}
                                    />
                                    <label htmlFor='category_image' className="col-form-label">Category Image</label>
                                    {errors.category_image && <div className="invalid-feedback">{errors.category_image.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Add Category</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;