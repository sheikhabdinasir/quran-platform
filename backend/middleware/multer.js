import multer from "multer";

import {
  CloudinaryStorage
} from "multer-storage-cloudinary";

import cloudinary
from "../config/cloudinary.js";

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

      folder:
      "lessons",

      resource_type:
      "auto",

      public_id:
      Date.now() +
      "-" +
      file.originalname
        .split(".")[0],
    };
  },
});

/* =========================
   MULTER
========================= */

const upload =
multer({

  storage,

  limits: {

    fileSize:
    1024 * 1024 * 500,
  },
});

export default upload;