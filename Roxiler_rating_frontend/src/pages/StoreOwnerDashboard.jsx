import React, { useEffect, useState } from "react";
import { getMyStores } from "../api/store.api";

function StoreOwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyStores = async () => {
      try {
        const myStores = await getMyStores();
        setStores(myStores);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyStores();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading your stores...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        🏪 My Store Dashboard
      </h1>

      {stores.length === 0 ? (
        <p className="text-gray-500">You don’t own any stores yet.</p>
      ) : (
        stores.map((store) => (
          <div key={store.id} className="mb-8 border-b pb-6">
            <h2 className="text-xl font-semibold text-blue-700">
              {store.name}
            </h2>
            <p className="text-gray-600 mb-2">
              📍 {store.address || "No address available"}
            </p>
            <p className="font-medium text-yellow-600 mb-4">
              ⭐ Average Rating:{" "}
              {store.avgRating ? store.avgRating.toFixed(1) : "No ratings yet"}
            </p>

            {/* Ratings Table */}
            {store.ratings && store.ratings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">User</th>
                      <th className="px-4 py-2 text-left border-b">Email</th>
                      <th className="px-4 py-2 text-left border-b">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.ratings.map((rating) => (
                      <tr key={rating.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{rating.user?.name || "Unknown"}</td>
                        <td className="px-4 py-2">{rating.user?.email || "—"}</td>
                        <td className="px-4 py-2 font-medium text-yellow-600">
                          {rating.value} ★
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No ratings received yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StoreOwnerDashboard;
