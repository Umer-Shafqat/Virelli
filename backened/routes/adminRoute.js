import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getDashboard,
  getAllUsers,
  getAnalytics,
  getAllOrders,
  updateOrderStatus,
  adminLogin,
  getDailySales,
  searchAdmin,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// Admin Login
adminRouter.post("/login", adminLogin);

// Dashboard
adminRouter.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

// Users
adminRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Analytics
adminRouter.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

// Orders
adminRouter.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// Admin list
adminRouter.get(
  "/list",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// Update order status
adminRouter.put(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Daily sales
adminRouter.get(
  "/daily-sales",
  authMiddleware,
  adminMiddleware,
  getDailySales
);

// Search
adminRouter.get(
  "/search",
  authMiddleware,
  adminMiddleware,
  searchAdmin
);

adminRouter.get(
  "/search/:keyword",
  authMiddleware,
  adminMiddleware,
  searchAdmin
);

export default adminRouter;