import React, { useState } from "react";
import { createUser } from "../api/admin.api";

export default function AddUserForm({ onUserAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await createUser(form);
      setMessage("User created successfully!");
      setForm({ name: "", email: "", password: "", address: "", role: "USER" });
      onUserAdded();
    } catch (err) {
      setMessage(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-lg shadow-md space-y-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </div>

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      >
        <option value="USER">User</option>
        <option value="STORE_OWNER">Store Owner</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Creating..." : "Add User"}
      </button>

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
