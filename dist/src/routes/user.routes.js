"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = require("../controllers/user.controllers");
const express = require("express");
const userRouter = express.Router();
userRouter.post("/users", user_controllers_1.userController.createUser);
exports.default = userRouter;
