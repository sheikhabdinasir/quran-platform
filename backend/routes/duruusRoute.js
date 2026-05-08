import express from "express";
import {
  createBook,
  getBooks,
  toggleBook,
  deleteBook,
  updateBook,
} from "../controllers/bookController.js";

import {
  createLesson,
  getLessonsByBook,
  toggleLesson,
  deleteLesson,
  updateLesson,
} from "../controllers/lessonController.js";

const router = express.Router();

/* ===== BOOKS ===== */
router.post("/books", createBook);
router.get("/books", getBooks);
router.patch("/books/:id/toggle", toggleBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

/* ===== LESSONS ===== */
router.post("/lessons", createLesson);
router.get("/lessons/:bookId", getLessonsByBook);
router.patch("/lessons/:id/toggle", toggleLesson);
router.put("/lessons/:id", updateLesson);
router.delete("/lessons/:id", deleteLesson);

export default router;
