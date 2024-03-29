import { Router } from "express";
import { newCard, getCard } from "../controller/card.controller.mjs";

const cardRouter = Router();

cardRouter.route("/")
.get(getCard)
.post(newCard);

export { cardRouter };
