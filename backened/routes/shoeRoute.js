import express from "express";

import {
  addShoe,
  getShoes,
  getShoeById,
  getNewArrivals,
  getOffers,
  searchAdmin,
  deleteShoe,
} from "../controllers/shoeController.js";

import upload from "../middleware/multer.js";

const shoeRouter = express.Router();

shoeRouter.post("/add", upload.single("image"), addShoe);

// Get All Shoes
shoeRouter.get("/list", getShoes);

// New Arrivals
shoeRouter.get("/new-arrivals", getNewArrivals);

// Offers
shoeRouter.get("/offers", getOffers);

// Get Single Shoe
shoeRouter.get("/:id", getShoeById);

// Delete Shoe
shoeRouter.delete("/:id", deleteShoe);

export default shoeRouter;