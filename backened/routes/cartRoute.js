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


cartRouter.post(
  "/add",
  authMiddleware,
  addToCart
);


cartRouter.get(
  "/get",
  authMiddleware,
  getCart
);

cartRouter.post(
  "/remove",
  authMiddleware,
  removeFromCart
);


cartRouter.delete(
  "/clear",
  authMiddleware,
  clearCart
);


export default cartRouter;