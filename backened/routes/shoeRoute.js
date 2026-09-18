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

shoeRouter.post("/add", upload.array("images", 20), addShoe);

shoeRouter.get("/list", getShoes);

shoeRouter.get("/new-arrivals", getNewArrivals);

shoeRouter.get("/offers", getOffers);

shoeRouter.get("/:id", getShoeById);

shoeRouter.delete("/:id", deleteShoe);

export default shoeRouter;