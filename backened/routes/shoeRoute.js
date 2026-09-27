import express from "express";
import upload from "../middleware/upload.js";

import {
  addShoe,
  listShoes,
  removeShoe,
} from "../controllers/shoeController.js";

const shoeRouter = express.Router();

shoeRouter.post(
  "/add",
  upload.single("image"),
  addShoe
);

shoeRouter.get(
  "/list",
  listShoes
);

shoeRouter.post(
  "/remove",
  removeShoe
);

export default shoeRouter;