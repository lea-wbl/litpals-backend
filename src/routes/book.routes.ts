import { bookController } from "../controllers/book.controllers";

const express = require("express");
const bookRouter = express.Router();

bookRouter.get("/books", bookController.getBook);

bookRouter.post("/books", bookController.createBook);

export default bookRouter;
