import express from "express";
import Admin from "../models/AdminModel.js";

import {
  adminLogin,
  adminProfile,
  forgotAdminPassword,
  resetAdminPassword,
  changeAdminPassword,
} from "../controllers/adminController.js";

import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

/* ==========================
   LOGIN
========================== */
router.post("/login", adminLogin);

/* ==========================
   PROFILE (Protected)
========================== */
router.get("/profile", authAdmin, adminProfile);

/* ==========================
   FORGOT PASSWORD
========================== */
router.post("/forgot-password", forgotAdminPassword);

/* ==========================
   RESET PASSWORD
========================== */
router.post("/reset-password/:token", resetAdminPassword);

/* ==========================
   CHANGE PASSWORD
========================== */
router.put("/change-password", authAdmin, changeAdminPassword);

/* ==========================
   TEMP CREATE ADMIN
   REMOVE AFTER USE
========================== */
router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      return res.json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      email: "admin@gmail.com",
      password: "shiikh321",
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create Admin Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;