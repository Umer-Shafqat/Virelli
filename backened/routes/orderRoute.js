import express from "express";

import {
  placeOrder,
  deleteOrder,
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
// DELETE ORDER
// =====================================

orderRouter.delete(
  "/:id",
  deleteOrder
);

export default orderRouter;