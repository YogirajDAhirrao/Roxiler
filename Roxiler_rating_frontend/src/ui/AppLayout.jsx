import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { user, logout } = useAuth();
  const updatePassword = () => {};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header / Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Roxiler Ratings ⭐
          </h1>

          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "STORE_OWNER" && (
                  <Link
                    to="/owner/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    My Store
                  </Link>
                )}
                {user.role === "USER" && (
                  <Link
                    to="/stores"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Stores
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
                <button
                  onClick={updatePassword}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Update Password
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content (add top padding to offset fixed navbar height) */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} Roxiler Rating Platform
      </footer>
    </div>
  );
}

export default AppLayout;
