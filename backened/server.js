import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "uploads")));

// Your other routes
// app.use("/api/shoes", shoeRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});