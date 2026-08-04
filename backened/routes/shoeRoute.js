import express from "express";

import {
  addShoe,
  getShoes,
  getShoeById,
  deleteShoe,
  getNewArrivals,
  getOffers,
} from "../controllers/shoeController.js";

import upload from "../middleware/multer.js";

const shoeRouter = express.Router();

shoeRouter.post("/add", upload.single("image"), addShoe);

shoeRouter.get("/list", getShoes);

shoeRouter.get("/:id", getShoeById);

shoeRouter.delete("/:id", deleteShoe);

shoeRouter.get("/new-arrivals", getNewArrivals);

shoeRouter.get("/offers", getOffers);

export default shoeRouter;