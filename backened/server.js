import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import shoeRouter from "./routes/shoeRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());
app.use(cors());

// ===============================
// IMAGES
// ===============================
app.use("/images", express.static("uploads"));

// ===============================
// API ROUTES
// ===============================
app.use("/api/shoes", shoeRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// ===============================
// PORT
// ===============================
const PORT = process.env.PORT || 4000;

// ===============================
// START SERVER
// ===============================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();