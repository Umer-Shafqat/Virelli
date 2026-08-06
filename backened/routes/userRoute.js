import express from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
} from "../controllers/userController.js";


const userRouter =
  express.Router();

userRouter.post(
  "/register",
  registerUser
);

userRouter.post(
  "/login",
  loginUser
);

userRouter.get("/list", listUsers);

userRouter.delete("/:id", deleteUser);


export default userRouter;