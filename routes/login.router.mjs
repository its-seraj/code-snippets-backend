import { Router } from "express";
import { login, logout } from "../controller/user.controller.mjs";

const userRouter = Router();

userRouter.route("/")
.post(login)
.delete(logout)

export { userRouter };
