import express from "express";

import {

  createLesson,

  getLessonsByBook,

  updateLesson,

  toggleLesson,

  deleteLesson,

} from "../controllers/lessonController.js";

import upload from "../middleware/multer.js";
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

/* ================= UPDATE LESSON ================= */

router.put(
  "/:id",
  upload.single("file"),
  updateLesson
);

/* ================= TOGGLE ================= */

router.patch(
  "/:id/toggle",
  toggleLesson
);

/* ================= DELETE ================= */

router.delete(
  "/:id",
  deleteLesson
);

export default router;