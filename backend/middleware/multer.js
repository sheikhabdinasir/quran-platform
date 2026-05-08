import multer from "multer";

// Halkan waxa aad ku dari kartaa config Cloudinary haddii aad rabto.
// Hadda waxaan isticmaaleeynaa memory storage oo fudud.

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
