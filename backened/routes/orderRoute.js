import express from "express";

import {
  placeOrder,
  deleteOrder,
  getMyOrders,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// =====================================
// PLACE ORDER
// =====================================

orderRouter.post(
  "/place",
  authMiddleware,
  placeOrder
);

// =====================================
// GET MY ORDERS
// =====================================

orderRouter.get(
  "/myorders",
  authMiddleware,
  getMyOrders
);

// =====================================
// DELETE ORDER
// =====================================

orderRouter.delete(
  "/:id",
  deleteOrder
);

export default orderRouter;