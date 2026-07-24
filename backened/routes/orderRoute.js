import express from "express";

import {
  placeOrder,
  getUserOrders,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = express.Router();


// Place COD order
orderRouter.post(
  "/place",
  authMiddleware,
  placeOrder
);


// Get logged-in user's orders
orderRouter.get(
  "/myorders",
  authMiddleware,
  getUserOrders
);


export default orderRouter;