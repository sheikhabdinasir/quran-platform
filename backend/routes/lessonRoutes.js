import express from "express";
import {
  createLesson,
  getLessonsByBook,
  toggleLesson,
} from "../controllers/lessonController.js";

const router = express.Router();

// ADD LESSON
router.post("/", createLesson);

// GET LESSONS BY BOOK
router.get("/:bookId", getLessonsByBook);

// TOGGLE LESSON (active / inactive)
router.patch("/:id/toggle", toggleLesson);

export default router;
