import { bookshelfController } from "../controllers/bookshelf.controllers";

const express = require("express");
const bookshelfRouter = express.Router();

bookshelfRouter.get("/bookshelf/:id", bookshelfController.getBookshelf);

bookshelfRouter.patch("/bookshelf/:id", bookshelfController.updateBookshelf);

bookshelfRouter.patch(
  "/bookshelf/:id/newShelf",
  bookshelfController.createShelf
);

export default bookshelfRouter;
