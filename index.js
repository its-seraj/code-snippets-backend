import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import { mongodb } from "./service/database.service.mjs";
import { protect } from "./middleware/auth.mjs";
import { routes } from "./startup/route.mjs";

const app = express();
dotenv.config();

/* import database */
mongodb();

/* import middleware */
app.use(protect);

/* import routes */
app.use(express.json({ limit: '50mb' })); /* allow to fetch body in api */
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`Listening on port ${PORT}...`));
});
