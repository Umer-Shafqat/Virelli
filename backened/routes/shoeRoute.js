import express from "express";

import {
  addShoe,
  getShoes,
  getShoeById,
  getNewArrivals,
  getOffers,
  deleteShoe,
} from "../controllers/shoeController.js";

import upload from "../middleware/multer.js";

const shoeRouter = express.Router();

// Add shoe
shoeRouter.post(
  "/add",
  upload.array("images", 20),
  addShoe
);

// Get all shoes
shoeRouter.get(
  "/list",
  getShoes
);

// Get new arrivals
shoeRouter.get(
  "/new-arrivals",
  getNewArrivals
);

// Get offers
shoeRouter.get(
  "/offers",
  getOffers
);

// Get shoe by ID
shoeRouter.get(
  "/:id",
  getShoeById
);

// Delete shoe
shoeRouter.delete(
  "/:id",
  deleteShoe
);

export default shoeRouter;