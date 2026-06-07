import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {

     
      setError("Please enter a new password");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/admin/reset-password/${token}`,
        { newPassword }
      );

      if (res.data.success) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(res.data.message || "Reset failed");
      }
    
      } catch (err) {

  if (!navigator.onLine) {
    setError(
      "No internet connection. Please check your network."
    );
  }

  else if (err.code === "ERR_NETWORK") {
    setError(
      "Unable to connect. Please try again."
    );
  }

  else {
    setError(
      err.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Reset Password
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

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
