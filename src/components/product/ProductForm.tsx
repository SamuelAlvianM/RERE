import React from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { ProductFormProps, ProductFormValues } from './types';

// Validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string()
    .required('Kamu harus isi ini')
    .min(3, 'Title harus punya minimal 3 huruf untuk diisi'),
    description: Yup.string()
    .required('Butuh penjelasan di form ini')
    .min(10, 'Tolong jelaskan minimal 1 kalimat!'),
    price: Yup.number()
    .required('Harga harus dicantumin')
    .positive('Harga yang kamu cantumkan harus nilai positif'),
    category: Yup.string().required('Category harus dipilih'),
    imageUrl: Yup.string().url('Masukkan URL gambar yang valid'),
});

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {

    const navigate = useNavigate();

  // Initial form values
    const initialValues: ProductFormValues = {
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    };

  // Event handlers
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.03)';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const nextInput = e.currentTarget.nextElementSibling as HTMLInputElement;
        if (nextInput) nextInput.focus();
    }
    };

    return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-100 p-6">
        <div
        className="bg-yellow-400 rounded-lg shadow-lg p-6 w-full max-w-md transition-transform duration-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
            const { title, description, price, imageUrl, category } = values;

            onSubmit({
                title,
                description,
                price: parseFloat(price),
                image: imageUrl,
            });

            setSubmitting(false);
            resetForm();
            }}
        >
            {({ isSubmitting, errors, touched }) => (
            <FormikForm className="space-y-4">
              {/* Title Field */}
                <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <Field
                    type="text"
                    id="title"
                    name="title"
                    onKeyDown={handleKeyDown}
                    className={`w-full p-2 border rounded ${
                    touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {touched.title && errors.title && (
                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
                </div>

              {/* Category Field */}
                <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category
                </label>
                <Field
                    as="select"
                    id="category"
                    name="category"
                    className={`w-full p-2 border rounded ${
                    touched.category && errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value="">Select a category</option>
                    <option value="plants">Plants</option>
                    <option value="animals">Animals</option>
                    <option value="others">Foods</option>
                    <option value="others">Toys</option>
                    <option value="others">Beverages</option>
                    <option value="others">Action Figures</option>
                    <option value="others">Electronics</option>
                    <option value="others">Furniture</option>
                </Field>
                {touched.category && errors.category && (
                    <div className="text-red-500 text-sm mt-1">{errors.category}</div>
                )}
            </div>

              {/* Description Field */}
                <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                </label>
                <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={3}
                    className={`w-full p-2 border rounded ${
                    touched.description && errors.description
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                />
                {touched.description && errors.description && (
                    <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
                </div>

              {/* Price Field */}
                <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                    Price ($)
                </label>
                <Field
                    type="number"
                    id="price"
                    name="price"
                    onKeyDown={handleKeyDown}
                    className={`w-full p-2 border rounded ${
                    touched.price && errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {touched.price && errors.price && (
                    <div className="text-red-500 text-sm mt-1">{errors.price}</div>
                )}
                </div>

              {/* Image URL Field */}
                <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                    Image URL (optional)
                </label>
                <Field
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    onKeyDown={handleKeyDown}
                    className={`w-full p-2 border rounded ${
                    touched.imageUrl && errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {touched.imageUrl && errors.imageUrl && (
                    <div className="text-red-500 text-sm mt-1">{errors.imageUrl}</div>
                )}
                </div>

              {/* Submit Button */}
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-yellow-300 active:text-black transition-colors disabled:bg-blue-300 duration-75"
                >
                {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </FormikForm>
            )}
        </Formik>

        <button
          onClick={() => navigate('/products')} // Navigate to the product page
        className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none transition-colors"
        >
        Back to Product
        </button>
        </div>
    </div>
    );
};

export default ProductForm;
