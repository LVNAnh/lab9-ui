// src/app/products/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../utils/api";
import { getCurrentUser } from "../../../utils/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetchProduct();
    }

    // Get cart from localStorage
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCartItems(JSON.parse(existingCart));
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const addToCart = () => {
    const user = getCurrentUser();

    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    const existingItemIndex = cartItems.findIndex(
      (i) => i.productId === item.productId
    );

    let updatedCart;

    if (existingItemIndex >= 0) {
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cartItems, item];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart successfully!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {product.illustration ? (
              <img
                className="h-64 w-full object-cover md:w-64"
                src={product.illustration}
                alt={product.name}
              />
            ) : (
              <div className="h-64 w-full bg-gray-200 flex items-center justify-center md:w-64">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.code}
            </div>
            <h1 className="mt-2 text-3xl leading-tight font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex items-center mr-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-t border-b border-gray-200 py-1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
