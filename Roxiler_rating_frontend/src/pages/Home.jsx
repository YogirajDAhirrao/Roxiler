import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">Roxiler Ratings</span> ⭐
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mb-8">
        Rate your favorite stores and see what others think! Join our platform
        to discover top-rated shops and contribute your own reviews.
      </p>

      {user ? (
        <div>
          <p className="text-lg text-gray-700 mb-6">
            You are logged in as{" "}
            <span className="font-semibold text-blue-600">{user.name}</span> (
            {user.role})
          </p>

          {user.role === "ADMIN" && (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Admin Dashboard
            </Link>
          )}

          {user.role === "STORE_OWNER" && (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View My Store(Dashboard)
            </Link>
          )}

          {user.role === "USER" && (
            <Link
              to="/stores"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Stores
            </Link>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
