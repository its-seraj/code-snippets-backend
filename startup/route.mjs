import { cardRouter } from "../routes/Card.router.mjs";

export const routes = (app) => {  
  app.get("/", (req, res) => {
    res.send("Welcome to code-snippets");
  });

  app.use("/card", cardRouter)
};
