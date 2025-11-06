import React from "react";
import { useAuth } from "../context/AuthContext";
import StoreOwnerDashboard from "./StoreOwnerDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  if (user.role === "STORE_OWNER")
    return (
      <>
        <StoreOwnerDashboard />;  
      </>
    );
  if (user.role === "ADMIN") return <AdminDashboard />;

  return <div>No dashboard available for this role.</div>;
}

export default Dashboard;
