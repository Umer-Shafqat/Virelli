import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import shoeRouter from "./routes/shoeRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// ===============================
// IMAGES
// ===============================

// Keep this only if you are also using
// a local uploads folder.
app.use("/images", express.static("uploads"));

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Virelli API is running",
  });
});

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