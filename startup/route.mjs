import { cardRouter } from "../routes/card.router.mjs";
import { userRouter } from "../routes/login.router.mjs";

export const routes = (app) => {  
  app.get("/", (req, res) => {
    res.send("Welcome to code-snippets");
  });

  app.use("/card", cardRouter)
  app.use("/login", userRouter)
};
