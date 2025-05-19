import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser, logout } from "../utils/auth";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-xl font-bold cursor-pointer">
                  Web Shop
                </span>
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                    Products
                  </span>
                </Link>
                {user && (
                  <Link href="/orders">
                    <span className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                      My Orders
                    </span>
                  </Link>
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

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <p className="text-center">© 2025 Web Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
