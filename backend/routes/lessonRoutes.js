import express from "express";

import {
  createLesson,
  getLessonsByBook,
  toggleLesson,
} from "../controllers/lessonController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

/* ================= ADD LESSON ================= */

router.post(
  "/",
  upload.single("file"),
  createLesson
);

/* ================= GET LESSONS ================= */

router.get(
  "/:bookId",
  getLessonsByBook
);

/* ================= TOGGLE ================= */

router.patch(
  "/:id/toggle",
  toggleLesson
);

export default router;