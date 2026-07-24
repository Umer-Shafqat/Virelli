import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const cartRouter =
  express.Router();


// Add item
cartRouter.post(
  "/add",
  authMiddleware,
  addToCart
);


// Get cart
cartRouter.get(
  "/get",
  authMiddleware,
  getCart
);


// Remove item
cartRouter.post(
  "/remove",
  authMiddleware,
  removeFromCart
);


// Clear cart
cartRouter.delete(
  "/clear",
  authMiddleware,
  clearCart
);


export default cartRouter;