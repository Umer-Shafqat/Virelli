import express from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
} from "../controllers/userController.js";


const userRouter =
  express.Router();


// Register
userRouter.post(
  "/register",
  registerUser
);


// Login
userRouter.post(
  "/login",
  loginUser
);

// =====================================
// ADMIN USER ROUTES
// =====================================

// GET /api/user/list
userRouter.get("/list", listUsers);

// DELETE /api/user/:id
userRouter.delete("/:id", deleteUser);


export default userRouter;