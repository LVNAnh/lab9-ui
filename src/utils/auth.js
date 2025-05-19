import { useRouter } from "next/router";
import api from "./api";
import jwtDecode from "jwt-decode";

export const login = async (email, password) => {
  try {
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
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    if (typeof window !== "undefined") {
      if (!isAuthenticated()) {
        router.replace("/login");
        return null;
      }
      return <Component {...props} />;
    }

    return null;
  };

  return AuthenticatedComponent;
};
