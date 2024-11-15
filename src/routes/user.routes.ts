import { userController } from "../controllers/user.controllers";

const express = require("express");
const userRouter = express.Router();

userRouter.get("/users/:id", userController.getOneUser);

userRouter.get("/check-username", userController.checkUsername);

userRouter.post("/users", userController.createUser);

export default userRouter;
