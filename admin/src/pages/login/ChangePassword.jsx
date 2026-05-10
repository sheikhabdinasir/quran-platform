import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AdminContext } from "../../Context/AdminContext.jsx";

const ChangePassword = () => {
  const { aToken } = useContext(AdminContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // 👁️ show/hide states
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return toast.error("Fadlan buuxi dhammaan xogta");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("New password iyo confirm password isku mid ma aha");
    }

    if (newPassword.length < 6) {
      return toast.error("Password-ka waa inuu ka badan yahay 6 xaraf");
    }

    try {
      setLoading(true);

    
      const res = await axios.put(
  `${import.meta.env.VITE_API_URL}/api/admin/change-password`,
  {
    oldPassword,
    newPassword,
  },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      setLoading(false);

      if (res.data.success) {
        toast.success("Password updated successfully ✅");

        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Change Admin Password
        </h2>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {/* OLD PASSWORD */}
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
            >
              {showOld ? "🙈" : "👁️"}
            </button>
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
            >
              {showNew ? "🙈" : "👁️"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
