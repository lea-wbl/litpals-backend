import { userController } from "../controllers/user.controller";

const express = require("express");
const userRouter = express.Router();

userRouter.post("/user", userController.createUser);

userRouter.get("/user/:id", userController.getOneUser);

userRouter.get("/user/:id/bookshelf", userController.getBookshelf);

userRouter.get("/check-username", userController.checkUsername);

userRouter.get(
  "/user/:id/check-book-status/:bookId",
  userController.checkStatus
);

userRouter.patch("/user/:id/bookshelf", userController.updateBookshelf);

export default userRouter;
