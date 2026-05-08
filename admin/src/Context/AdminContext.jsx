import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [adminInfo, setAdminInfo] = useState(null);

  // ==========================
  // LOGIN FUNCTION
  // ==========================
  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("aToken", res.data.token);
        setAToken(res.data.token);
        return { success: true };
      }

      return { success: false, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }
  };

  // ==========================
  // LOGOUT FUNCTION
  // ==========================
  const logoutAdmin = () => {
    localStorage.removeItem("aToken");
    setAToken("");
    setAdminInfo(null);
  };

  // ==========================
  // GET ADMIN PROFILE
  // ==========================
  const getAdminInfo = async () => {
    if (!aToken) return;

    try {
      const res = await axios.get("http://localhost:4000/api/admin/profile", {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (res.data.success) {
        setAdminInfo(res.data.data);
      }
    } catch (error) {
      console.log("Admin profile error:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, [aToken]);

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        adminInfo,
        loginAdmin,
        logoutAdmin,
        getAdminInfo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
