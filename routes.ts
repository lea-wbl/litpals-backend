import { Application } from "express";
import userRouter from "./src/routes/user.routes";
import bookRouter from "./src/routes/book.routes";
import bookshelfRouter from "./src/routes/bookshelf.routes";

export function setupRoutes(app: Application) {
  app.use(userRouter);
  // app.use(bookRouter);
  app.use(bookshelfRouter);
}
