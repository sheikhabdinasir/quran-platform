// routes/tafsiirRoutes.js

import express from "express";
import tafsiirUpload from "../middleware/tafsiirUpload.js";

import {
  getAllJuz,
  getSurahsByJuz,
  getNextPartNumber,
  addTafsiir,
  getAllTafsiir,
  getPublicTafsiir,
  getGroupedTafsiir,
  deleteTafsiir,
  deleteManyTafsiir,
  updateTafsiir,
  toggleTafsiirStatus,
} from "../controllers/tafsiirController.js";

const router = express.Router();

/* Smart Data */
router.get("/juz", getAllJuz);
router.get("/juz/:juz", getSurahsByJuz);
router.get("/next-part/:surahNumber", getNextPartNumber);

/* CRUD */
router.get("/", getAllTafsiir);

router.get(
  "/public",
  getPublicTafsiir
);

/* GROUPED */
router.get(
  "/grouped",
  getGroupedTafsiir
);

/* ADD */
router.post(
  "/add",
  tafsiirUpload.single("file"),
  addTafsiir
);

/* UPDATE */
router.put(
  "/update/:id",
  tafsiirUpload.single("file"),
  updateTafsiir
);

/* DELETE ONE */
router.delete(
  "/delete/:id",
  deleteTafsiir
);

/* DELETE MANY */
router.delete(
  "/delete-many",
  deleteManyTafsiir
);

/* TOGGLE */
router.patch(
  "/toggle/:id",
  toggleTafsiirStatus
);

export default router;