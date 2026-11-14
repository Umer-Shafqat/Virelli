
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  placeOrder,
  getMyOrders,
  deleteOrder,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// CUSTOMER ROUTES
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/myorders", authMiddleware, getMyOrders);

// ADMIN ROUTES
orderRouter.get("/list", authMiddleware, adminMiddleware, listOrders);
orderRouter.post("/status", authMiddleware, adminMiddleware, updateStatus);
orderRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteOrder);

export default orderRouter;
