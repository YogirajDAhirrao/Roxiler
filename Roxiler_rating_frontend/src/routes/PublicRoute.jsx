import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages like Login/Register that should NOT be visible when logged in
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  // While user state is loading (fetching from backend), don't redirect yet
  if (loading) return <div className="text-center py-10">Loading...</div>;

  // If logged in → redirect to home (or dashboard)
  if (user) return <Navigate to="/" replace />;

  return children;
}

export default PublicRoute;
