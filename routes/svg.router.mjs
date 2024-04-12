import { Router } from "express";
import { newSVG, getSVG, deleteSVG } from "../controller/svg.controller.mjs";

const svgRouter = Router();

svgRouter.route("/")
.get(getSVG)
.post(newSVG)
.delete(deleteSVG)

export { svgRouter };
