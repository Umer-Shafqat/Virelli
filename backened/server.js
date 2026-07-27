import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import shoeRouter from "./routes/shoeRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import userRouter from "./routes/userRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import adminRouter from "./routes/adminRoute.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());


// =====================================
// CONNECT MONGODB
// =====================================

connectDB();


// =====================================
// TEST API
// =====================================

app.get("/", (req, res) => {

  res.send(
    "Virelli Backend Running..."
  );

});

app.use("/api/order", orderRouter);
// =====================================
// USER / AUTHENTICATION
// =====================================

app.use(
  "/api/user",
  userRouter
);


// =====================================
// SHOES
// =====================================

app.use(
  "/api/shoes",
  shoeRouter
);


// =====================================
// CART
// =====================================

app.use(
  "/api/cart",
  cartRouter
);


// =====================================
// ORDERS
// =====================================

app.use(
  "/api/order",
  orderRouter
);


app.use("/api/admin", adminRouter);

// =====================================
// SERVER
// =====================================

const PORT =
  process.env.PORT || 4000;


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);