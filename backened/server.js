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

connectDB();

app.use(express.json());

app.use(cors());

app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Virelli Backend Running...");
});

app.use("/api/shoes", shoeRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.listen(4000, () => {
  console.log("Virelli Backend Running on port 4000");
});
