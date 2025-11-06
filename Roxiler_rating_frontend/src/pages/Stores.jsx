import React, { useEffect, useState } from "react";
import { getAllStores } from "../api/store.api";
import { getRatingForStoreByMe, rateStore } from "../api/rating.api";
//import { useAuth } from "../context/AuthContext";

function Stores() {
 // const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesData, ratingsData] = await Promise.all([
          getAllStores(),
          getRatingForStoreByMe(),
        ]);

        const mergedStores = storesData.map((store) => {
          const myRating = ratingsData.find((r) => r.storeId === store.id);
          return {
            ...store,
            userRating: myRating ? myRating.value : null,
          };
        });

        setStores(mergedStores);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRate = async (storeId, value) => {
    try {
      await rateStore({ storeId, value });
      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId
            ? {
                ...store,
                avgRating: (store.avgRating + value) / 2,
                userRating: value,
              }
            : store
        )
      );
      alert("Rating submitted successfully!");
    } catch (err) {
      alert(err.message || "Error submitting rating");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading stores...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Filter stores by search term (case-insensitive match for name or address)
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        🏬 Store Listings
      </h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by store name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {filteredStores.length === 0 ? (
        <p className="text-gray-500">No stores found.</p>
      ) : (
        <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left border-b">Store Name</th>
                <th className="px-4 py-2 text-left border-b">Owner</th>
                <th className="px-4 py-2 text-left border-b">Address</th>
                <th className="px-4 py-2 text-left border-b">Overall Rating</th>
                <th className="px-4 py-2 text-left border-b">Your Rating</th>
                <th className="px-4 py-2 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{store.name}</td>
                  <td className="px-4 py-2">{store.owner?.name || "—"}</td>
                  <td className="px-4 py-2">
                    {store.address || "No address provided"}
                  </td>
                  <td className="px-4 py-2 font-medium text-yellow-600">
                    ⭐ {store.avgRating?.toFixed(1) || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {store.userRating ? (
                      <span className="text-blue-600 font-semibold">
                        {store.userRating}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <RatingSelector
                      current={store.userRating}
                      onSelect={(value) => handleRate(store.id, value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RatingSelector({ current, onSelect }) {
  const [selected, setSelected] = useState(current);

  const handleClick = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={`text-xl ${
            value <= selected ? "text-yellow-500" : "text-gray-300"
          } hover:scale-110 transition`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default Stores;
