import { Router } from "express";
import { authenticateToken } from "../middleware/token.auth.mjs";
import { newCard, getCard, deleteCard } from "../controller/card.controller.mjs";

const cardRouter = Router();

cardRouter.route("/")
.get(getCard)
.post(authenticateToken, newCard)
.delete(authenticateToken, deleteCard)

export { cardRouter };
