import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { mongodb } from "./service/database.service.mjs";
import { protect } from "./middleware/auth.mjs";
import { routes } from "./startup/route.mjs";

const app = express();
dotenv.config();

/* add cors */
app.use(cors({ origin: RegExp(process.env.CORS_URL, "i"), credentials: true }));

/* import database */
mongodb();

/* import middleware */
app.use(protect);

/* allow to fetch body in api */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* import routes */
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`Listening on port ${PORT}...`));
});
