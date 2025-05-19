// src/utils/auth.js (updated for App Router)
"use client";

import api from "./api";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  try {
    console.log("Attempting login with:", { email }); // Log only email for security
    const response = await api.post("/account/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        })
      );
      return response.data;
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);

      if (error.response.status === 401) {
        throw new Error("Invalid email or password");
      } else if (error.response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      }
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    }

    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/account/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        })
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
  return false;
};
