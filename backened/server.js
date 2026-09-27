import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import shoeRouter from "./routes/shoeRoute.js";

dotenv.config();

const app = express();

// ==========================================
// DIRECTORY SETUP
// ==========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// SERVE UPLOADED IMAGES
// ==========================================

app.use(
  "/images",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================================
// DATABASE
// ==========================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// ==========================================
// ROUTES
// ==========================================

app.use("/api/shoes", shoeRouter);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("Virelli Backend Running...");
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});