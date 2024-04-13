import { Router } from "express";
import multer from "multer";
import { newSVG, getSVG, getCount, deleteSVG, zipUpload } from "../controller/svg.controller.mjs";

const svgRouter = Router();

svgRouter.route("/")
.get(getSVG)
.post(newSVG)
.delete(deleteSVG)

svgRouter.get("/counts", getCount);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
svgRouter.post("/zip", upload.single('file'), zipUpload);

export { svgRouter };
