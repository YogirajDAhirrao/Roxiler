import React, { useState } from "react";

export default function StoreTable({ stores }) {
  const [filter, setFilter] = useState("");

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Filter by Name, Email, or Address"
        className="p-2 border w-full mb-4 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-t hover:bg-gray-100">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">{s.address}</td>
              <td className="p-2">{s.rating || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
