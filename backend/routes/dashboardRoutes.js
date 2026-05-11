import express from "express";

import TafsiirModel from "../models/TafsiirModel.js";
import Lecture from "../models/LectureModel.js";
import Book from "../models/BookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const totalTafsiir =
      await TafsiirModel.countDocuments();

    const totalLectures =
      await Lecture.countDocuments();

    const totalBooks =
      await Book.countDocuments();

    const uniqueJuz =
      await TafsiirModel.distinct(
        "juzNumber"
      );

    res.json({
      success:true,

      stats:{
        totalTafsiir,
        totalLectures,
        totalBooks,
        totalJuz:
          uniqueJuz.length,
      },
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

});

export default router;