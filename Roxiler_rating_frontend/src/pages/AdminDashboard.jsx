import React, { useEffect, useState } from "react";
import { getAdminStats, getAllUsers } from "../api/admin.api";
import { getAllStores } from "../api/store.api";
import AddUserForm from "../ui/AddUserForm";
import UserTable from "../ui/UserTable";
import StoreTable from "../ui/StoreTable";

function AdminDashboard() {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [stats, usersData, storesData] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
        getAllStores(),
      ]);
      setAdminStats(stats);
      setUsers(usersData);
      setStores(storesData);
    } catch (err) {
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Dashboard Stats */}
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={adminStats.totalUsers} color="blue" />
        <StatCard title="Total Stores" value={adminStats.totalStores} color="green" />
        <StatCard title="Total Ratings" value={adminStats.totalRatings} color="yellow" />
      </div>

      {/* Add User Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Add New User</h2>
        <AddUserForm onUserAdded={fetchData} />
      </section>

      {/* Users List */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">All Users</h2>
        <UserTable users={users} />
      </section>

      {/* Stores List */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">All Stores</h2>
        <StoreTable stores={stores} />
      </section>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: "bg-blue-100 hover:bg-blue-200",
    green: "bg-green-100 hover:bg-green-200",
    yellow: "bg-yellow-100 hover:bg-yellow-200",
  };
  return (
    <div
      className={`${colorClasses[color]} rounded-xl p-6 shadow-md text-center transition-transform transform hover:-translate-y-1`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default AdminDashboard;
