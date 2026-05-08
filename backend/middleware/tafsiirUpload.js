import multer from "multer";

const storage = multer.memoryStorage();

const tafsiirUpload = multer({
  storage,
});

export default tafsiirUpload;