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
  searchAdmin
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

adminRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

adminRouter.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

adminRouter.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

adminRouter.put(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

adminRouter.get(
  "/daily-sales",
  authMiddleware,
  adminMiddleware,
  getDailySales
);

  adminRouter.get(
  "/search",
  authMiddleware,
  adminMiddleware,
  searchAdmin
);


export default adminRouter;