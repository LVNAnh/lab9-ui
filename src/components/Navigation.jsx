"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, logout } from "../utils/auth";

export default function Navigation() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [pathname]);

  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener("storage", handleStorageChange);
    
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">Web Shop</span>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                  Products
                </span>
              </Link>
              {user && (
                <>
                  <Link href="/orders">
                    <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                      My Orders
                    </span>
                  </Link>
                  <Link href="/admin/products">
                    <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                      Manage Products
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link href="/cart">
                  <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                    Cart
                  </span>
                </Link>
                <span className="px-3 py-2">Hello, {user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                    Login
                  </span>
                </Link>
                <Link href="/register">
                  <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                    Register
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}