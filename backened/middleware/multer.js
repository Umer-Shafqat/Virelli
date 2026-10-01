import multer from "multer";

// Store images temporarily in memory.
// The images will be uploaded to Cloudinary.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per image
  },
});

export default upload;