import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from 'dompurify';

const editorConfiguration = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList'],
};

const AddCatalogue = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    const { shopId, shopName } = useParams();
    const [platformFeeType, setPlatformFeeType] = useState('%');

    // Schema initialization
    const schema = yup.object().shape({
        item_title: yup.string().required('Item Title is required'),
        item_description: yup.string().required('Item Description is required'),
        price: yup.number().positive('Price must be a positive number').required('Price is required'),
        sale_price: yup.number().positive('Sales price must be a positive number').required('Sales price is required'),
        focus_keyphrase: yup.string(),
        seo_title: yup.string(),
        meta_description: yup.string(),
        canonical_url: yup.string().url('Must be a valid URL'),
        seo_schema: yup.string(),
        social_title: yup.string(),
        social_description: yup.string(),
        social_image: yup.mixed(),
        platform_fee_type: yup.string().oneOf(['%', 'flat']).required('Platform fee type is required'),
        platform_fee: yup.number().when('platform_fee_type', {
            is: '%',
            then: (schema) => schema.min(0).max(100).required('Platform fee is required'),
            otherwise: (schema) => schema.min(0).required('Platform fee is required')
        })
    });

    // useForm hook initialization
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('shop_id', shopId);
        formData.append('item_title', data.item_title);

        let sanitizedDescription = DOMPurify.sanitize(data.item_description, {
            ALLOWED_TAGS: ['br', 'b', 'i', 'a', 'ul', 'ol', 'li'],
            ALLOWED_ATTR: ['href', 'target'],
            KEEP_CONTENT: true
        });

        sanitizedDescription = sanitizedDescription
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '<br>')
            .replace(/^(<br>)+|(<br>)+$/g, '');

        formData.append('item_description', sanitizedDescription);
        formData.append('price', data.price);
        formData.append('sale_price', data.sale_price);
        formData.append('platform_fee_type', data.platform_fee_type);
        formData.append('platform_fee', data.platform_fee);

        try {
            if (data.focus_keyphrase) formData.append('focus_keyphrase', data.focus_keyphrase);
            if (data.seo_title) formData.append('seo_title', data.seo_title);
            if (data.meta_description) formData.append('meta_description', data.meta_description);
            if (data.canonical_url) formData.append('canonical_url', data.canonical_url);
            if (data.seo_schema) formData.append('seo_schema', data.seo_schema);
            if (data.social_title) formData.append('social_title', data.social_title);
            if (data.social_description) formData.append('social_description', data.social_description);
            if (data.social_image && data.social_image[0]) formData.append('social_image', data.social_image[0]);

            const res = await axios.post(`${APP_URL}/api/addcatalog`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate(`/admin/shop/catalogue/${shopName}/${shopId}`);
                }, 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error adding catalogue: ${errorMessages}`);
            } else {
                toast.error(`Error adding catalogue: ${errorMessage || error.message}`);
            }
        }
    };

    const handleCancel = () => {
        reset();
        navigate(`/admin/shop/catalogue/${shopName}/${shopId}`);
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}><strong>Add Catalogue</strong></h6>
                    <Link className='btn btn-info text-white' to={`/admin/shop/catalogue/${shopName}/${shopId}`}>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-4 col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.item_title ? 'is-invalid' : ''}`}
                                        id="item_title"
                                        {...register('item_title')}
                                        placeholder="Item Title"
                                    />
                                    <label htmlFor="item_title" className="col-form-label">Item Title</label>
                                    {errors.item_title && <div className="invalid-feedback">{errors.item_title.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-4 col-12">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                        id="price"
                                        {...register('price')}
                                        placeholder='Price'
                                    />
                                    <label htmlFor="price" className="col-form-label">Price</label>
                                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                                </div>
                            </div>
                            <div className="mb-3 col-md-4 col-12">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.sale_price ? 'is-invalid' : ''}`}
                                        id="sale_price"
                                        {...register('sale_price')}
                                        placeholder='Sale Price'
                                    />
                                    <label htmlFor="sale_price" className="col-form-label">Sale Price</label>
                                    {errors.sale_price && <div className="invalid-feedback">{errors.sale_price.message}</div>}
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <select
                                        className={`form-select ${errors.platform_fee_type ? 'is-invalid' : ''}`}
                                        {...register('platform_fee_type')}
                                        onChange={(e) => setPlatformFeeType(e.target.value)}
                                    >
                                        <option value="%">Percentage</option>
                                        <option value="flat">Flat</option>
                                    </select>
                                    <label htmlFor="platform_fee_type" className="col-form-label">Platform Fee Type</label>
                                    {errors.platform_fee_type && <div className="invalid-feedback">{errors.platform_fee_type.message}</div>}
                                </div>
                            </div>

                            <div className="mb-3 col-md-6 col-12">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.platform_fee ? 'is-invalid' : ''}`}
                                        {...register('platform_fee')}
                                        placeholder="Platform Fee"
                                        step={platformFeeType === '%' ? '0.01' : '1'}
                                        min="0"
                                        max={platformFeeType === '%' ? '100' : undefined}
                                    />
                                    <label htmlFor="platform_fee" className="col-form-label">
                                        Platform Fee {platformFeeType === '%' ? '(%)' : ''}
                                    </label>
                                    {errors.platform_fee && <div className="invalid-feedback">{errors.platform_fee.message}</div>}
                                </div>
                            </div>

                            <div className="mb-3 col-md-12 col-12">
                                <label htmlFor="item_description" className="form-label">Item Description</label>
                                <Controller
                                    name="item_description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={editorConfiguration}
                                            data={field.value}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                field.onChange(data);
                                            }}
                                        />
                                    )}
                                />
                                {errors.item_description && <div className="invalid-feedback">{errors.item_description.message}</div>}
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
                                <button className="me-1 btn btn-primary" type="submit">Add Catalogue</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCatalogue