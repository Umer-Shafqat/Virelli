import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  placeOrder,
  getMyOrders,
  deleteOrder,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);


orderRouter.get("/myorders", authMiddleware, getMyOrders);

orderRouter.get("/list", listOrders);

orderRouter.post("/status", updateStatus);

orderRouter.delete("/delete/:id", deleteOrder);

export default orderRouter;