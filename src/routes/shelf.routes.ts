import { shelfController } from "../controllers/shelf.controller";

const express = require("express");
const shelfRouter = express.Router();

shelfRouter.patch("/shelf/:id", shelfController.updateShelf);

export default shelfRouter;
