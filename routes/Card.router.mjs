import { Router } from "express";
import { newCard, getCard, deleteCard } from "../controller/card.controller.mjs";

const cardRouter = Router();

cardRouter.route("/")
.get(getCard)
.post(newCard)
.delete(deleteCard)

export { cardRouter };
