import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Fadlan geli email-ka");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/forgot-password`,
  {
        email,
      });

      if (res.data.success) {
        setMessage("  email-kaaga  ayaa laguugu diray link.");
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error/ try again");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Forgot Password
        </h2>

        {error && (
          <div className="mb-3 bg-red-100 text-red-700 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-3 bg-green-100 text-green-700 px-3 py-2 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
