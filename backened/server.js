import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import shoeRouter from "./routes/shoeRoute.js";


// Load Environment Variables
dotenv.config();


// Create Express App
const app = express();


// ================================
// MIDDLEWARE
// ================================

app.use(cors());

app.use(express.json());


// ================================
// SHOE ROUTES
// ================================

app.use("/api/shoes", shoeRouter);


// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {
  res.send("Virelli Backend Running...");
});


// ================================
// PORT
// ================================

const PORT = process.env.PORT || 4000;


// ================================
// START SERVER
// ================================

const startServer = async () => {
  try {

    // Connect MongoDB
    await connectDB();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(
        `Server Starting on http://localhost:${PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Failed to start server:",
      error.message
    );

  }
};


// Run Server
startServer();