
import multer from "multer";
import path from "path";
import fs from "fs";

/* =========================================
   CREATE FOLDER
========================================= */

const uploadPath = "uploads/tafsiir";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

/* =========================================
   STORAGE
========================================= */

const storage = multer.diskStorage({
  destination: function (
    req,
    file,
    cb
  ) {
    cb(null, uploadPath);
  },

  filename: function (
    req,
    file,
    cb
  ) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      );

    cb(
      null,
      uniqueName +
        path.extname(
          file.originalname
        )
    );
  },
});

/* =========================================
   FILE FILTER
========================================= */

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowed = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",

    "video/mp4",
    "video/mpeg",
    "video/quicktime",
  ];

  if (
    allowed.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only audio/video files allowed"
      )
    );
  }
};

/* =========================================
   MULTER
========================================= */

const tafsiirUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
    1024 * 1024 * 1000,
     
      

  },
});

export default tafsiirUpload;

