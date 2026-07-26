import express from "express";

import {
  placeOrder,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const orderRouter =
  express.Router();


// =====================================
// PLACE ORDER
// =====================================

orderRouter.post(
  "/place",
  authMiddleware,
  placeOrder
);


export default orderRouter;