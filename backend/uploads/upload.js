import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

/* =========================
   CLOUDINARY STORAGE
========================= */

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => {

      return {

        folder: "lectures",

        resource_type: "auto",

        public_id:
          Date.now() +
          "-" +
          file.originalname
            .split(".")[0],
      };
    },
  });

/* =========================
   FILE FILTER
========================= */

const fileFilter =
(req, file, cb) => {

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

/* =========================
   MULTER
========================= */

const upload =
multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      1024 * 1024 * 500,
  },
});

export default upload;