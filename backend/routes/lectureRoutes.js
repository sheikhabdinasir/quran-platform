import express from "express";
import {
  addLecture,
  getActiveLectures,
  getAdminLectures,
  getSingleLecture,
  updateLecture,
  toggleLecture,
  deleteLecture,

  // ⭐ WAXAAN KU DARAY
  toggleFavorite,
  getFavoriteLectures
} from "../controllers/lectureController.js";

const router = express.Router();

/* =====================
   USER ROUTES
===================== */
router.get("/all", getActiveLectures);

// ⭐ USER → GET FAVORITE LECTURES
router.get("/favorites", getFavoriteLectures);

/* =====================
   ADMIN ROUTES
===================== */
router.get("/admin-all", getAdminLectures);
router.get("/single/:id", getSingleLecture);  
router.post("/add", addLecture);
router.put("/update/:id", updateLecture);     
router.put("/toggle/:id", toggleLecture);
router.delete("/delete/:id", deleteLecture);

// ⭐ ADMIN → TOGGLE FAVORITE
router.put("/favorite/:id", toggleFavorite);

export default router;
