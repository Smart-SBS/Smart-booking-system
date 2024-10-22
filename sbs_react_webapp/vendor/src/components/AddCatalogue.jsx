import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const editorConfiguration = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList'],
};

const AddCatalogue = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    const { shopId, shopName } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        social_image: yup.mixed()
    });

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('shop_id', shopId)
            formData.append('item_title', data.item_title);

            let sanitizedDescription = DOMPurify.sanitize(data.item_description, {
                ALLOWED_TAGS: ['br', 'b', 'i', 'a', 'ul', 'ol', 'li'],
                ALLOWED_ATTR: ['href', 'target'],
                KEEP_CONTENT: true
            });

            // Remove <p> tags and replace with line breaks
            sanitizedDescription = sanitizedDescription
                .replace(/<p>/g, '')
                .replace(/<\/p>/g, '<br>');

            // Remove any leading or trailing <br> tags
            sanitizedDescription = sanitizedDescription
                .replace(/^(<br>)+|(<br>)+$/g, '');

            formData.append('item_description', sanitizedDescription);

            formData.append('price', data.price);
            formData.append('sale_price', data.sale_price);

            // Append optional fields only if they're filled
            if (data.focus_keyphrase) formData.append('focus_keyphrase', data.focus_keyphrase);
            if (data.seo_title) formData.append('seo_title', data.seo_title);
            if (data.meta_description) formData.append('meta_description', data.meta_description);
            if (data.canonical_url) formData.append('canonical_url', data.canonical_url);
            if (data.seo_schema) formData.append('seo_schema', data.seo_schema);
            if (data.social_title) formData.append('social_title', data.social_title);
            if (data.social_description) formData.append('social_description', data.social_description);
            if (data.social_image && data.social_image[0]) formData.append('social_image', data.social_image[0]);

            const res = await axios.post(`${APP_URL}/ma-add-catalog`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate(`/catalogues/${shopName}/${shopId}`);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h6 className="text-xl font-bold">Add Catalogue</h6>
                <Link className="mt-2 inline-block px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600" to={`/catalogues/${shopName}/${shopId}`}>Back</Link>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="item_title" className="block font-semibold text-gray-700">Item Title</label>
                            <input
                                type="text"
                                id="item_title"
                                {...register('item_title')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.item_title ? 'border-red-500' : ''}`}
                                placeholder="Item Title"
                            />
                            {errors.item_title && <p className="mt-1 text-red-500">{errors.item_title.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="price" className="block font-semibold text-gray-700">Price</label>
                            <input
                                type="number"
                                inputMode='numeric'
                                onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                                id="price"
                                {...register('price')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.price ? 'border-red-500' : ''}`}
                                placeholder="Price"
                            />
                            {errors.price && <p className="mt-1 text-red-500">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="sale_price" className="block font-semibold text-gray-700">Sale Price</label>
                            <input
                                type="number"
                                inputMode='numeric'
                                onInput={(e) => e.target.value = e.target.value.replace(/\D+/g, '')}
                                id="sale_price"
                                {...register('sale_price')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] ${errors.sale_price ? 'border-red-500' : ''}`}
                                placeholder="Sale Price"
                            />
                            {errors.sale_price && <p className="mt-1 text-red-500">{errors.sale_price.message}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="item_description" className="block font-semibold text-gray-700">Item Description</label>
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
                        {errors.item_description && <p className="mt-1 text-red-500">{errors.item_description.message}</p>}
                    </div>

                    <h6 className="mt-8 mb-4 text-lg font-semibold">SEO (Optional)</h6>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="focus_keyphrase" className="block font-semibold text-gray-700">Focus Keyword</label>
                            <input
                                type="text"
                                id="focus_keyphrase"
                                {...register('focus_keyphrase')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="Focus Keyword"
                            />
                        </div>
                        <div>
                            <label htmlFor="seo_title" className="block font-semibold text-gray-700">SEO Title</label>
                            <input
                                type="text"
                                id="seo_title"
                                {...register('seo_title')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="SEO Title"
                            />
                        </div>
                        <div>
                            <label htmlFor="meta_description" className="block font-semibold text-gray-700">Meta Description</label>
                            <textarea
                                id="meta_description"
                                {...register('meta_description')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="Meta Description"
                                rows="1"
                            />
                        </div>
                        <div>
                            <label htmlFor="canonical_url" className="block font-semibold text-gray-700">Canonical URL</label>
                            <input
                                type="url"
                                id="canonical_url"
                                {...register('canonical_url')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="Canonical URL"
                            />
                        </div>
                        <div>
                            <label htmlFor="social_title" className="block font-semibold text-gray-700">Social Title</label>
                            <input
                                type="text"
                                id="social_title"
                                {...register('social_title')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="Social Title"
                            />
                        </div>
                        <div>
                            <label htmlFor="social_image" className="block font-semibold text-gray-700">Social Image</label>
                            <input
                                type="file"
                                id="social_image"
                                {...register('social_image')}
                                accept="image/*"
                                className="mt-1 block w-full text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md px-3 py-2 file:border-0
                                    file file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="seo_schema" className="block font-semibold text-gray-700">SEO Schema</label>
                            <textarea
                                id="seo_schema"
                                {...register('seo_schema')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="SEO Schema"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label htmlFor="social_description" className="block font-semibold text-gray-700">Social Description</label>
                            <textarea
                                id="social_description"
                                {...register('social_description')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                placeholder="Social Description"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            disabled={isSubmitting}
                            className={`px-4 py-2 bg-[#fa2964e6] text-white rounded hover:bg-pink-600 mr-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Catalogue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCatalogue