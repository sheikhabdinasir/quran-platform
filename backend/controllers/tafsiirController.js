// backend/controllers/tafsiirController.js

import TafsiirModel from "../models/TafsiirModel.js";
import convertVideoToAudio from "../utils/convertVideoToAudio.js";
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

  { surahNumber: 1, surahName: "الفاتحة" },
  { surahNumber: 2, surahName: "البقرة" },
  { surahNumber: 3, surahName: "آل عمران" },
  { surahNumber: 4, surahName: "النساء" },
  { surahNumber: 5, surahName: "المائدة" },
  { surahNumber: 6, surahName: "الأنعام" },
  { surahNumber: 7, surahName: "الأعراف" },
  { surahNumber: 8, surahName: "الأنفال" },
  { surahNumber: 9, surahName: "التوبة" },
  { surahNumber: 10, surahName: "يونس" },
  { surahNumber: 11, surahName: "هود" },
  { surahNumber: 12, surahName: "يوسف" },
  { surahNumber: 13, surahName: "الرعد" },
  { surahNumber: 14, surahName: "إبراهيم" },
  { surahNumber: 15, surahName: "الحجر" },
  { surahNumber: 16, surahName: "النحل" },
  { surahNumber: 17, surahName: "الإسراء" },
  { surahNumber: 18, surahName: "الكهف" },
  { surahNumber: 19, surahName: "مريم" },
  { surahNumber: 20, surahName: "طه" },
  { surahNumber: 21, surahName: "الأنبياء" },
  { surahNumber: 22, surahName: "الحج" },
  { surahNumber: 23, surahName: "المؤمنون" },
  { surahNumber: 24, surahName: "النور" },
  { surahNumber: 25, surahName: "الفرقان" },
  { surahNumber: 26, surahName: "الشعراء" },
  { surahNumber: 27, surahName: "النمل" },
  { surahNumber: 28, surahName: "القصص" },
  { surahNumber: 29, surahName: "العنكبوت" },
  { surahNumber: 30, surahName: "الروم" },
  { surahNumber: 31, surahName: "لقمان" },
  { surahNumber: 32, surahName: "السجدة" },
  { surahNumber: 33, surahName: "الأحزاب" },
  { surahNumber: 34, surahName: "سبأ" },
  { surahNumber: 35, surahName: "فاطر" },
  { surahNumber: 36, surahName: "يس" },
  { surahNumber: 37, surahName: "الصافات" },
  { surahNumber: 38, surahName: "ص" },
  { surahNumber: 39, surahName: "الزمر" },
  { surahNumber: 40, surahName: "غافر" },
  { surahNumber: 41, surahName: "فصلت" },
  { surahNumber: 42, surahName: "الشورى" },
  { surahNumber: 43, surahName: "الزخرف" },
  { surahNumber: 44, surahName: "الدخان" },
  { surahNumber: 45, surahName: "الجاثية" },
  { surahNumber: 46, surahName: "الأحقاف" },
  { surahNumber: 47, surahName: "محمد" },
  { surahNumber: 48, surahName: "الفتح" },
  { surahNumber: 49, surahName: "الحجرات" },
  { surahNumber: 50, surahName: "ق" },
  { surahNumber: 51, surahName: "الذاريات" },
  { surahNumber: 52, surahName: "الطور" },
  { surahNumber: 53, surahName: "النجم" },
  { surahNumber: 54, surahName: "القمر" },
  { surahNumber: 55, surahName: "الرحمن" },
  { surahNumber: 56, surahName: "الواقعة" },
  { surahNumber: 57, surahName: "الحديد" },
  { surahNumber: 58, surahName: "المجادلة" },
  { surahNumber: 59, surahName: "الحشر" },
  { surahNumber: 60, surahName: "الممتحنة" },
  { surahNumber: 61, surahName: "الصف" },
  { surahNumber: 62, surahName: "الجمعة" },
  { surahNumber: 63, surahName: "المنافقون" },
  { surahNumber: 64, surahName: "التغابن" },
  { surahNumber: 65, surahName: "الطلاق" },
  { surahNumber: 66, surahName: "التحريم" },
  { surahNumber: 67, surahName: "الملك" },
  { surahNumber: 68, surahName: "القلم" },
  { surahNumber: 69, surahName: "الحاقة" },
  { surahNumber: 70, surahName: "المعارج" },
  { surahNumber: 71, surahName: "نوح" },
  { surahNumber: 72, surahName: "الجن" },
  { surahNumber: 73, surahName: "المزمل" },
  { surahNumber: 74, surahName: "المدثر" },
  { surahNumber: 75, surahName: "القيامة" },
  { surahNumber: 76, surahName: "الإنسان" },
  { surahNumber: 77, surahName: "المرسلات" },
  { surahNumber: 78, surahName: "النبأ" },
  { surahNumber: 79, surahName: "النازعات" },
  { surahNumber: 80, surahName: "عبس" },
  { surahNumber: 81, surahName: "التكوير" },
  { surahNumber: 82, surahName: "الإنفطار" },
  { surahNumber: 83, surahName: "المطففين" },
  { surahNumber: 84, surahName: "الإنشقاق" },
  { surahNumber: 85, surahName: "البروج" },
  { surahNumber: 86, surahName: "الطارق" },
  { surahNumber: 87, surahName: "الأعلى" },
  { surahNumber: 88, surahName: "الغاشية" },
  { surahNumber: 89, surahName: "الفجر" },
  { surahNumber: 90, surahName: "البلد" },
  { surahNumber: 91, surahName: "الشمس" },
  { surahNumber: 92, surahName: "الليل" },
  { surahNumber: 93, surahName: "الضحى" },
  { surahNumber: 94, surahName: "الشرح" },
  { surahNumber: 95, surahName: "التين" },
  { surahNumber: 96, surahName: "العلق" },
  { surahNumber: 97, surahName: "القدر" },
  { surahNumber: 98, surahName: "البينة" },
  { surahNumber: 99, surahName: "الزلزلة" },
  { surahNumber: 100, surahName: "العاديات" },
  { surahNumber: 101, surahName: "القارعة" },
  { surahNumber: 102, surahName: "التكاثر" },
  { surahNumber: 103, surahName: "العصر" },
  { surahNumber: 104, surahName: "الهمزة" },
  { surahNumber: 105, surahName: "الفيل" },
  { surahNumber: 106, surahName: "قريش" },
  { surahNumber: 107, surahName: "الماعون" },
  { surahNumber: 108, surahName: "الكوثر" },
  { surahNumber: 109, surahName: "الكافرون" },
  { surahNumber: 110, surahName: "النصر" },
  { surahNumber: 111, surahName: "المسد" },
  { surahNumber: 112, surahName: "الإخلاص" },
  { surahNumber: 113, surahName: "الفلق" },
  { surahNumber: 114, surahName: "الناس" },

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

