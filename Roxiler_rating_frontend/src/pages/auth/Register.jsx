import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { login } = useAuth(); // optional auto-login after register
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simple frontend validation
    if (form.name.length < 3 || form.name.length > 60) {
      setError("Name must be between 3 and 60 characters.");
      setLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      // Optional: auto login
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Address
          </label>
          <textarea
            rows={3}
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none resize-none"
            placeholder="Enter your address"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Role
          </label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none bg-white"
          >
            <option value="USER">User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            placeholder="Enter a strong password"
          />
          <p className="text-xs text-gray-500 mt-1">
            8–16 characters, include at least one uppercase letter and one
            special character.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {/* Redirect to login */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}   

export default Register;
