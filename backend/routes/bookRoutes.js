import express from "express";
import {
  createBook,
  getBooks,
  updateBook,
  toggleBook,
  deleteBook,
} from "../controllers/bookController.js";

import upload from "../middleware/multer.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

/* ================= CREATE BOOK ================= */
/*
Admin adds:
- title
- sheikhName
- description (optional)
- image (optional)
*/
router.post(
  "/",
  authAdmin,
  upload.single("image"),
  createBook
);

/* ================= GET ALL BOOKS ================= */
router.get("/", getBooks);

/* ================= UPDATE BOOK ================= */
/*
IMPORTANT:
upload.single("image")
must be here also
because EditBook uses FormData
*/
router.put(
  "/:id",
  authAdmin,
  upload.single("image"),
  updateBook
);

/* ================= TOGGLE BOOK ================= */
router.patch(
  "/:id/toggle",
  authAdmin,
  toggleBook
);

/* ================= DELETE BOOK ================= */
router.delete(
  "/:id",
  authAdmin,
  deleteBook
);

export default router;