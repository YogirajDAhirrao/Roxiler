import React, { useState } from "react";

export default function UserTable({ users }) {
  const [filter, setFilter] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Filter by Name, Email, Address, or Role"
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
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-100">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.address}</td>
              <td className="p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
