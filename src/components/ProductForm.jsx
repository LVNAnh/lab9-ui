// src/components/ProductForm.jsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const initialValues = {
    code: product?.code || "",
    name: product?.name || "",
    price: product?.price || "",
    illustration: product?.illustration || "",
    description: product?.description || "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Product code is required"),
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .typeError("Price must be a number"),
    illustration: Yup.string(),
    description: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const success = await onSubmit({
      ...values,
      price: Number(values.price),
    });

    if (!success) {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Code
              </label>
              <Field
                type="text"
                name="code"
                id="code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product code"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <Field
                type="number"
                step="0.01"
                name="price"
                id="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="illustration"
                className="block text-gray-700 font-bold mb-2"
              >
                Illustration URL
              </label>
              <Field
                type="text"
                name="illustration"
                id="illustration"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image URL"
              />
              <ErrorMessage
                name="illustration"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                id="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}