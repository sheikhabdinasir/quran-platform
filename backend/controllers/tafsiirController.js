// backend/controllers/tafsiirController.js

import TafsiirModel from "../models/TafsiirModel.js";

/* =========================================
   GET ALL JUZ
========================================= */
export const getAllJuz =
  async (req, res) => {
    try {
      const juzList = [
        1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30,
      ];

      res.json({
        success: true,
        juzList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   GET SURAHS BY JUZ
   (sample logic - keep your custom data if any)
========================================= */
export const getSurahsByJuz =
  async (req, res) => {
    try {
      const surahs = [
        {
          surahNumber: 1,
          surahName:
            "Al-Fatiha",
        },
        {
          surahNumber: 2,
          surahName:
            "Al-Baqarah",
        },
        {
          surahNumber: 3,
          surahName:
            "Aal-Imran",
        },
      ];

      res.json({
        success: true,
        surahs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   NEXT PART NUMBER
========================================= */
export const getNextPartNumber =
  async (req, res) => {
    try {
      const {
        surahNumber,
      } = req.params;

      const last =
        await TafsiirModel.findOne(
          {
            surahNumber,
          }
        ).sort({
          partNumber: -1,
        });

      const nextPart =
        last
          ? Number(
              last.partNumber
            ) + 1
          : 1;

      res.json({
        success: true,
        nextPart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   ADD TAFSIIR
========================================= */
export const addTafsiir =
  async (req, res) => {
    try {
      const body =
        req.body;

      const data = {
        ...body,
      };

      if (req.file) {
        data.sourceType =
          "upload";

        if (
          body.mediaType ===
          "audio"
        ) {
          data.audioUrl =
            req.file.path;
        } else {
          data.videoUrl =
            req.file.path;
        }
      }

      const created =
        await TafsiirModel.create(
          data
        );

      res.json({
        success: true,
        message:
          "Tafsiir Added Successfully",
        tafsiir:
          created,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   GET ALL ADMIN
========================================= */
export const getAllTafsiir =
  async (req, res) => {
    try {
      const tafsiir =
        await TafsiirModel.find().sort(
          {
            createdAt:
              -1,
          }
        );

      res.json({
        success: true,
        tafsiir,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   GET PUBLIC ACTIVE ONLY
========================================= */
export const getPublicTafsiir =
  async (req, res) => {
    try {
      const tafsiir =
        await TafsiirModel.find(
          {
            isActive:
              true,
          }
        ).sort({
          createdAt:
            -1,
        });

      res.json({
        success: true,
        tafsiir,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   DELETE ONE
========================================= */
export const deleteTafsiir =
  async (req, res) => {
    try {
      await TafsiirModel.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   DELETE MANY
========================================= */
export const deleteManyTafsiir =
  async (req, res) => {
    try {
      const { ids } =
        req.body;

      await TafsiirModel.deleteMany(
        {
          _id: {
            $in: ids,
          },
        }
      );

      res.json({
        success: true,
        message:
          "Selected Deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   TOGGLE ACTIVE/HIDDEN
========================================= */
export const toggleTafsiirStatus =
  async (req, res) => {
    try {
      const item =
        await TafsiirModel.findById(
          req.params.id
        );

      item.isActive =
        !item.isActive;

      await item.save();

      res.json({
        success: true,
        message:
          "Status Updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* =========================================
   UPDATE TAFSIIR
========================================= */
export const updateTafsiir =
  async (req, res) => {
    try {
      const id =
        req.params.id;

      const data = {
        ...req.body,
      };

      /************************
       FILE UPLOAD
      *************************/
      if (req.file) {
        data.sourceType =
          "upload";

        if (
          req.body
            .mediaType ===
          "audio"
        ) {
          data.audioUrl =
            req.file.path;

          data.videoUrl =
            "";
        } else {
          data.videoUrl =
            req.file.path;

          data.audioUrl =
            "";
        }
      }

      /************************
       LINK MODE
      *************************/
      if (
        req.body
          .sourceType ===
        "link"
      ) {
        if (
          req.body
            .mediaType ===
          "audio"
        ) {
          data.videoUrl =
            "";
        } else {
          data.audioUrl =
            "";
        }
      }

      const updated =
        await TafsiirModel.findByIdAndUpdate(
          id,
          data,
          {
            new: true,
          }
        );

      if (!updated) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Tafsiir not found",
          });
      }

      res.json({
        success: true,
        message:
          "Updated Successfully",
        tafsiir:
          updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };