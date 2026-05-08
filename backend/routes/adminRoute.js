import express from "express";
import {
  adminLogin,
  adminProfile,
  forgotAdminPassword,
  resetAdminPassword,
  changeAdminPassword,
} from "../controllers/adminController.js";

import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// LOGIN
router.post("/login", adminLogin);

// PROFILE (Protected)
router.get("/profile", authAdmin, adminProfile);

// FORGOT PASSWORD
router.post("/forgot-password", forgotAdminPassword);

// RESET PASSWORD
router.post("/reset-password/:token", resetAdminPassword);

// CHANGE PASSWORD (Protected)
router.put("/change-password", authAdmin, changeAdminPassword);

export default router;
