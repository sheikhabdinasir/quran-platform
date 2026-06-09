import express from "express";
import tafsiirUpload from "../middleware/tafsiirUpload.js";
import { authAdmin } from "../middleware/authAdmin.js";

import {
  getAllJuz,
  getSurahsByJuz,
  getNextPartNumber,
  addTafsiir,
  getAllTafsiir,
  getPublicTafsiir,
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

/* GET */
router.get("/", getAllTafsiir);
router.get("/public", getPublicTafsiir);

/* ADD */
router.post(
  "/add",
  authAdmin,
  tafsiirUpload.single("file"),
  addTafsiir
);

/* UPDATE */
router.put(
  "/update/:id",
  authAdmin,
  tafsiirUpload.single("file"),
  updateTafsiir
);

/* DELETE ONE */
router.delete(
  "/delete/:id",
  authAdmin,
  deleteTafsiir
);

/* DELETE MANY */
router.delete(
  "/delete-many",
  authAdmin,
  deleteManyTafsiir
);

/* TOGGLE */
router.patch(
  "/toggle/:id",
  authAdmin,
  toggleTafsiirStatus
);

export default router;