/* =========================================
   ADD TAFSIIR
========================================= */

export const addTafsiir =
  async (req, res) => {

    try {

      const body = req.body;

      const data = {
        ...body,
      };

      /********************************
       FILE UPLOAD
      ********************************/

      if (req.file) {

        data.sourceType =
          "upload";

        /********************************
         AUDIO
        ********************************/

        if (
          body.mediaType ===
          "audio"
        ) {
data.audioUrl = req.file.path;
data.cloudinaryPublicId = req.file.filename;
        }

        /********************************
         VIDEO
        ********************************/

       else {

  data.videoUrl = req.file.path;
  data.cloudinaryPublicId = req.file.filename;
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
        tafsiir: created,
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
  await TafsiirModel.find({
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });

      res.json({
        success: true,
        tafsiir,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
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
  await TafsiirModel.find({
    isActive: true,
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });

      res.json({
        success: true,
        tafsiir,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* =========================================
   DELETE ONE
========================================= */

export const deleteTafsiir =
  async (req, res) => {

    try {

     await TafsiirModel.findByIdAndUpdate(
  req.params.id,
  {
    isDeleted: true,
  }
);

      res.json({
        success: true,
        message:
          "Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* =========================================
   DELETE MANY
========================================= */
export const deleteManyTafsiir =
  async (req, res) => {

    try {

      const { ids } = req.body;

       await TafsiirModel.updateMany(
  {
    _id: {
      $in: ids,
    },
  },
  {
    isDeleted: true,
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
        message: error.message,
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

      /********************************
       FILE UPLOAD
      ********************************/

      if (req.file) {

        data.sourceType =
          "upload";

        /********************************
         AUDIO
        ********************************/
if (
  req.body.mediaType ===
  "audio"
) {

  data.audioUrl = req.file.path;
  data.cloudinaryPublicId = req.file.filename;

  data.videoUrl = "";
}
        /********************************
         VIDEO
        ********************************/

      else {

  data.videoUrl = req.file.path;
  data.cloudinaryPublicId = req.file.filename;

  data.audioUrl = "";
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

        return res.status(404).json({
          success: false,
          message:
            "Tafsiir not found",
        });
      }

      res.json({
        success: true,
        message:
          "Updated Successfully",
        tafsiir: updated,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
