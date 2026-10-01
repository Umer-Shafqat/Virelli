import multer from "multer";

// Store uploaded images temporarily in memory.
// They will then be uploaded to Cloudinary.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

export default upload;