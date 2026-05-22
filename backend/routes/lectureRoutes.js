import express from "express";

import {
  addLecture,
  getActiveLectures,
  getAdminLectures,
  getSingleLecture,
  updateLecture,
  toggleLecture,
  deleteLecture,
  toggleFavorite,
  getFavoriteLectures
} from "../controllers/lectureController.js";

/* IMPORTANT */
import upload from "../middleware/multer.js";
const router = express.Router();

/* =====================
   USER ROUTES
===================== */

router.get("/all", getActiveLectures);

router.get(
  "/favorites",
  getFavoriteLectures
);

/* =====================
   ADMIN ROUTES
===================== */

router.get(
  "/admin-all",
  getAdminLectures
);

router.get(
  "/single/:id",
  getSingleLecture
);

/* CLOUDINARY UPLOAD */
router.post(
  "/add",
  upload.single("file"),
  addLecture
);

router.put(
  "/update/:id",
  updateLecture
);

router.put(
  "/toggle/:id",
  toggleLecture
);

router.delete(
  "/delete/:id",
  deleteLecture
);

router.put(
  "/favorite/:id",
  toggleFavorite
);

export default router;