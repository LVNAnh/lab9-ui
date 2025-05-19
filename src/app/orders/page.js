// src/app/orders/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../utils/api";
import { isAuthenticated } from "../../utils/auth";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push("/login");
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again.");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white shadow-md rounded-md p-6">
          <p className="text-center text-gray-500">
            You haven't placed any orders yet.
          </p>
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Browse Products
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id}>
              <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
