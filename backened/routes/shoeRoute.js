import express from "express";

import {
  addShoe,
  getShoes,
  getShoeById,
  deleteShoe,
} from "../controllers/shoeController.js";

const shoeRouter = express.Router();


// ================================
// ADD SHOE
// POST /api/shoes/add
// ================================
shoeRouter.post("/add", addShoe);


// ================================
// GET ALL SHOES
// GET /api/shoes/list
// ================================
shoeRouter.get("/list", getShoes);


// ================================
// GET SINGLE SHOE
// GET /api/shoes/:id
// ================================
shoeRouter.get("/:id", getShoeById);


// ================================
// DELETE SHOE
// DELETE /api/shoes/:id
// ================================
shoeRouter.delete("/:id", deleteShoe);


// Export Router
export default shoeRouter;