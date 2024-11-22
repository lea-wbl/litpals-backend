import { Application } from "express";
import userRouter from "./src/routes/user.routes";
import shelfRouter from "./src/routes/shelf.routes";

export function setupRoutes(app: Application) {
  app.use(userRouter);
  // app.use(bookRouter);
  app.use(shelfRouter);
}
