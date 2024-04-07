import { Router } from "express";
import { login } from "../controller/user.controller.mjs";

const userRouter = Router();

userRouter.route("/")
.post(login)

export { userRouter };
