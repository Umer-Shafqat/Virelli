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

// =====================================
// USER ROUTES
// =====================================

// Place Order
orderRouter.post("/place", authMiddleware, placeOrder);

// Get My Orders
orderRouter.get("/myorders", authMiddleware, getMyOrders);

// =====================================
// ADMIN ROUTES
// =====================================

// Get All Orders
orderRouter.get("/list", listOrders);

// Update Order Status
orderRouter.post("/status", updateStatus);

// Delete Order
orderRouter.delete("/delete/:id", (req, res) => {
  res.json({
    success: true,
    message: "Delete route is working",
    id: req.params.id,
  });
});

export default orderRouter;