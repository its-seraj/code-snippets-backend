import { Router } from "express";
import multer from "multer";
import { newImage, getImages, newSong, getSongs } from "../controller/lofi.controller.mjs";

const lofiRouter = Router();

lofiRouter.route("/image")
.get(getImages)

lofiRouter.route("/song")
.get(getSongs)
.post(newSong)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
lofiRouter.post("/image", upload.single("image"), newImage);

export { lofiRouter };
